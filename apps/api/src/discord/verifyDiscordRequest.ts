import valueToUInt8Array from "../util/valueToUInt8Array";

export default async function verifyDiscordRequest(request: Request, publicKey: string): Promise<boolean> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    valueToUInt8Array(publicKey, "hex"),
    {
      name: "Ed25519",
      namedCurve: "Ed25519",
    },
    true,
    ["verify"],
  );
  const encoder = new TextEncoder();

  const signatureHeader = request.headers.get("X-Signature-Ed25519");
  const timestamp = request.headers.get("X-Signature-Timestamp");
  if (signatureHeader === null || timestamp === null) {
    return false;
  }
  const signature = valueToUInt8Array(signatureHeader, "hex");
  const body = await request.clone().text();
  return await crypto.subtle.verify("Ed25519", cryptoKey, signature, encoder.encode(timestamp + body));
}
