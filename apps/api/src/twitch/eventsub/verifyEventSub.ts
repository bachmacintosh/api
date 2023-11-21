import valueToUInt8Array from "../../util/valueToUInt8Array";

export default async function verifyEventSub(request: Request, secret: string): Promise<boolean> {
  try {
    const messageId = request.headers.get("Twitch-Eventsub-Message-Id");
    const timestamp = request.headers.get("Twitch-Eventsub-Message-Timestamp");
    const signatureHeader = request.headers.get("Twitch-Eventsub-Message-Signature");

    if (messageId === null || timestamp === null || signatureHeader === null) {
      return false;
    }

    const signatureParts = signatureHeader.split("=");
    const EXPECTED_LENGTH = 2;
    if (signatureParts.length !== EXPECTED_LENGTH) {
      return false;
    }

    const algorithm = { name: "HMAC", hash: { name: "SHA-256" } };
    const secretBytes = valueToUInt8Array(secret);
    const key = await crypto.subtle.importKey("raw", secretBytes, algorithm, false, ["sign", "verify"]);

    const twitchSignatureString = signatureParts[1];
    const twitchSignature = valueToUInt8Array(twitchSignatureString, "hex");

    const body = await request.clone().text();
    const messageText = messageId + timestamp + body;
    const messageBytes = valueToUInt8Array(messageText);
    const ourSignature = await crypto.subtle.sign(algorithm, key, messageBytes);

    return crypto.subtle.timingSafeEqual(twitchSignature, ourSignature);
  } catch (error) {
    console.error(error);
    return false;
  }
}
