import {
  GetR2AnalyticsDocument,
  type GetR2AnalyticsQuery,
  type GetR2AnalyticsQueryVariables,
  GetWorkersAnalyticsDocument,
  type GetWorkersAnalyticsQuery,
  type GetWorkersAnalyticsQueryVariables,
} from "../types/cloudflare/graphql";
import type { Env } from "../types";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { print } from "graphql";

export default class CloudflareAnalytics {
  protected readonly env: Env;

  public constructor(env: Env) {
    this.env = env;
  }

  public async getR2Analytics(variables: GetR2AnalyticsQueryVariables): Promise<GetR2AnalyticsQuery> {
    return this._makeRequest(GetR2AnalyticsDocument, variables);
  }

  public async getWorkersAnalytics(variables: GetWorkersAnalyticsQueryVariables): Promise<GetWorkersAnalyticsQuery> {
    return await this._makeRequest(GetWorkersAnalyticsDocument, variables);
  }

  private async _makeRequest<T, V = Record<string, unknown>>(
    document: TypedDocumentNode<T, V>,
    variables?: V,
  ): Promise<T> {
    const query = print(document);
    const url = "https://api.cloudflare.com/client/v4/graphql";
    const init: RequestInit = {
      method: "POST",
      body: JSON.stringify({ query, variables }),
      headers: {
        Authorization: `Bearer ${this.env.CLOUDFLARE_GQL_TOKEN}`,
      },
    };

    const response = await fetch(url, init);
    const result = await response.json<{ data: null; errors: unknown[] } | { data: T; errors: null }>();
    if (result.errors !== null) {
      console.error(result.errors);
      throw new Error(`GraphQL Error`);
    }
    return result.data;
  }
}
