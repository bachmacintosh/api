import type { Env } from "./cloudflare";
import type { REST } from "@discordjs/rest";

export type CodeScanningAlertEvent =
  | CodeScanningAlertEventAppearedInBranch
  | CodeScanningAlertEventClosedByUser
  | CodeScanningAlertEventCreated
  | CodeScanningAlertEventFixed
  | CodeScanningAlertEventReopened
  | CodeScanningAlertEventReopenedByUser;

export interface CodeScanningAlertEventAppearedInBranch {
  action: "appeared_in_branch";
  alert: {
    created_at: string;
    dismissed_at: string | null;
    dismissed_by: User | null;
    dismissed_reason: "false positive" | "used in tests" | "won't fix" | null;
    html_url: string;
    number: number;
    rule: {
      description: string;
      id: string;
      severity: "error" | "none" | "note" | "warning" | null;
    };
    state: "dismissed" | "fixed" | "open";
    tool: {
      name: string;
      version: string | null;
    };
    url: string;
    most_recent_instance?: CodeScanningAlertInstance | null;
  };
  commit_old: string;
  ref: string;
  repository: Repository;
  sender: GitHubThemselves;
  installation?: PartialInstallation;
  organization?: Organization;
}

export interface CodeScanningAlertEventClosedByUser {
  action: "closed_by_user";
  alert: {
    created_at: string;
    dismissed_at: string;
    dismissed_by: User | null;
    dismissed_reason: "false positive" | "used in tests" | "won't fix" | null;
    html_url: string;
    number: number;
    rule: {
      description: string;
      id: string;
      severity: "error" | "none" | "note" | "warning" | null;
      full_description?: string;
      help?: string | null;
      help_uri?: string | null;
      name?: string;
      tags?: string[] | null;
    };
    state: "dismissed" | "fixed";
    tool: {
      name: string;
      version: string | null;
      guid?: string | null;
    };
    url: string;
    most_recent_instance?: CodeScanningAlertInstance | null;
  };
  commit_old: "";
  ref: "";
  repository: Repository;
  sender: User;
  installation?: PartialInstallation;
  organization?: Organization;
}

export interface CodeScanningAlertEventCreated {
  action: "created";
  alert: {
    created_at: string | null;
    dismissed_at: null;
    dismissed_by: null;
    dismissed_reason: null;
    html_url: string;
    number: number;
    rule: {
      description: string;
      id: string;
      severity: "error" | "none" | "note" | "warning" | null;
      full_description?: string;
      help?: string | null;
      help_uri?: string | null;
      name?: string;
      tags?: string[] | null;
    };
    state: "dismissed" | "open";
    tool: {
      name: string;
      version: string | null;
      guid?: string | null;
    };
    dismissed_comment?: string | null;
    fixed_at?: null;
    instances_url?: string;
    most_recent_instance?: CodeScanningAlertInstance | null;
    updated_at?: string | null;
  };
  commit_old: string;
  ref: string;
  repository: Repository;
  sender: GitHubThemselves;
  installation?: PartialInstallation;
  organization?: Organization;
}

export interface CodeScanningAlertEventFixed {
  action: "fixed";
  alert: {
    created_at: string;
    dismissed_at: string | null;
    dismissed_by: User | null;
    dismissed_reason: "false positive" | "used in tests" | "won't fix" | null;
    html_url: string;
    number: number;
    rule: {
      description: string;
      id: string;
      severity: "error" | "none" | "note" | "warning" | null;
      full_description?: string;
      help?: string | null;
      help_uri?: string | null;
      name?: string;
      tags?: string[] | null;
    };
    state: "fixed";
    tool: {
      name: string;
      version: string | null;
      guid?: string | null;
    };
    url: string;
    instances_url?: string;
    most_recent_instance?: CodeScanningAlertInstance | null;
  };
  commit_old: string;
  ref: string;
  repository: Repository;
  sender: GitHubThemselves;
  installation?: PartialInstallation;
  organization?: Organization;
}

