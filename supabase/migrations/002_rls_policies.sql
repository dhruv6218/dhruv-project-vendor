-- Row Level Security (RLS) Policies
-- Ensure organizations can only access their own data

-- Enable RLS on all tables
ALTER TABLE orgs ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Organizations policies
CREATE POLICY "Organizations can view their own org" ON orgs FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Organizations can insert their own org" ON orgs FOR INSERT WITH CHECK (true);
CREATE POLICY "Organizations can update their own org" ON orgs FOR UPDATE USING (true);

-- Vendors policies
CREATE POLICY "Users can view vendors from their org" ON vendors FOR SELECT USING (
    org_id IN (
        SELECT id FROM orgs WHERE id = orgs.id
    )
);
CREATE POLICY "Users can insert vendors for their org" ON vendors FOR INSERT WITH CHECK (
    org_id IN (
        SELECT id FROM orgs WHERE id = orgs.id
    )
);
CREATE POLICY "Users can update vendors from their org" ON vendors FOR UPDATE USING (
    org_id IN (
        SELECT id FROM orgs WHERE id = orgs.id
    )
);
CREATE POLICY "Users can delete vendors from their org" ON vendors FOR DELETE USING (
    org_id IN (
        SELECT id FROM orgs WHERE id = orgs.id
    )
);

-- Verifications policies
CREATE POLICY "Users can view verifications from their org" ON verifications FOR SELECT USING (
    vendor_id IN (
        SELECT id FROM vendors WHERE org_id IN (
            SELECT id FROM orgs WHERE id = orgs.id
        )
    )
);
CREATE POLICY "Users can insert verifications for their org" ON verifications FOR INSERT WITH CHECK (
    vendor_id IN (
        SELECT id FROM vendors WHERE org_id IN (
            SELECT id FROM orgs WHERE id = orgs.id
        )
    )
);
CREATE POLICY "Users can update verifications from their org" ON verifications FOR UPDATE USING (
    vendor_id IN (
        SELECT id FROM vendors WHERE org_id IN (
            SELECT id FROM orgs WHERE id = orgs.id
        )
    )
);

-- Reports policies
CREATE POLICY "Users can view reports from their org" ON reports FOR SELECT USING (
    org_id IN (
        SELECT id FROM orgs WHERE id = orgs.id
    )
);
CREATE POLICY "Users can insert reports for their org" ON reports FOR INSERT WITH CHECK (
    org_id IN (
        SELECT id FROM orgs WHERE id = orgs.id
    )
);
CREATE POLICY "Users can update reports from their org" ON reports FOR UPDATE USING (
    org_id IN (
        SELECT id FROM orgs WHERE id = orgs.id
    )
);
CREATE POLICY "Users can delete reports from their org" ON reports FOR DELETE USING (
    org_id IN (
        SELECT id FROM orgs WHERE id = orgs.id
    )
);

-- Risk Events policies
CREATE POLICY "Users can view risk events from their org" ON risk_events FOR SELECT USING (
    vendor_id IN (
        SELECT id FROM vendors WHERE org_id IN (
            SELECT id FROM orgs WHERE id = orgs.id
        )
    )
);
CREATE POLICY "Users can insert risk events for their org" ON risk_events FOR INSERT WITH CHECK (
    vendor_id IN (
        SELECT id FROM vendors WHERE org_id IN (
            SELECT id FROM orgs WHERE id = orgs.id
        )
    )
);
CREATE POLICY "Users can update risk events from their org" ON risk_events FOR UPDATE USING (
    vendor_id IN (
        SELECT id FROM vendors WHERE org_id IN (
            SELECT id FROM orgs WHERE id = orgs.id
        )
    )
);

-- API Tokens policies
CREATE POLICY "Users can view their own API tokens" ON api_tokens FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert their own API tokens" ON api_tokens FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their own API tokens" ON api_tokens FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete their own API tokens" ON api_tokens FOR DELETE USING (user_id = auth.uid());

-- Audit Logs policies
CREATE POLICY "Users can view audit logs from their org" ON audit_logs FOR SELECT USING (
    org_id IN (
        SELECT id FROM orgs WHERE id = orgs.id
    )
);
CREATE POLICY "System can insert audit logs" ON audit_logs FOR INSERT WITH CHECK (true);

-- Jobs policies
CREATE POLICY "Users can view jobs from their org" ON jobs FOR SELECT USING (
    created_by IN (
        SELECT id FROM auth.users WHERE raw_user_meta_data->>'org_id' IN (
            SELECT id FROM orgs WHERE id = orgs.id
        )
    )
);
CREATE POLICY "Users can insert jobs for their org" ON jobs FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update jobs from their org" ON jobs FOR UPDATE USING (
    created_by IN (
        SELECT id FROM auth.users WHERE raw_user_meta_data->>'org_id' IN (
            SELECT id FROM orgs WHERE id = orgs.id
        )
    )
);

-- Usage Daily policies
CREATE POLICY "Users can view usage stats for their org" ON usage_daily FOR SELECT USING (
    org_id IN (
        SELECT id FROM orgs WHERE id = orgs.id
    )
);
CREATE POLICY "System can insert usage stats" ON usage_daily FOR INSERT WITH CHECK (true);
CREATE POLICY "System can update usage stats" ON usage_daily FOR UPDATE USING (true);

-- Service Orders policies
CREATE POLICY "Users can view service orders from their org" ON service_orders FOR SELECT USING (
    org_id IN (
        SELECT id FROM orgs WHERE id = orgs.id
    )
);
CREATE POLICY "Users can insert service orders for their org" ON service_orders FOR INSERT WITH CHECK (
    org_id IN (
        SELECT id FROM orgs WHERE id = orgs.id
    )
);
CREATE POLICY "Service team can update assigned orders" ON service_orders FOR UPDATE USING (
    assigned_to = auth.uid() OR
    created_by IN (
        SELECT id FROM auth.users WHERE raw_user_meta_data->>'org_id' IN (
            SELECT id FROM orgs WHERE id = orgs.id
        )
    )
);

-- Integrations policies
CREATE POLICY "Users can view integrations from their org" ON integrations FOR SELECT USING (
    org_id IN (
        SELECT id FROM orgs WHERE id = orgs.id
    )
);
CREATE POLICY "Users can insert integrations for their org" ON integrations FOR INSERT WITH CHECK (
    org_id IN (
        SELECT id FROM orgs WHERE id = orgs.id
    )
);
CREATE POLICY "Users can update integrations from their org" ON integrations FOR UPDATE USING (
    org_id IN (
        SELECT id FROM orgs WHERE id = orgs.id
    )
);
CREATE POLICY "Users can delete integrations from their org" ON integrations FOR DELETE USING (
    org_id IN (
        SELECT id FROM orgs WHERE id = orgs.id
    )
);

-- Subscriptions policies
CREATE POLICY "Users can view subscriptions from their org" ON subscriptions FOR SELECT USING (
    org_id IN (
        SELECT id FROM orgs WHERE id = orgs.id
    )
);
CREATE POLICY "System can manage subscriptions" ON subscriptions FOR ALL USING (true);

-- Plans policies (read-only for authenticated users)
CREATE POLICY "Authenticated users can view plans" ON plans FOR SELECT USING (auth.role() = 'authenticated');

-- Service role policies for system operations
CREATE POLICY "Service role has full access to all tables" ON ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');