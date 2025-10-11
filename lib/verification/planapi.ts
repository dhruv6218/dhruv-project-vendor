/* PlanAPI integration for compliance verifications.
   All secrets are read from environment variables that are managed as Cosmic Secrets.
*/

export type NormalizedVerification = {
  status: 'success' | 'failed' | 'pending';
  verified_at: string; // ISO
  score: number; // 0..1 confidence/reliability score
  details: Record<string, unknown>;
  artifacts?: Array<{ type: string; url?: string; data?: unknown }>; // e.g., OCR text, images
  quality_flags?: string[]; // warnings about data quality
  source_api: 'planapi';
  raw_response: unknown; // original API payload(s)
  error?: string | null;
};

function planApiBase(): string {
  return process.env.PLANAPI_BASE_URL || 'https://planapi.in';
}

function planHeaders(): Record<string, string> {
  const tokenId = process.env.PLANAPI_TOKEN_ID || '';
  const apiUserId = process.env.PLANAPI_API_USER_ID || '';
  const apiPassword = process.env.PLANAPI_API_PASSWORD || '';
  return {
    'Content-Type': 'application/json',
    'TokenID': tokenId,
    'ApiUserID': apiUserId,
    'ApiPassword': apiPassword,
  };
}

async function postJson<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const url = `${planApiBase()}${path}`;
  const res = await fetch(url, { method: 'POST', headers: planHeaders(), body: JSON.stringify(body) });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${path} failed: ${text}`);
  }
  return (await res.json()) as T;
}

async function postForm<T>(path: string, form: FormData): Promise<T> {
  const url = `${planApiBase()}${path}`;
  const headers = planHeaders();
  // Remove JSON content-type for form-data; fetch will set correct boundary
  delete headers['Content-Type'];
  const res = await fetch(url, { method: 'POST', headers, body: form });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${path} failed: ${text}`);
  }
  return (await res.json()) as T;
}

function nowIso(): string { return new Date().toISOString(); }

function normalize(raw: unknown, success: boolean, details: Record<string, unknown>, artifacts?: NormalizedVerification['artifacts'], flags?: string[]): NormalizedVerification {
  return {
    status: success ? 'success' : 'failed',
    verified_at: nowIso(),
    score: success ? 0.9 : 0.1,
    details,
    artifacts: artifacts ?? [],
    quality_flags: flags ?? [],
    source_api: 'planapi',
    raw_response: raw,
    error: success ? null : 'provider_reported_failure',
  };
}

function normalizeFailure(details: Record<string, unknown>, raw?: unknown, errorMessage?: string): NormalizedVerification {
  return {
    status: 'failed',
    verified_at: nowIso(),
    score: 0.1,
    details,
    artifacts: [],
    quality_flags: ['provider_error'],
    source_api: 'planapi',
    raw_response: raw ?? null,
    error: errorMessage ?? 'provider_error',
  };
}

export async function verifyGST(gstNumber: string): Promise<NormalizedVerification> {
  try {
    const gstVerify = await postJson('/Api/Ekyc/GSTVerification', { GstNumber: gstNumber, ApiMode: '1' });
    const gstReturn = await postJson('/Api/Ekyc/GSTReturnStatus', { GstNumber: gstNumber, ApiMode: '1' });
    const gstDetails = await postJson('/Api/Ekyc/GstDetailsAndVerify', { GstNumber: gstNumber, ApiMode: '1' });
    const ok = Boolean((gstVerify as { Status?: string }).Status || (gstDetails as { Status?: string }).Status);
    const details = { gstVerify, gstReturn, gstDetails } as Record<string, unknown>;
    return normalize({ gstVerify, gstReturn, gstDetails }, ok, details);
  } catch (err) {
    return normalizeFailure({ gstNumber }, { error: String(err) }, (err as Error).message);
  }
}