export interface CodeScanningAlertEventReopened {
  action: "reopened";
  alert: {
    created_at: string;
    dismissed_at: string | null;
    dismissed_by: User | null;
    dismissed_reason: "false positive" | "used in tests" | "won't fix" | null;
    html_url: string;
    number: number;
    rule: {
      description: string;
      id: string;
      severity: "error" | "none" | "note" | "warning" | null;
      full_description?: string;
      help?: string | null;
      help_uri?: string | null;
      name?: string;
      tags?: string[] | null;
    };
    state: "dismissed" | "fixed" | "open";
    tool: {
      name: string;
      version: string | null;
      guid?: string | null;
    };
    url: string;
    most_recent_instance?: CodeScanningAlertInstance | null;
  };
  commit_old: string;
  ref: string;
  repository: Repository;
  sender: GitHubThemselves;
  installation?: PartialInstallation;
  organization?: Organization;
}

export interface CodeScanningAlertEventReopenedByUser {
  action: "reopened_by_user";
  alert: {
    created_at: string;
    dismissed_at: null;
    dismissed_by: null;
    dismissed_reason: null;
    html_url: string;
    number: number;
    rule: {
      description: string;
      id: string;
      severity: "error" | "none" | "note" | "warning" | null;
    };
    state: "fixed" | "open";
    tool: {
      name: string;
      version: string | null;
    };
    url: string;
    most_recent_instance?: CodeScanningAlertInstance | null;
  };
  commit_old: "";
  ref: "";
  repository: Repository;
  sender: User;
  installation?: PartialInstallation;
  organization?: Organization;
}

export interface CodeScanningAlertInstance {
  analysis_key: string;
  environment: string;
  ref: `refs/heads/${string}`;
  state: "dismissed" | "fixed" | "open";
  category?: string;
  classifications?: string[];
  commit_sha?: string;
  location?: {
    end_column?: number;
    end_line?: number;
    path?: string;
    start_column?: number;
    start_line?: number;
  };
  message?: {
    text?: string;
  };
}

export interface DependabotAlertDependency {
  manifest_path?: string;
  package?: {
    ecosystem: string;
    name: string;
  };
  scope?: "development" | "runtime" | null;
}

export type DependabotAlertEvent =
  | DependabotAlertEventAutoDismissed
  | DependabotAlertEventAutoReopened
  | DependabotAlertEventCreated
  | DependabotAlertEventDismissed
  | DependabotAlertEventFixed
  | DependabotAlertEventReintroduced
  | DependabotAlertEventReopened;

export interface DependabotAlertEventAutoDismissed {
  action: "auto_dismissed";
  alert: {
    created_at: string;
    dependency: DependabotAlertDependency;
    dismissed_at: string | null;
    dismissed_by: User | null;
    dismissed_comment: string | null;
    dismissed_reason: "fix_started" | "inaccurate" | "no_bandwidth" | "not_used" | "tolerable_risk" | null;
    fixed_at: string | null;
    html_url: string;
    number: number;
    security_advisory: DependabotAlertSecurityAdvisory;
    security_vulnerability: DependabotAlertVulnerability;
    state: "auto_dismissed";
    updated_at: string;
    url: string;
    auto_dismissed_at?: string | null;
  };
  repository: Repository;
  sender: User;
  installation?: PartialInstallation;
  organization?: Organization;
}

export interface DependabotAlertEventAutoReopened {
  action: "auto_reopened";
  alert: {
    created_at: string;
    dependency: DependabotAlertDependency;
    dismissed_at: string | null;
    dismissed_by: User | null;
    dismissed_comment: string | null;
    dismissed_reason: "fix_started" | "inaccurate" | "no_bandwidth" | "not_used" | "tolerable_risk" | null;
    fixed_at: string | null;
    html_url: string;
    number: number;
    security_advisory: DependabotAlertSecurityAdvisory;
    security_vulnerability: DependabotAlertVulnerability;
    state: "open";
    updated_at: string;
    url: string;
    auto_dismissed_at?: string | null;
  };
  repository: Repository;
  sender: User;
  installation?: PartialInstallation;
  organization?: Organization;
}

export interface DependabotAlertEventCreated {
  action: "created";
  alert: {
    created_at: string;
    dependency: DependabotAlertDependency;
    dismissed_at: null;
    dismissed_by: null;
    dismissed_comment: null;
    dismissed_reason: null;
    fixed_at: null;
    html_url: string;
    number: number;
    security_advisory: DependabotAlertSecurityAdvisory;
    security_vulnerability: DependabotAlertVulnerability;
    state: "open";
    updated_at: string;
    url: string;
    auto_dismissed_at?: string | null;
  };
  repository: Repository;
  sender: User;
  installation?: PartialInstallation;
  organization?: Organization;
}

