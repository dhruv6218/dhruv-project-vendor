-- Database Functions and Triggers
-- Helper functions for common operations

-- Function to get user's organization ID
CREATE OR REPLACE FUNCTION get_user_org_id(user_uuid UUID)
RETURNS UUID AS $$
BEGIN
    RETURN (
        SELECT org_id FROM auth.users
        WHERE id = user_uuid
        AND raw_user_meta_data->>'org_id' IS NOT NULL
    )::UUID;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has specific role in organization
CREATE OR REPLACE FUNCTION user_has_role(user_uuid UUID, required_role TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        SELECT raw_user_meta_data->>'role' = required_role
        FROM auth.users
        WHERE id = user_uuid
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update usage statistics
CREATE OR REPLACE FUNCTION update_daily_usage(
    p_org_id UUID,
    p_date DATE DEFAULT CURRENT_DATE,
    p_verification_count INTEGER DEFAULT 0,
    p_api_calls INTEGER DEFAULT 0,
    p_reports_generated INTEGER DEFAULT 0,
    p_bulk_uploads INTEGER DEFAULT 0,
    p_storage_used_mb DECIMAL DEFAULT 0
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO usage_daily (
        org_id,
        date,
        verification_count,
        api_calls,
        reports_generated,
        bulk_uploads,
        storage_used_mb
    ) VALUES (
        p_org_id,
        p_date,
        p_verification_count,
        p_api_calls,
        p_reports_generated,
        p_bulk_uploads,
        p_storage_used_mb
    )
    ON CONFLICT (org_id, date)
    DO UPDATE SET
        verification_count = usage_daily.verification_count + p_verification_count,
        api_calls = usage_daily.api_calls + p_api_calls,
        reports_generated = usage_daily.reports_generated + p_reports_generated,
        bulk_uploads = usage_daily.bulk_uploads + p_bulk_uploads,
        storage_used_mb = usage_daily.storage_used_mb + p_storage_used_mb;
END;
$$ LANGUAGE plpgsql;

-- Function to create audit log entry
CREATE OR REPLACE FUNCTION create_audit_log(
    p_org_id UUID,
    p_user_id UUID DEFAULT NULL,
    p_action TEXT,
    p_resource_type TEXT DEFAULT NULL,
    p_resource_id UUID DEFAULT NULL,
    p_old_values JSONB DEFAULT '{}',
    p_new_values JSONB DEFAULT '{}',
    p_ip_address INET DEFAULT NULL,
    p_user_agent TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    log_id UUID;
BEGIN
    INSERT INTO audit_logs (
        org_id,
        user_id,
        action,
        resource_type,
        resource_id,
        old_values,
        new_values,
        ip_address,
        user_agent
    ) VALUES (
        p_org_id,
        p_user_id,
        p_action,
        p_resource_type,
        p_resource_id,
        p_old_values,
        p_new_values,
        p_ip_address,
        p_user_agent
    ) RETURNING id INTO log_id;

    RETURN log_id;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate vendor risk score
CREATE OR REPLACE FUNCTION calculate_vendor_risk_score(p_vendor_id UUID)
RETURNS DECIMAL(3,2) AS $$
DECLARE
    total_verifications INTEGER;
    failed_verifications INTEGER;
    recent_high_risk_events INTEGER;
    risk_score DECIMAL(3,2);
BEGIN
    -- Count total verifications
    SELECT COUNT(*) INTO total_verifications
    FROM verifications
    WHERE vendor_id = p_vendor_id AND status = 'success';

    -- Count failed verifications
    SELECT COUNT(*) INTO failed_verifications
    FROM verifications
    WHERE vendor_id = p_vendor_id AND status = 'failed';

    -- Count recent high-risk events (last 30 days)
    SELECT COUNT(*) INTO recent_high_risk_events
    FROM risk_events
    WHERE vendor_id = p_vendor_id
    AND severity IN ('high', 'critical')
    AND created_at >= NOW() - INTERVAL '30 days';

    -- Calculate risk score (0 = low risk, 1 = high risk)
    IF total_verifications = 0 THEN
        risk_score := 0.5; -- Default medium risk for new vendors
    ELSE
        risk_score := (
            (failed_verifications::DECIMAL / total_verifications::DECIMAL) * 0.6 +
            LEAST(recent_high_risk_events::DECIMAL / 10.0, 1.0) * 0.4
        );
    END IF;

    -- Update vendor risk score
    UPDATE vendors
    SET risk_score = risk_score, updated_at = NOW()
    WHERE id = p_vendor_id;

    RETURN risk_score;
END;
$$ LANGUAGE plpgsql;

-- Function to get organization usage limits
CREATE OR REPLACE FUNCTION get_org_usage_limits(p_org_id UUID)
RETURNS JSONB AS $$
DECLARE
    subscription_limits JSONB;
BEGIN
    SELECT COALESCE(s.usage_limits, p.features::JSONB) INTO subscription_limits
    FROM subscriptions s
    JOIN plans p ON s.plan_id = p.id
    WHERE s.org_id = p_org_id
    AND s.status = 'active'
    AND s.current_period_end >= NOW()
    ORDER BY s.created_at DESC
    LIMIT 1;

    RETURN COALESCE(subscription_limits, '{}');
END;
$$ LANGUAGE plpgsql;

-- Function to check if organization can perform verification
CREATE OR REPLACE FUNCTION can_perform_verification(p_org_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    usage_limits JSONB;
    current_usage INTEGER;
    limit_value INTEGER;
BEGIN
    -- Get usage limits
    usage_limits := get_org_usage_limits(p_org_id);

    -- Get current monthly verification count
    SELECT COALESCE(SUM(verification_count), 0) INTO current_usage
    FROM usage_daily
    WHERE org_id = p_org_id
    AND date >= DATE_TRUNC('month', CURRENT_DATE);

    -- Check limit
    limit_value := (usage_limits->>'verifications')::INTEGER;

    -- Return false if limit is exceeded
    IF limit_value > 0 AND current_usage >= limit_value THEN
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update usage when verification is created
CREATE OR REPLACE FUNCTION update_usage_on_verification()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'success' THEN
        PERFORM update_daily_usage(
            (SELECT org_id FROM vendors WHERE id = NEW.vendor_id),
            CURRENT_DATE,
            1,
            NEW.api_call_count,
            0,
            0,
            0
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to calculate risk score after verification
CREATE OR REPLACE FUNCTION calculate_risk_after_verification()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM calculate_vendor_risk_score(NEW.vendor_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create audit log for vendor changes
CREATE OR REPLACE FUNCTION audit_vendor_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        PERFORM create_audit_log(
            NEW.org_id,
            NEW.created_by,
            'vendor.created',
            'vendor',
            NEW.id,
            '{}',
            jsonb_build_object(
                'name', NEW.name,
                'email', NEW.email,
                'status', NEW.status
            )
        );
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        PERFORM create_audit_log(
            NEW.org_id,
            COALESCE(NEW.created_by, OLD.created_by),
            'vendor.updated',
            'vendor',
            NEW.id,
            jsonb_build_object(
                'name', OLD.name,
                'email', OLD.email,
                'status', OLD.status,
                'risk_score', OLD.risk_score
            ),
            jsonb_build_object(
                'name', NEW.name,
                'email', NEW.email,
                'status', NEW.status,
                'risk_score', NEW.risk_score
            )
        );
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        PERFORM create_audit_log(
            OLD.org_id,
            OLD.created_by,
            'vendor.deleted',
            'vendor',
            OLD.id,
            jsonb_build_object(
                'name', OLD.name,
                'email', OLD.email,
                'status', OLD.status
            ),
            '{}'
        );
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER trigger_update_usage_on_verification
    AFTER INSERT ON verifications
    FOR EACH ROW
    EXECUTE FUNCTION update_usage_on_verification();

CREATE TRIGGER trigger_calculate_risk_after_verification
    AFTER INSERT OR UPDATE ON verifications
    FOR EACH ROW
    EXECUTE FUNCTION calculate_risk_after_verification();

CREATE TRIGGER trigger_audit_vendor_changes
    AFTER INSERT OR UPDATE OR DELETE ON vendors
    FOR EACH ROW
    EXECUTE FUNCTION audit_vendor_changes();

-- Function to generate API token hash
CREATE OR REPLACE FUNCTION generate_api_token_hash(p_token TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN encode(sha256(p_token::bytea), 'hex');
END;
$$ LANGUAGE plpgsql;

-- Function to validate API token
CREATE OR REPLACE FUNCTION validate_api_token(p_token_hash TEXT, p_required_permission TEXT DEFAULT NULL)
RETURNS TABLE(
    user_id UUID,
    is_valid BOOLEAN,
    has_permission BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        at.user_id,
        at.is_active AND (at.expires_at IS NULL OR at.expires_at > NOW()) as is_valid,
        (p_required_permission IS NULL OR p_required_permission = ANY(at.permissions)) as has_permission
    FROM api_tokens at
    WHERE at.token_hash = p_token_hash;
END;
$$ LANGUAGE plpgsql;

-- Function to cleanup old audit logs (retain for 1 year)
CREATE OR REPLACE FUNCTION cleanup_old_audit_logs()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM audit_logs
    WHERE created_at < NOW() - INTERVAL '1 year';

    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;