export async function mcaCompanySearch(companyName: string): Promise<NormalizedVerification> {
  try {
    const raw = await postJson('/Api/Ekyc/MCACompanySearch', { Company_Name: companyName, ApiMode: '1' });
    const ok = true; // API returns list; treat as success when callable
    return normalize(raw, ok, { companyName, resultCount: Array.isArray((raw as { Data?: unknown[] }).Data) ? (raw as { Data?: unknown[] }).Data!.length : 0 });
  } catch (err) {
    return normalizeFailure({ companyName }, { error: String(err) }, (err as Error).message);
  }
}

export async function mcaCinSearch(cin: string): Promise<NormalizedVerification> {
  try {
    const raw = await postJson('/Api/Ekyc/MCACinSearch', { CIN: cin, ApiMode: '1' });
    const ok = true;
    return normalize(raw, ok, { cin });
  } catch (err) {
    return normalizeFailure({ cin }, { error: String(err) }, (err as Error).message);
  }
}

export async function verifyBank(name: string, accountNo: string, ifsc: string): Promise<NormalizedVerification> {
  try {
    const raw = await postJson('/api/Ekyc/BankVarificationLive', { Name: name, AccountNo: accountNo, Ifsc: ifsc, ApiMode: '1' });
    const ok = Boolean((raw as { Status?: string }).Status || (raw as { status?: string }).status);
    return normalize(raw, ok, { name, accountNo, ifsc }, undefined, ok ? [] : ['bank_verification_failed']);
  } catch (err) {
    return normalizeFailure({ name, accountNo, ifsc }, { error: String(err) }, (err as Error).message);
  }
}

export async function verifyDIN(din: string): Promise<NormalizedVerification> {
  try {
    const raw = await postJson('/Api/Ekyc/DINDetails', { DIN: din, ApiMode: '1' });
    const ok = true;
    return normalize(raw, ok, { din });
  } catch (err) {
    return normalizeFailure({ din }, { error: String(err) }, (err as Error).message);
  }
}

export async function panOCR(panImageUrl: string): Promise<NormalizedVerification> {
  try {
    const imgRes = await fetch(panImageUrl);
    if (!imgRes.ok) throw new Error('Failed to fetch PAN image');
    const blob = await imgRes.blob();
    const form = new FormData();
    form.append('PanImage', new File([blob], 'pan.jpg', { type: blob.type || 'image/jpeg' }));
    const raw = await postForm('/Api/Ekyc/PANOCR', form);
    const ok = Boolean((raw as { Status?: string }).Status || (raw as { pan_number?: string }).pan_number);
    const artifacts = [{ type: 'ocr_text', data: raw }];
    return normalize(raw, ok, {}, artifacts);
  } catch (err) {
    return normalizeFailure({ panImageUrl }, { error: String(err) }, (err as Error).message);
  }
}

export async function panDetails(panNumber: string): Promise<NormalizedVerification> {
  try {
    const raw = await postJson('/api/Ekyc/PanDetails', { Panid: panNumber, ApiMode: '1' });
    const ok = Boolean((raw as { Status?: string }).Status || (raw as { pan_name?: string }).pan_name);
    return normalize(raw, ok, { panNumber });
  } catch (err) {
    return normalizeFailure({ panNumber }, { error: String(err) }, (err as Error).message);
  }
}

export async function panVerify(panNumber: string): Promise<NormalizedVerification> {
  try {
    const raw = await postJson('/Api/Ekyc/PanVerification', { Panid: panNumber, ApiMode: '1' });
    const ok = Boolean((raw as { Status?: string }).Status || (raw as { verified?: boolean }).verified);
    return normalize(raw, ok, { panNumber });
  } catch (err) {
    return normalizeFailure({ panNumber }, { error: String(err) }, (err as Error).message);
  }
}

export async function panByGST(gstNumber: string): Promise<NormalizedVerification> {
  try {
    const raw = await postJson('/Api/Ekyc/PANByGSTNo', { GstNumber: gstNumber });
    const ok = true;
    return normalize(raw, ok, { gstNumber });
  } catch (err) {
    return normalizeFailure({ gstNumber }, { error: String(err) }, (err as Error).message);
  }
}