export interface DependabotAlertEventDismissed {
  action: "dismissed";
  alert: {
    created_at: string;
    dependency: DependabotAlertDependency;
    dismissed_at: string;
    dismissed_by: User;
    dismissed_comment: string | null;
    dismissed_reason: "fix_started" | "inaccurate" | "no_bandwidth" | "not_used" | "tolerable_risk" | null;
    fixed_at: null;
    html_url: string;
    number: number;
    security_advisory: DependabotAlertSecurityAdvisory;
    security_vulnerability: DependabotAlertVulnerability;
    state: "dismissed";
    updated_at: string;
    url: string;
    auto_dismissed_at?: string | null;
  };
  repository: Repository;
  sender: User;
  installation?: PartialInstallation;
  organization?: Organization;
}

export interface DependabotAlertEventFixed {
  action: "fixed";
  alert: {
    created_at: string;
    dependency: DependabotAlertDependency;
    dismissed_at: string | null;
    dismissed_by: User | null;
    dismissed_comment: string | null;
    dismissed_reason: "fix_started" | "inaccurate" | "no_bandwidth" | "not_used" | "tolerable_risk" | null;
    fixed_at: string;
    html_url: string;
    number: number;
    security_advisory: DependabotAlertSecurityAdvisory;
    security_vulnerability: DependabotAlertVulnerability;
    state: "fixed";
    updated_at: string;
    url: string;
    auto_dismissed_at?: string | null;
  };
  repository: Repository;
  sender: User;
  installation?: PartialInstallation;
  organization?: Organization;
}

export interface DependabotAlertEventReintroduced {
  action: "reintroduced";
  alert: {
    created_at: string;
    dependency: DependabotAlertDependency;
    dismissed_at: string | null;
    dismissed_by: User | null;
    dismissed_comment: string | null;
    dismissed_reason: "fix_started" | "inaccurate" | "no_bandwidth" | "not_used" | "tolerable_risk" | null;
    fixed_at: string | null;
    html_url: string;
    number: number;
    security_advisory: DependabotAlertSecurityAdvisory;
    security_vulnerability: DependabotAlertVulnerability;
    state: "open";
    updated_at: string;
    url: string;
    auto_dismissed_at?: string | null;
  };
  repository: Repository;
  sender: User;
  installation?: PartialInstallation;
  organization?: Organization;
}

export interface DependabotAlertEventReopened {
  action: "reopened";
  alert: {
    created_at: string;
    dependency: DependabotAlertDependency;
    dismissed_at: string | null;
    dismissed_by: User | null;
    dismissed_comment: string | null;
    dismissed_reason: "fix_started" | "inaccurate" | "no_bandwidth" | "not_used" | "tolerable_risk" | null;
    fixed_at: string | null;
    html_url: string;
    number: number;
    security_advisory: DependabotAlertSecurityAdvisory;
    security_vulnerability: DependabotAlertVulnerability;
    state: "open";
    updated_at: string;
    url: string;
    auto_dismissed_at?: string | null;
  };
  repository: Repository;
  sender: User;
  installation?: PartialInstallation;
  organization?: Organization;
}

export interface DependabotAlertSecurityAdvisory {
  cve_id: string | null;
  cvss: {
    score: number;
    vector_string: string | null;
  };
  cwes: {
    cwe_id: string;
    name: string;
  };
  description: string;
  ghsa_id: string;
  identifiers: {
    type: string;
    value: string;
  }[];
  published_at: string;
  references: {
    url: string;
  }[];
  severity: "critical" | "high" | "low" | "medium";
  summary: string;
  updated_at: string;
  vulnerabilities: DependabotAlertVulnerability[];
  withdrawn_at: string | null;
}

export interface DependabotAlertVulnerability {
  first_patched_version: { identifier: string } | null;
  package: {
    ecosystem: string;
    name: string;
  };
  severity: "critical" | "high" | "low" | "medium";
  vulnerable_version_range: string;
}

export const gitHubThemselves = {
  login: "github",
  id: 9919,
  node_id: "MDEyOk9yZ2FuaXphdGlvbjk5MTk=",
  name: "GitHub",
  email: null,
  avatar_url: "https://avatars.githubusercontent.com/u/9919?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/github",
  html_url: "https://github.com/github",
  followers_url: "https://api.github.com/users/github/followers",
  following_url: "https://api.github.com/users/github/following{/other_user}",
  gists_url: "https://api.github.com/users/github/gists{/gist_id}",
  starred_url: "https://api.github.com/users/github/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/github/subscriptions",
  organizations_url: "https://api.github.com/users/github/orgs",
  repos_url: "https://api.github.com/users/github/repos",
  events_url: "https://api.github.com/users/github/events{/privacy}",
  received_events_url: "https://api.github.com/users/github/received_events",
  type: "Organization",
  site_admin: false,
} as const satisfies User;

