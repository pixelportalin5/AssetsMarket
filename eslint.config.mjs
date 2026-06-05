import { baseConfig } from "@assetsmarket/config-eslint/base";

/**
 * Root ESLint — lints repo-level config files and shared tooling.
 * Apps use their own eslint.config.mjs (frontend/next, backend/node).
 */
export default [
  ...baseConfig,
  {
    ignores: [
      "frontend/**",
      "backend/**",
      "packages/**",
      "node_modules/**",
      "dist/**",
      ".next/**",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parserOptions: {
        projectService: false,
      },
    },
  },
];
