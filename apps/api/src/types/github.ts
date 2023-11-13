import type { Env } from "./cloudflare";
import type { REST } from "@discordjs/rest";

export type ActiveLockReason = "off-topic" | "resolved" | "spam" | "too heated";

export interface Author {
  name: string;
  date?: string;
  email?: string | null;
  username?: string;
}

export interface AuthorWithEmail extends Author {
  email: string | null;
}

export type AuthorAssociation =
  | "COLLABORATOR"
  | "CONTRIBUTOR"
  | "FIRST_TIME_CONTRIBUTOR"
  | "FIRST_TIMER"
  | "MANNEQUIN"
  | "MEMBER"
  | "NONE"
  | "OWNER";

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

export interface Commit {
  author: AuthorWithEmail;
  committer: AuthorWithEmail;
  distinct: boolean;
  id: string;
  message: string;
  timestamp: string;
  tree_id: string;
  url: string;
  added?: string[];
  modified?: string[];
  removed?: string[];
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

export interface Discussion {
  active_lock_reason: ActiveLockReason | null;
  answer_chosen_at: string | null;
  answer_chosen_by: User | null;
  answer_html_url: string | null;
  author_association: AuthorAssociation;
  body: string;
  category: DiscussionCategory;
  comments: number;
  created_at: string;
  html_url: string;
  id: string;
  locked: boolean;
  node_id: string;
  number: number;
  reactions: Reactions;
  repository_url: string;
  state: "closed" | "converting" | "locked" | "open" | "transferring";
  state_reason: "duplicate" | "outdated" | "reopened" | "resolved" | null;
  title: string;
  updated_at: string;
  user: User;
  timeline_url?: string;
}

export interface DiscussionCategory {
  created_at: string;
  description: string;
  emoji: string;
  id: number;
  is_answerable: boolean;
  name: string;
  repository_id: number;
  slug: string;
  updated_at: string;
  node_id?: string;
}

export interface DiscussionComment {
  author_association: AuthorAssociation;
  body: string;
  child_comment_count: number;
  created_at: string;
  discussion_id: number;
  html_url: string;
  id: number;
  node_id: number;
  parent_id: number | null;
  reactions: Reactions;
  repository_url: string;
  updated_at: string;
  user: User;
}

export type DiscussionCommentEvent = {
  comment: DiscussionComment;
  discussion: Discussion;
  repository: Repository;
  sender: User;
  installation?: PartialInstallation;
  organization?: Organization;
} & ({ action: "created" } | { action: "deleted" } | { action: "edited"; changes: { body: { from: string } } });

export type DiscussionEvent = {
  discussion: Discussion;
  repository: Repository;
  sender: User;
  installation?: PartialInstallation;
  organization?: Organization;
} & (
  | { action: "answered"; answer: DiscussionComment }
  | { action: "category_changed"; changes: { category: { from: DiscussionCategory } } }
  | { action: "closed" }
  | { action: "created" }
  | { action: "deleted" }
  | { action: "edited"; changes?: { body?: { from: string }; title?: { from: string } } }
  | { action: "labeled"; label: Label }
  | { action: "locked" }
  | { action: "pinned" }
  | { action: "reopened" }
  | { action: "transferred"; changes: { new_discussion: Discussion; new_repository: Repository } }
  | { action: "unanswered"; old_answer: DiscussionComment }
  | { action: "unlabeled"; label: Label }
  | { action: "unlocked" }
  | { action: "unpinned" }
);

export interface GitHubApp {
  created_at: string;
  description: string;
  events: string[];
  external_url: string;
  html_url: string;
  id: number;
  name: string;
  node_id: string;
  owner: User;
  permissions: {
    checks?: string;
    contents?: string;
    deployments?: string;
    issues?: string;
    metadata?: string;
  };
  updated_at: string;
  client_id?: string;
  client_secret?: string;
  installations_count?: number;
  pem?: string;
  slug?: string;
  webhook_secret?: string;
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

export interface Issue {
  active_lock_reason: ActiveLockReason | null;
  assignees: (User | null)[] | null;
  author_association: AuthorAssociation;
  body: string | null;
  closed_at: string | null;
  comments: number;
  comments_url: string;
  created_at: string;
  events_url: string;
  html_url: string;
  id: number;
  labels_url: string;
  milestone: Milestone;
  node_id: string;
  number: number;
  reactions: Reactions;
  repository_url: string;
  title: string;
  updated_at: string;
  url: string;
  user: User | null;
  assignee?: User | null;
  draft?: boolean;
  labels?: Label[];
  locked?: boolean;
  performed_via_github_app?: GitHubApp;
  pull_request?: {
    diff_url?: string;
    html_url?: string;
    merged_at?: string | null;
    patch_url?: string;
    url?: string;
  };
  state?: "closed" | "open";
  state_reason?: string | null;
  timeline_url?: string;
}

export interface IssueComment {
  author_association: AuthorAssociation;
  body: string;
  created_at: string;
  html_url: string;
  id: number;
  issue_url: string;
  node_id: string;
  performed_via_github_app: GitHubApp | null;
  reactions: Reactions;
  updated_at: string;
  url: string;
  user: User | null;
}

export type IssueCommentEvent = {
  comment: IssueComment;
  issue: Issue;
  repository: Repository;
  sender: User;
  installation?: PartialInstallation;
  organization?: Organization;
} & ({ action: "created" } | { action: "deleted" } | { action: "edited"; changes: { body?: { from: string } } });

export type IssuesEvent = {
  issue: Issue;
  repository: Repository;
  sender: User;
  installation?: PartialInstallation;
  organization?: Organization;
} & (
  | { action: "assigned"; assignee?: User | null }
  | { action: "closed" }
  | { action: "deleted" }
  | { action: "demilestoned"; milestone?: Milestone }
  | { action: "edited"; changes: { body?: { from: string }; title?: { from: string } }; label?: Label }
  | { action: "labeled"; label?: Label }
  | { action: "locked" }
  | { action: "milestoned"; milestone: Milestone }
  | { action: "opened"; changes?: { old_issue: Issue; old_repository: Repository } }
  | { action: "pinned" }
  | { action: "reopened" }
  | { action: "transferred"; changes: { new_issue: Issue; new_repository: Repository } }
  | { action: "unassigned"; assignee?: User | null }
  | { action: "unlabeled"; label?: Label }
  | { action: "unlocked" }
  | { action: "unpinned" }
);

export interface Label {
  color: string;
  default: boolean;
  description: string | null;
  id: number;
  name: string;
  node_id: string;
  url: string;
}

export interface License {
  key: string;
  name: string;
  node_id: string;
  spdx_id: string;
  url: string | null;
}

export interface MetaEvent {
  action: "deleted";
  hook: {
    active: boolean;
    config: {
      content_type: "form" | "json";
      insecure_ssl: "0" | "1";
      url: string;
      secret?: string;
    };
    created_at: string;
    events: string[];
    id: number;
    name: string;
    type: string;
    updated_at: string;
  };
  hook_id: number;
  installation?: PartialInstallation;
  organization?: Organization;
  repository?: Repository;
  sender?: User;
}

export interface Milestone {
  closed_at: string | null;
  closed_issues: number;
  created_at: string;
  creator: User | null;
  description: string | null;
  due_on: string | null;
  html_url: string;
  id: number;
  labels_url: string;
  node_id: string;
  number: number;
  open_issues: number;
  state: "closed" | "open";
  title: string;
  updated_at: string;
  url: string;
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

export interface PullRequest {
  // eslint-disable-next-line @typescript-eslint/naming-convention -- GitHub name
  _links: {
    comments: {
      href: string;
    };
    commits: {
      href: string;
    };
    html: {
      href: string;
    };
    issue: {
      href: string;
    };
    review_comment: {
      href: string;
    };
    review_comments: {
      href: string;
    };
    self: {
      href: string;
    };
    statuses: {
      href: string;
    };
  };
  active_lock_reason: ActiveLockReason | null;
  assignee: User | null;
  assignees: (User | null)[] | null;
  author_association: AuthorAssociation;
  auto_merge: {
    commit_message: string | null;
    commit_title: string | null;
    enabled_by: User | null;
    merge_method: "merge" | "rebase" | "squash";
  } | null;
  base: PullRequestLocation;
  body: string | null;
  closed_at: string | null;
  comments_url: string;
  commits_url: string;
  created_at: string;
  diff_url: string;
  draft: boolean;
  head: PullRequestLocation;
  html_url: string;
  id: number;
  issue_url: string;
  labels: Label[];
  locked: boolean;
  merge_commit_sha: string | null;
  merged_at: string | null;
  milestone: Milestone | null;
  node_id: string;
  number: number;
  patch_url: string;
  requested_reviewers: (Team | User)[];
  requested_teams: Team[];
  review_comment_url: string;
  review_comments_url: string;
  state: "closed" | "open";
  statuses_url: string;
  title: string;
  updated_at: string;
  url: string;
  user: User | null;
  additions?: number;
  changed_files?: number;
  comments?: number;
  commits?: number;
  deletions?: number;
  maintainer_can_modify?: boolean;
  mergeable?: boolean | null;
  mergeable_state?: string;
  merged?: boolean | null;
  merged_by?: User | null;
  rebaseable?: boolean | null;
  review_comments?: number;
}

export type PullRequestEvent = {
  number: number;
  pull_request: PullRequest;
  repository: Repository;
  sender: User;
  installation?: PartialInstallation;
  organization?: Organization;
} & (
  | {
      action: "edited";
      changes: {
        base?: { ref: { from: string }; sha: { from: string } };
        body?: { from: string };
        title?: { from: string };
      };
    }
  | { action: "assigned"; assignee: User }
  | { action: "auto_merge_disabled"; reason: string }
  | { action: "auto_merge_enabled"; reason?: string }
  | { action: "closed" }
  | { action: "converted_to_draft" }
  | { action: "demilestoned"; milestone?: Milestone }
  | { action: "dequeued"; reason: string }
  | { action: "enqueued" }
  | { action: "labeled" }
  | { action: "locked" }
  | { action: "milestoned"; milestone?: Milestone }
  | { action: "opened" }
  | { action: "ready_for_review" }
  | { action: "reopened" }
  | { action: "review_request_removed"; requested_reviewer: User | null; requested_team: Team | null }
  | { action: "review_requested"; requested_reviewer: User | null; requested_team: Team | null }
  | { action: "synchronize"; after: string; before: string }
  | { action: "unassigned"; assignee?: User | null }
  | { action: "unlabeled"; label?: Label }
  | { action: "unlocked" }
);

export interface PullRequestLocation {
  label: string;
  ref: string;
  repo: Repository;
  sha: string;
  user: User | null;
}

export interface PushEvent {
  after: string;
  base_ref: string | null;
  before: string;
  commits: Commit[];
  compare: string;
  created: boolean;
  deleted: boolean;
  forced: boolean;
  head_commit: Commit | null;
  pusher: Author;
  ref: string;
  repository: Repository;
  installation?: PartialInstallation;
  organization?: Organization;
  sender?: User;
}

export interface Reactions {
  "+1": number;
  "-1": number;
  confused: number;
  eyes: number;
  heart: number;
  hooray: number;
  laugh: number;
  rocket: number;
  total_count: number;
  url: string;
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

export interface RepositoryAdvisory {
  author: User | null;
  closed_at: string | null;
  collaborating_teams: Team[] | null;
  collaborating_users: User[] | null;
  created_at: string | null;
  credits: { login?: string; type?: RepositoryActionCreditType }[] | null;
  credits_detailed: (
    | { state: "accepted" | "declined" | "pending"; type: RepositoryActionCreditType; user: User }[]
    | null
  )[];
  cve_id: string | null;
  cvss: {
    score: number | null;
    vector_string: string | null;
  } | null;
  cwe_ids: string[] | null;
  cwes: { cwe_id: string; name: string } | null;
  description: string | null;
  ghsa_id: string;
  html_url: string;
  identifiers: { type: "CVE" | "GHSA"; value: string }[];
  private_fork: Repository | null;
  published_at: string | null;
  publisher: User | null;
  severity: "critical" | "high" | "low" | "medium" | null;
  state: "closed" | "draft" | "published" | "triage" | "withdrawn";
  submission: { accepted: boolean } | null;
  summary: string;
  updated_at: string | null;
  url: string;
  withdrawn_at: string | null;
}

export type RepositoryActionCreditType =
  | "analyst"
  | "coordinator"
  | "finder"
  | "other"
  | "remediation_developer"
  | "remediation_reviewer"
  | "remediation_verifier"
  | "reporter"
  | "sponsor"
  | "tool";

export interface RepositoryAdvisoryEvent {
  action: "published" | "reported";
  repository: Repository;
  installation?: PartialInstallation;
  organization?: Organization;
  sender?: User;
}

export interface Team {
  deleted: boolean;
  description: string | null;
  html_url: string;
  id: number;
  members_url: string;
  name: string;
  node_id: string;
  permission: string;
  privacy: "closed" | "open" | "secret";
  repositories_url: string;
  slug: string;
  url: string;
  notification_setting?: "notifications_disabled" | "notifications_enabled";
  parent?: Omit<Team, "parent"> | null;
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
  discussion: DiscussionEvent;
  discussion_comment: DiscussionCommentEvent;
  issue_comment: IssueCommentEvent;
  issues: IssuesEvent;
  meta: MetaEvent;
  ping: PingEvent;
  pull_request: PullRequestEvent;
  push: PushEvent;
  repository_advisory: RepositoryAdvisoryEvent;
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
