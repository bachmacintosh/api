import {
  GetR2AnalyticsDocument,
  type GetR2AnalyticsQuery,
  type GetR2AnalyticsQueryVariables,
  GetWorkersAnalyticsDocument,
  type GetWorkersAnalyticsQuery,
  type GetWorkersAnalyticsQueryVariables,
} from "../types/cloudflare/graphql";
import { GraphQLClient, type Variables } from "graphql-request";
import type { Env } from "../types";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

export default class CloudflareAnalytics {
  protected readonly client: GraphQLClient;
  protected readonly env: Env;

  public constructor(env: Env) {
    this.env = env;
    this.client = new GraphQLClient("https://api.cloudflare.com/client/v4/graphql", {
      fetch,
      headers: {
        Authorization: `Bearer ${env.CLOUDFLARE_GQL_TOKEN}`,
      },
    });
  }

  public async getR2Analytics(variables: GetR2AnalyticsQueryVariables): Promise<GetR2AnalyticsQuery> {
    return this._makeRequest(GetR2AnalyticsDocument, variables);
  }

  public async getWorkersAnalytics(variables: GetWorkersAnalyticsQueryVariables): Promise<GetWorkersAnalyticsQuery> {
    return await this._makeRequest(GetWorkersAnalyticsDocument, variables);
  }

  private async _makeRequest<T, V = Variables>(document: TypedDocumentNode<T, V>, variables?: Variables): Promise<T> {
    return await this.client.request(document, variables);
  }
}
