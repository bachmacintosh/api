import type {
  Env,
  GoogleSheetsAPIMethods,
  GoogleSheetsAPIParameters,
  GoogleSheetsAPIRequest,
  GoogleSheetsAPIResponse,
} from "../types";
import GoogleAuth, { type GoogleKey } from "cloudflare-workers-and-google-oauth";
import { parseTemplate } from "url-template";

export default class GoogleSheets {
  protected readonly scopes = ["https://www.googleapis.com/auth/spreadsheets"];

  private readonly _kv: KVNamespace;
  private readonly _oauth: GoogleAuth;
  private _accessToken: string | null;

  public constructor(env: Env) {
    this._kv = env.KV;
    const googleKey = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS) as GoogleKey;
    this._oauth = new GoogleAuth(googleKey, this.scopes);
    this._accessToken = null;
  }

  public async appendValues(
    params: GoogleSheetsAPIParameters<"sheets.spreadsheets.values.append">,
  ): Promise<GoogleSheetsAPIResponse<"sheets.spreadsheets.values.append">> {
    const request: GoogleSheetsAPIRequest<"sheets.spreadsheets.values.append"> = {
      method: "POST",
      url: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}:append",
      path: {
        range: params.range,
        spreadsheetId: params.spreadsheetId,
      },
      query: {
        includeValuesInResponse: params.includeValuesInResponse,
        insertDataOption: params.insertDataOption,
        responseDateTimeRenderOption: params.responseDateTimeRenderOption,
        responseValueRenderOption: params.responseValueRenderOption,
        valueInputOption: params.valueInputOption,
      },
      body: params.body,
    };
    return await this._makeRequest("sheets.spreadsheets.values.append", request);
  }

  public async batchClearValues(
    params: GoogleSheetsAPIParameters<"sheets.spreadsheets.values.batchClear">,
  ): Promise<GoogleSheetsAPIResponse<"sheets.spreadsheets.values.batchClear">> {
    const request: GoogleSheetsAPIRequest<"sheets.spreadsheets.values.batchClear"> = {
      method: "POST",
      url: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values:batchClear",
      path: {
        spreadsheetId: params.spreadsheetId,
      },
      query: null,
      body: params.body,
    };
    return await this._makeRequest("sheets.spreadsheets.values.batchClear", request);
  }

  public async batchClearValuesByDataFilter(
    params: GoogleSheetsAPIParameters<"sheets.spreadsheets.values.batchClearByDataFilter">,
  ): Promise<GoogleSheetsAPIResponse<"sheets.spreadsheets.values.batchClearByDataFilter">> {
    const request: GoogleSheetsAPIRequest<"sheets.spreadsheets.values.batchClearByDataFilter"> = {
      method: "POST",
      url: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values:batchClearByDataFilter",
      path: {
        spreadsheetId: params.spreadsheetId,
      },
      query: null,
      body: params.body,
    };
    return await this._makeRequest("sheets.spreadsheets.values.batchClearByDataFilter", request);
  }

  public async batchGetValues(
    params: GoogleSheetsAPIParameters<"sheets.spreadsheets.values.batchGet">,
  ): Promise<GoogleSheetsAPIResponse<"sheets.spreadsheets.values.batchGet">> {
    const request: GoogleSheetsAPIRequest<"sheets.spreadsheets.values.batchGet"> = {
      method: "GET",
      url: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values:batchGet",
      path: {
        spreadsheetId: params.spreadsheetId,
      },
      query: {
        dateTimeRenderOption: params.dateTimeRenderOption,
        majorDimension: params.majorDimension,
        ranges: params.ranges,
        valueRenderOption: params.valueRenderOption,
      },
      body: null,
    };
    return await this._makeRequest("sheets.spreadsheets.values.batchGet", request);
  }

  public async batchGetValuesByDataFilter(
    params: GoogleSheetsAPIParameters<"sheets.spreadsheets.values.batchGetByDataFilter">,
  ): Promise<GoogleSheetsAPIResponse<"sheets.spreadsheets.values.batchGetByDataFilter">> {
    const request: GoogleSheetsAPIRequest<"sheets.spreadsheets.values.batchGetByDataFilter"> = {
      method: "POST",
      url: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values:batchGetByDataFilter",
      path: {
        spreadsheetId: params.spreadsheetId,
      },
      query: null,
      body: params.body,
    };
    return await this._makeRequest("sheets.spreadsheets.values.batchGetByDataFilter", request);
  }

  public async batchUpdateSpreadsheet(
    params: GoogleSheetsAPIParameters<"sheets.spreadsheets.batchUpdate">,
  ): Promise<GoogleSheetsAPIResponse<"sheets.spreadsheets.batchUpdate">> {
    const request: GoogleSheetsAPIRequest<"sheets.spreadsheets.batchUpdate"> = {
      method: "POST",
      url: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}:batchUpdate",
      path: {
        spreadsheetId: params.spreadsheetId,
      },
      query: null,
      body: params.body,
    };
    return await this._makeRequest("sheets.spreadsheets.batchUpdate", request);
  }

  public async batchUpdateValues(
    params: GoogleSheetsAPIParameters<"sheets.spreadsheets.values.batchUpdate">,
  ): Promise<GoogleSheetsAPIResponse<"sheets.spreadsheets.values.batchUpdate">> {
    const request: GoogleSheetsAPIRequest<"sheets.spreadsheets.values.batchUpdate"> = {
      method: "POST",
      url: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values:batchUpdate",
      path: {
        spreadsheetId: params.spreadsheetId,
      },
      query: null,
      body: params.body,
    };
    return await this._makeRequest("sheets.spreadsheets.values.batchUpdate", request);
  }

  public async batchUpdateValuesByDataFilter(
    params: GoogleSheetsAPIParameters<"sheets.spreadsheets.values.batchUpdateByDataFilter">,
  ): Promise<GoogleSheetsAPIResponse<"sheets.spreadsheets.values.batchUpdateByDataFilter">> {
    const request: GoogleSheetsAPIRequest<"sheets.spreadsheets.values.batchUpdateByDataFilter"> = {
      method: "POST",
      url: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values:batchUpdateByDataFilter",
      path: {
        spreadsheetId: params.spreadsheetId,
      },
      query: null,
      body: params.body,
    };
    return await this._makeRequest("sheets.spreadsheets.values.batchUpdateByDataFilter", request);
  }

  public async clearValues(
    params: GoogleSheetsAPIParameters<"sheets.spreadsheets.values.clear">,
  ): Promise<GoogleSheetsAPIResponse<"sheets.spreadsheets.values.clear">> {
    const request: GoogleSheetsAPIRequest<"sheets.spreadsheets.values.clear"> = {
      method: "POST",
      url: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}:clear",
      path: {
        range: params.range,
        spreadsheetId: params.spreadsheetId,
      },
      query: null,
      body: params.body,
    };
    return await this._makeRequest("sheets.spreadsheets.values.clear", request);
  }

  public async copySheet(
    params: GoogleSheetsAPIParameters<"sheets.spreadsheets.sheets.copyTo">,
  ): Promise<GoogleSheetsAPIResponse<"sheets.spreadsheets.sheets.copyTo">> {
    const request: GoogleSheetsAPIRequest<"sheets.spreadsheets.sheets.copyTo"> = {
      method: "POST",
      url: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/sheets/{sheetId}:copyTo",
      path: {
        sheetId: params.sheetId,
        spreadsheetId: params.spreadsheetId,
      },
      query: null,
      body: params.body,
    };
    return await this._makeRequest("sheets.spreadsheets.sheets.copyTo", request);
  }

  public async createSpreadsheet(
    params: GoogleSheetsAPIParameters<"sheets.spreadsheets.create">,
  ): Promise<GoogleSheetsAPIResponse<"sheets.spreadsheets.create">> {
    const request: GoogleSheetsAPIRequest<"sheets.spreadsheets.create"> = {
      method: "POST",
      url: "https://sheets.googleapis.com/v4/spreadsheets",
      path: null,
      query: null,
      body: params.body,
    };
    return await this._makeRequest("sheets.spreadsheets.create", request);
  }

  public async getDeveloperMetadata(
    params: GoogleSheetsAPIParameters<"sheets.spreadsheets.developerMetadata.get">,
  ): Promise<GoogleSheetsAPIResponse<"sheets.spreadsheets.developerMetadata.get">> {
    const request: GoogleSheetsAPIRequest<"sheets.spreadsheets.developerMetadata.get"> = {
      method: "GET",
      url: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/developerMetadata/{metadataId}",
      path: {
        spreadsheetId: params.spreadsheetId,
        metadataId: params.metadataId,
      },
      query: null,
      body: null,
    };
    return await this._makeRequest("sheets.spreadsheets.developerMetadata.get", request);
  }

  public async getSpreadsheet(
    params: GoogleSheetsAPIParameters<"sheets.spreadsheets.get">,
  ): Promise<GoogleSheetsAPIResponse<"sheets.spreadsheets.get">> {
    const request: GoogleSheetsAPIRequest<"sheets.spreadsheets.get"> = {
      method: "GET",
      url: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}",
      path: {
        spreadsheetId: params.spreadsheetId,
      },
      query: {
        includeGridData: params.includeGridData,
        ranges: params.ranges,
      },
      body: null,
    };
    return await this._makeRequest("sheets.spreadsheets.get", request);
  }

  public async getSpreadsheetByDataFilter(
    params: GoogleSheetsAPIParameters<"sheets.spreadsheets.getByDataFilter">,
  ): Promise<GoogleSheetsAPIResponse<"sheets.spreadsheets.getByDataFilter">> {
    const request: GoogleSheetsAPIRequest<"sheets.spreadsheets.getByDataFilter"> = {
      method: "POST",
      url: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}:getByDataFilter",
      path: {
        spreadsheetId: params.spreadsheetId,
      },
      query: null,
      body: params.body,
    };
    return await this._makeRequest("sheets.spreadsheets.getByDataFilter", request);
  }

  public async getValues(
    params: GoogleSheetsAPIParameters<"sheets.spreadsheets.values.get">,
  ): Promise<GoogleSheetsAPIResponse<"sheets.spreadsheets.values.get">> {
    const request: GoogleSheetsAPIRequest<"sheets.spreadsheets.values.get"> = {
      method: "GET",
      url: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}",
      path: {
        range: params.range,
        spreadsheetId: params.spreadsheetId,
      },
      query: {
        dateTimeRenderOption: params.dateTimeRenderOption,
        majorDimension: params.majorDimension,
        valueRenderOption: params.valueRenderOption,
      },
      body: null,
    };
    return await this._makeRequest("sheets.spreadsheets.values.get", request);
  }

  public async searchDeveloperMetadata(
    params: GoogleSheetsAPIParameters<"sheets.spreadsheets.developerMetadata.search">,
  ): Promise<GoogleSheetsAPIResponse<"sheets.spreadsheets.developerMetadata.search">> {
    const request: GoogleSheetsAPIRequest<"sheets.spreadsheets.developerMetadata.search"> = {
      method: "POST",
      url: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/developerMetadata:search",
      path: {
        spreadsheetId: params.spreadsheetId,
      },
      query: null,
      body: params.body,
    };
    return this._makeRequest("sheets.spreadsheets.developerMetadata.search", request);
  }

  public async updateValues(
    params: GoogleSheetsAPIParameters<"sheets.spreadsheets.values.update">,
  ): Promise<GoogleSheetsAPIResponse<"sheets.spreadsheets.values.update">> {
    const request: GoogleSheetsAPIRequest<"sheets.spreadsheets.values.update"> = {
      method: "PUT",
      url: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}",
      path: {
        range: params.range,
        spreadsheetId: params.spreadsheetId,
      },
      query: {
        includeValuesInResponse: params.includeValuesInResponse,
        responseDateTimeRenderOption: params.responseDateTimeRenderOption,
        responseValueRenderOption: params.responseValueRenderOption,
        valueInputOption: params.valueInputOption,
      },
      body: params.body,
    };
    return await this._makeRequest("sheets.spreadsheets.values.update", request);
  }

  private async _getAccessToken(): Promise<string> {
    const cachedToken = await this._kv.get("gsa_access_token");
    if (cachedToken === null) {
      const newToken = await this._oauth.getGoogleAuthToken();
      if (typeof newToken === "undefined") {
        throw new Error("Could not get an Access Token for Google Sheets");
      }
      const FIFTY_NINE_MINUTES = 3540;
      await this._kv.put("gsa_access_token", newToken, { expirationTtl: FIFTY_NINE_MINUTES });
      return newToken;
    } else {
      return cachedToken;
    }
  }

  private async _makeRequest<M extends GoogleSheetsAPIMethods>(
    _method: M,
    options: GoogleSheetsAPIRequest<M>,
  ): Promise<GoogleSheetsAPIResponse<M>> {
    if (this._accessToken === null) {
      this._accessToken = await this._getAccessToken();
    }
    let url = options.url as string;
    if (options.path !== null) {
      url = parseTemplate(options.url).expand(options.path);
    }
    if (options.query !== null) {
      let isFirstParam = true;
      for (const [key, value] of Object.entries(options.query)) {
        if (Array.isArray(value)) {
          let subUrl = "";
          for (const item of value) {
            if (isFirstParam) {
              subUrl += "?";
              isFirstParam = false;
            } else {
              subUrl += "&";
            }
            if (typeof item === "string" || typeof item === "boolean" || typeof value === "number") {
              subUrl += `${key}=${item}`;
            }
          }
          if (subUrl) {
            url += subUrl;
          }
        } else if (typeof value === "string" || typeof value === "boolean" || typeof value === "number") {
          if (isFirstParam) {
            url += "?";
            isFirstParam = false;
          } else {
            url += "&";
          }
          url += `${key}=${value}`;
        }
      }
    }
    const init: RequestInit = {
      method: options.method,
      headers: {
        Authorization: `Bearer ${this._accessToken}`,
      },
    };
    if (options.body !== null) {
      init.body = JSON.stringify(options.body);
    }
    const response = await fetch(url, init);
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(errorMessage);
      throw new Error("Error making API call to Google Sheets. See logs.");
    }
    return await response.json();
  }
}