export type GitHubThemselves = typeof gitHubThemselves;

export interface License {
  key: string;
  name: string;
  node_id: string;
  spdx_id: string;
  url: string | null;
}

export interface Organization {
  avatar_url: string;
  description: string | null;
  events_url: string;
  hooks_url: string;
  id: number;
  issues_url: string;
  login: string;
  members_url: string;
  node_id: string;
  public_members_url: string;
  repos_url: string;
  url: string;
  html_url?: string;
}

export interface PartialInstallation {
  id: number;
  node_id: string;
}

export interface PingEvent {
  hook?: {
    active: boolean;
    config: {
      content_type: "form" | "json";
      insecure_ssl?: "0" | "1" | 0 | 1;
      secret?: string;
      url?: string;
    };
    created_at: string;
    events: string[];
    id: number;
    name: "web";
    type: string;
    updated_at: string;
    app_id?: number;
    deliveries_url?: string;
    ping_url?: string;
    test_url?: string;
    url?: string;
  };
  hook_id?: number;
  organization?: Organization;
  repository?: Repository;
  sender?: User;
  zen?: string;
}

export interface Repository {
  archive_url: string;
  archived: boolean;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  clone_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  created_at: number | string;
  default_branch: string;
  deployments_url: string;
  description: string | null;
  downloads_url: string;
  events_url: string;
  fork: boolean;
  forks: number;
  forks_count: number;
  forks_url: string;
  full_name: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url: string;
  has_downloads: boolean;
  has_issues: boolean;
  has_pages: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  homepage: string | null;
  hooks_url: string;
  html_url: string;
  id: number;
  is_template: boolean;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  language: string | null;
  languages_url: string;
  license: License | null;
  merges_url: string;
  milestones_url: string;
  mirror_url: string | null;
  name: string;
  node_id: string;
  notifications_url: string;
  open_issues: number;
  open_issues_count: number;
  owner: User;
  private: boolean;
  pulls_url: string;
  pushed_at: number | string | null;
  releases_url: string;
  size: number;
  ssh_url: string;
  stargazers_count: number;
  stargazers_url: string;
  statuses_url: string;
  subscribers_url: string;
  subscription_url: string;
  svn_url: string;
  tags_url: string;
  teams_url: string;
  topics: string[];
  trees_url: string;
  updated_at: string;
  url: string;
  visibility: "internal" | "private" | "public";
  watchers: number;
  watchers_count: number;
  web_commit_signoff_required: boolean;
  allow_auto_merge?: boolean;
  allow_forking?: boolean;
  allow_merge_commit?: boolean;
  allow_rebase_merge?: boolean;
  allow_squash_merge?: boolean;
  allow_update_branch?: boolean;
  delete_branch_on_merge?: boolean;
  disabled?: boolean;
  has_discussions?: boolean;
  master_branch?: string;
  merge_commit_message?: string;
  merge_commit_title?: string;
  organization?: string;
  permissions?: {
    admin: boolean;
    pull: boolean;
    push: boolean;
    maintain?: boolean;
    triage?: boolean;
  };
  public?: boolean;
  squash_merge_commit_message?: string;
  squash_merge_commit_title?: string;
  stargazers?: number;
  use_squash_pr_title_as_default?: boolean;
}

export interface User {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: "Bot" | "Organization" | "User";
  url: string;
  email?: string | null;
  name?: string;
}

export interface WebhookEventMap {
  code_scanning_alert: CodeScanningAlertEvent;
  dependabot_alert: DependabotAlertEvent;
  discussion: null;
  discussion_comment: null;
  issue_comment: null;
  issues: null;
  meta: null;
  ping: PingEvent;
  pull_request: null;
  push: null;
  repository_advisory: null;
  secret_scanning_alert: null;
  secret_scanning_alert_location: null;
  star: null;
}

export type WebhookEventName = keyof WebhookEventMap;

export type GitHubWebhookEventRunner<K extends WebhookEventName> = (
  event: WebhookEventMap[K],
  env: Env,
  rest: REST,
) => Promise<void>;
