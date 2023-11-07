import type { RESTOptions, ResponseLike } from "@discordjs/rest";
import type { BodyInit as UndiciBodyInit, Headers as UndiciHeaders, RequestInit as UndiciInit } from "undici";

const resolveBody = (body: UndiciBodyInit): BodyInit => {
  if (body === null) {
    return "";
  }
  if (
    typeof body === "string" ||
    body instanceof ArrayBuffer ||
    body instanceof Blob ||
    body instanceof FormData ||
    body instanceof Uint8Array ||
    body instanceof URLSearchParams ||
    ArrayBuffer.isView(body)
  ) {
    return body;
  }
  throw new TypeError(`Unable to resolve body.`);
};

const makeRequest: RESTOptions["makeRequest"] = async (url: string, undiciInit: UndiciInit) => {
  const cfInit: RequestInit<RequestInitCfProperties> = {};
  if (typeof undiciInit.method !== "undefined") {
    cfInit.method = undiciInit.method;
  }
  if (typeof undiciInit.headers === "object") {
    cfInit.headers = {};
    if ("User-Agent" in undiciInit.headers && typeof undiciInit.headers["User-Agent"] === "string") {
      cfInit.headers["User-Agent"] = undiciInit.headers["User-Agent"];
    }
    if ("Authorization" in undiciInit.headers && typeof undiciInit.headers.Authorization === "string") {
      cfInit.headers.Authorization = undiciInit.headers.Authorization;
    }
    if ("Content-Type" in undiciInit.headers && typeof undiciInit.headers["Content-Type"] === "string") {
      cfInit.headers["Content-Type"] = undiciInit.headers["Content-Type"];
    }
  }
  if (typeof undiciInit.body !== "undefined" && undiciInit.method?.toLowerCase() !== "get") {
    cfInit.body = resolveBody(undiciInit.body);
  }
  if (typeof undiciInit.redirect !== "undefined") {
    cfInit.redirect = undiciInit.redirect;
  }
  if (typeof undiciInit.integrity !== "undefined") {
    cfInit.integrity = undiciInit.integrity;
  }
  if (typeof undiciInit.signal !== "undefined") {
    cfInit.signal = undiciInit.signal;
  }
  const response = await fetch(url, cfInit);
  const undiciHeaders = new Headers();
  response.headers.forEach((value, key) => {
    undiciHeaders.set(key, value);
  });
  const undiciResponse: ResponseLike = {
    body: response.body,
    arrayBuffer: async () => {
      return await response.arrayBuffer();
    },
    bodyUsed: response.bodyUsed,
    headers: undiciHeaders as unknown as UndiciHeaders,
    json: async () => {
      return await response.json();
    },
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    text: async () => {
      return await response.text();
    },
  };
  return undiciResponse;
};

export default makeRequest;
