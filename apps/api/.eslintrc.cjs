module.exports = {
  extends: ["custom/library"],
  ignorePatterns: ["dist/**", "src/types/cloudflare/graphql.ts"],
  rules: {
    "new-cap": ["error", { capIsNewExceptions: ["Router"] }],
  },
};
