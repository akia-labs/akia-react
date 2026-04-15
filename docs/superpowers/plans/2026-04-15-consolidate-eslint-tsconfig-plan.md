# Consolidate ESLint and TypeScript Config Packages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove `packages/akia-react-eslint-config` and `packages/akia-react-tsconfig` packages, move their config files to root-level directories, and update subpackages to reference them via relative paths.

**Architecture:** Config files are consolidated from two workspace packages into root-level `eslint/` and `tsconfig/` directories. Subpackages own their own `eslint.config.js` and `tsconfig.json` which import from root via relative paths.

**Tech Stack:** ESLint flat config (ESM), TypeScript, pnpm workspaces

---

## File Map

### Files to CREATE at root:
- `eslint/base.js` — moved from `packages/akia-react-eslint-config/base.js`
- `eslint/react.js` — moved from `packages/akia-react-eslint-config/react.js`
- `tsconfig/base.json` — moved from `packages/akia-react-tsconfig/base.json`
- `tsconfig/react-library.json` — moved from `packages/akia-react-tsconfig/react-library.json`
- `tsconfig/react-app.json` — moved from `packages/akia-react-tsconfig/react-app.json`
- `tsconfig/astro.json` — moved from `packages/akia-react-tsconfig/astro.json`

Note: `eslint/astro.js` is not created — it currently just re-exports react config with no additions and is unused. `tsconfig/astro.json` is kept as it may be used by Astro projects.

### Files to MODIFY:
- `packages/akia-react-ai-markdown/eslint.config.js` — change import from `akia-react-eslint-config/react.js` to `../../eslint/react.js`
- `packages/akia-react-ai-markdown/tsconfig.json` — change `extends` to `../../tsconfig/react-library.json`
- `packages/akia-react-ai-markdown/package.json` — remove `akia-react-eslint-config` and `akia-react-tsconfig` from devDependencies, add direct eslint/typescript deps
- `packages/akia-react-livecode/eslint.config.js` — same change as above
- `packages/akia-react-livecode/tsconfig.json` — same change as above
- `packages/akia-react-livecode/package.json` — same change as above
- `tsconfig.json` (root) — change `extends` from `./tsconfig.base.json` to `./tsconfig/base.json`
- `package.json` (root) — remove `eslint` and `typescript` from devDependencies

### Files to DELETE:
- `packages/akia-react-eslint-config/` (entire directory)
- `packages/akia-react-tsconfig/` (entire directory)
- `tsconfig.base.json` (replaced by `tsconfig/base.json`)

---

## Tasks

### Task 1: Create `eslint/` directory at root with base configs

- [ ] **Step 1: Create `eslint/` directory**

```bash
mkdir -p eslint
```

- [ ] **Step 2: Create `eslint/base.js`**

```js
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        node: true
      }
    }
  }
];
```

- [ ] **Step 3: Create `eslint/react.js`**

```js
import baseConfig from './base.js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
      },
      globals: {
        browser: true
      }
    },
    plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      ...tseslint.configs.recommended.rules
    }
  }
];
```

- [ ] **Step 4: Commit**

```bash
git add eslint/
git commit -m "feat: move eslint configs to root eslint/ directory"
```

---

### Task 2: Create `tsconfig/` directory at root with base configs

- [ ] **Step 1: Create `tsconfig/` directory**

```bash
mkdir -p tsconfig
```

- [ ] **Step 2: Create `tsconfig/base.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

- [ ] **Step 3: Create `tsconfig/react-library.json`**

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "moduleResolution": "bundler"
  }
}
```

- [ ] **Step 4: Create `tsconfig/react-app.json`**

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "noEmit": true,
    "jsx": "react-jsx",
    "moduleResolution": "bundler"
  }
}
```

- [ ] **Step 5: Create `tsconfig/astro.json`**

```json
{
  "extends": "./react-app.json",
  "compilerOptions": {
    "allowJs": true
  }
}
```

- [ ] **Step 6: Commit**

```bash
git add tsconfig/
git commit -m "feat: move tsconfig packages to root tsconfig/ directory"
```

---

### Task 3: Update subpackage `eslint.config.js` files

- [ ] **Step 1: Update `packages/akia-react-ai-markdown/eslint.config.js`**

```js
import config from '../../eslint/react.js';

export default config;
```

- [ ] **Step 2: Update `packages/akia-react-livecode/eslint.config.js`**

```js
import config from '../../eslint/react.js';

