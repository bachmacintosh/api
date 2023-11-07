import valueToUInt8Array from "../util/valueToUInt8Array";

export default async function verifyGithubWebhook(request: Request, secret: string): Promise<boolean> {
  const signatureHeader = request.headers.get("X-Hub-Signature-256");
  if (signatureHeader === null) {
    return false;
  }
  const signatureParts = signatureHeader.split("=");
  const EXPECTED_LENGTH = 2;
  if (signatureParts.length !== EXPECTED_LENGTH) {
    return false;
  }

  const signature = signatureParts[1];
  const payload = await request.clone().text();
  const payloadBytes = valueToUInt8Array(payload);
  const signatureBytes = valueToUInt8Array(signature, "hex");
  const secretBytes = valueToUInt8Array(secret);
  const algorithm = { name: "HMAC", hash: { name: "SHA-256" } };
  const key = await crypto.subtle.importKey("raw", secretBytes, algorithm, false, ["sign", "verify"]);
  return await crypto.subtle.verify(algorithm, key, signatureBytes, payloadBytes);
}