export async function aadhaarOCR(frontUrl: string, backUrl?: string): Promise<NormalizedVerification> {
  try {
    const form = new FormData();
    const frontRes = await fetch(frontUrl);
    if (!frontRes.ok) throw new Error('Failed to fetch Aadhaar front image');
    const frontBlob = await frontRes.blob();
    form.append('FrontImage', new File([frontBlob], 'aadhaar_front.jpg', { type: frontBlob.type || 'image/jpeg' }));
    if (backUrl) {
      const backRes = await fetch(backUrl);
      if (!backRes.ok) throw new Error('Failed to fetch Aadhaar back image');
      const backBlob = await backRes.blob();
      form.append('BackImage', new File([backBlob], 'aadhaar_back.jpg', { type: backBlob.type || 'image/jpeg' }));
    }
    const raw = await postForm('/Api/Ekyc/AadhaarOCR', form);
    const ok = Boolean((raw as { Status?: string }).Status || (raw as { aadhaar_number?: string }).aadhaar_number);
    return normalize(raw, ok, {});
  } catch (err) {
    return normalizeFailure({ frontUrl, backUrl: backUrl ?? null }, { error: String(err) }, (err as Error).message);
  }
}

export async function aadhaarOtpStart(aadhaarNumber: string): Promise<NormalizedVerification> {
  try {
    const raw = await postJson('/Api/Ekyc/AdharVerification', { Aadhaarid: aadhaarNumber, ApiMode: '1' });
    const ok = Boolean((raw as { ReqId?: string }).ReqId || (raw as { Status?: string }).Status);
    return normalize(raw, ok, { aadhaarNumber });
  } catch (err) {
    return normalizeFailure({ aadhaarNumber }, { error: String(err) }, (err as Error).message);
  }
}

export async function aadhaarOtpSubmit(aadhaarNumber: string, otp: string, reqId: string): Promise<NormalizedVerification> {
  try {
    const raw = await postJson('/Api/Ekyc/AdharVerificationSubmitOtp', { Aadhaarid: aadhaarNumber, OTP: otp, ReqId: reqId, ApiMode: '1' });
    const ok = Boolean((raw as { Status?: string }).Status || (raw as { verified?: boolean }).verified);
    return normalize(raw, ok, { aadhaarNumber });
  } catch (err) {
    return normalizeFailure({ aadhaarNumber }, { error: String(err) }, (err as Error).message);
  }
}

export async function digilockerDownloadAadhar(): Promise<NormalizedVerification> {
  try {
    const clientId = process.env.PLANAPI_DIGILOCKER_CLIENT_ID || process.env.DIGILOCKER_CLIENT_ID || '';
    const raw = await postJson('/Api/Ekyc/DigiLockerDownloadAadhar', { Digilocker_Client_Id: clientId });
    const ok = true;
    return normalize(raw, ok, { clientIdSet: Boolean(clientId) });
  } catch (err) {
    return normalizeFailure({ clientIdSet: Boolean(process.env.PLANAPI_DIGILOCKER_CLIENT_ID || process.env.DIGILOCKER_CLIENT_ID) }, { error: String(err) }, (err as Error).message);
  }
}

export async function passportVerification(fileNo: string, dateOfBirth_dd_mm_yyyy: string): Promise<NormalizedVerification> {
  try {
    const raw = await postJson('/Api/Ekyc/PassportVerification', { File_No: fileNo, DateofBirth: dateOfBirth_dd_mm_yyyy, ApiMode: '1' });
    const ok = Boolean((raw as { Status?: string }).Status || (raw as { verified?: boolean }).verified);
    return normalize(raw, ok, { fileNo, dateOfBirth: dateOfBirth_dd_mm_yyyy });
  } catch (err) {
    return normalizeFailure({ fileNo, dateOfBirth: dateOfBirth_dd_mm_yyyy }, { error: String(err) }, (err as Error).message);
  }
}
