module.exports = {
  extends: ["custom/library"],
  ignorePatterns: ["dist/**"],
  rules: {
    "new-cap": ["error", { capIsNewExceptions: ["Router"] }],
  },
};
