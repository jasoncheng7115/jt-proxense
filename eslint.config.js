// ESLint flat config (ESLint 9). Deliberately modest: correctness rules and the
// React hooks rules — the classes of bug TypeScript cannot see — rather than a
// style regime. `npm run typecheck` still owns types.
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**', 'github/**', 'public/**', '.venv/**', 'tmp/**', '.pytest-tmp/**'] },
  {
    // Existing disable comments document intent (e.g. deps left out on
    // purpose); do not let --fix strip the ones that currently match nothing.
    linterOptions: { reportUnusedDisableDirectives: 'off' },
    files: ['src/**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser },
    },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // The codebase uses `any` at API boundaries on purpose (PVE payloads
      // vary by version); flag it without failing the build.
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrors: 'none' }],
      'no-empty': ['error', { allowEmptyCatch: true }],
      // 23 hits, all a redundant '\\-' inside the allow-list regexes that
      // validate operator input. Harmless, and not worth editing security
      // regexes for style; keep them visible as warnings.
      'no-useless-escape': 'warn',
      // useDialogs' empty option interfaces are intentional extension points.
      '@typescript-eslint/no-empty-object-type': 'warn',
    },
  },
);