export default config;
```

- [ ] **Step 3: Commit**

```bash
git add packages/akia-react-ai-markdown/eslint.config.js packages/akia-react-livecode/eslint.config.js
git commit -m "refactor: update eslint.config.js imports to use root eslint/ directory"
```

---

### Task 4: Update subpackage `tsconfig.json` files

- [ ] **Step 1: Update `packages/akia-react-ai-markdown/tsconfig.json`**

```json
{
  "extends": "../../tsconfig/react-library.json",
  "include": ["src", "vite.config.ts"]
}
```

- [ ] **Step 2: Update `packages/akia-react-livecode/tsconfig.json`**

```json
{
  "extends": "../../tsconfig/react-library.json",
  "include": ["src", "vite.config.ts"]
}
```

- [ ] **Step 3: Commit**

```bash
git add packages/akia-react-ai-markdown/tsconfig.json packages/akia-react-livecode/tsconfig.json
git commit -m "refactor: update tsconfig.json extends to use root tsconfig/ directory"
```

---

### Task 5: Update subpackage `package.json` files

- [ ] **Step 1: Read current `packages/akia-react-ai-markdown/package.json`**

Current devDependencies include:
```json
"akia-react-eslint-config": "workspace:*",
"akia-react-tsconfig": "workspace:*",
"eslint": "^9.25.0",
"typescript": "^5.8.0",
"@typescript-eslint/eslint-plugin": "^8.0.0",
"@typescript-eslint/parser": "^8.0.0"
```

These already have direct deps for eslint and typescript. Just remove the workspace references to `akia-react-eslint-config` and `akia-react-tsconfig`.

- [ ] **Step 2: Update `packages/akia-react-ai-markdown/package.json`**

Remove `"akia-react-eslint-config": "workspace:*"` and `"akia-react-tsconfig": "workspace:*"` from devDependencies. Keep all other deps.

- [ ] **Step 3: Update `packages/akia-react-livecode/package.json`**

Same change as above.

- [ ] **Step 4: Commit**

```bash
git add packages/akia-react-ai-markdown/package.json packages/akia-react-livecode/package.json
git commit -m "refactor: remove workspace:* eslint and tsconfig package references from subpackages"
```

---

### Task 6: Update root `tsconfig.json` and remove `tsconfig.base.json`

- [ ] **Step 1: Update root `tsconfig.json`**

```json
{
  "extends": "./tsconfig/base.json",
  "files": []
}
```

- [ ] **Step 2: Delete `tsconfig.base.json`**

```bash
rm tsconfig.base.json
```

- [ ] **Step 3: Commit**

```bash
git add tsconfig.json tsconfig.base.json
git commit -m "refactor: update root tsconfig.json to extend tsconfig/base.json"
```

---

### Task 7: Update root `package.json` to remove eslint and typescript devDependencies

- [ ] **Step 1: Update root `package.json`**

Remove from devDependencies:
```json
"eslint": "^9.25.0",
"typescript": "5.9.3"
```

Keep everything else.

- [ ] **Step 2: Commit**

```bash
git add package.json
git commit -m "chore: remove eslint and typescript from root devDependencies"
```

---

### Task 8: Remove old config packages directories

- [ ] **Step 1: Remove `packages/akia-react-eslint-config/`**

```bash
rm -rf packages/akia-react-eslint-config
```

- [ ] **Step 2: Remove `packages/akia-react-tsconfig/`**

```bash
rm -rf packages/akia-react-tsconfig
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove akia-react-eslint-config and akia-react-tsconfig packages"
```

---

### Task 9: Verify build

- [ ] **Step 1: Run pnpm install to update lockfile**

```bash
pnpm install
```

- [ ] **Step 2: Run typecheck on subpackages**

```bash
pnpm --filter akia-react-ai-markdown typecheck
pnpm --filter akia-react-livecode typecheck
```

- [ ] **Step 3: Run lint on subpackages**

```bash
pnpm --filter akia-react-ai-markdown lint
pnpm --filter akia-react-livecode lint
```

---

## Spec Coverage Check

| Spec Requirement | Task(s) |
|-----------------|---------|
| Move eslint configs to root `eslint/` | Task 1 |
| Move tsconfig configs to root `tsconfig/` | Task 2 |
| Update subpackage eslint.config.js imports | Task 3 |
| Update subpackage tsconfig.json extends | Task 4 |
| Remove workspace package refs from subpackage package.json | Task 5 |
| Update root tsconfig.json | Task 6 |
| Remove eslint/typescript from root devDependencies | Task 7 |
| Remove old config packages | Task 8 |
| Verify build/lint/typecheck pass | Task 9 |