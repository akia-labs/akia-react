# Astro Starlight Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix code quality issues in the Astro Starlight docs app by adding missing configurations and dependencies.

**Architecture:** Apply specific fixes to create missing files and update existing ones for proper Starlight setup, including content config, site property, ESLint config, and type checking dependency.

**Tech Stack:** Astro, Starlight, ESLint, TypeScript, pnpm

---

### Task 1: Create content.config.ts

**Files:**
- Create: `apps/website/src/content.config.ts`

- [ ] **Step 1: Create the content.config.ts file**

Create `apps/website/src/content.config.ts` with the following content:

```ts
import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  docs,
};
```

- [ ] **Step 2: Verify file creation**

Run: `ls -la apps/website/src/content.config.ts`
Expected: File exists

- [ ] **Step 3: Commit**

```bash
git add apps/website/src/content.config.ts
git commit -m "Add content.config.ts for Starlight collections"
```

### Task 2: Update astro.config.mjs with site property

**Files:**
- Modify: `apps/website/astro.config.mjs`

- [ ] **Step 1: Update astro.config.mjs**

Add `site: "https://akia-react.example.com",` after the integrations array in the defineConfig call. The final config should have site before integrations.

- [ ] **Step 2: Verify the update**

Check that the file has the site property in the correct position.

- [ ] **Step 3: Commit**

```bash
git add apps/website/astro.config.mjs
git commit -m "Add site property to astro.config.mjs for sitemap generation"
```

### Task 3: Create eslint.config.js

**Files:**
- Create: `apps/website/eslint.config.js`

- [ ] **Step 1: Create eslint.config.js**

Create `apps/website/eslint.config.js` with the following content:

```js
import baseConfig from 'akia-react-eslint-config/astro.js';

export default [
  {
    ignores: ['.astro/**', 'dist/**', 'node_modules/**'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.mjs'],
    ...baseConfig,
  },
];
```

- [ ] **Step 2: Verify file creation**

Run: `ls -la apps/website/eslint.config.js`
Expected: File exists

- [ ] **Step 3: Commit**

```bash
git add apps/website/eslint.config.js
git commit -m "Add eslint.config.js for lint script"
```

### Task 4: Add @astrojs/check to package.json

**Files:**
- Modify: `apps/website/package.json`

- [ ] **Step 1: Update package.json**

Add `"@astrojs/check": "^0.9.0"` to devDependencies alongside other astrojs packages.

- [ ] **Step 2: Verify the update**

Check that @astrojs/check is in devDependencies.

- [ ] **Step 3: Commit**

```bash
git add apps/website/package.json
git commit -m "Add @astrojs/check devDependency for typecheck script"
```

### Task 5: Run pnpm install

**Files:**
- N/A

- [ ] **Step 1: Install dependencies**

Run: `cd apps/website && pnpm install`

- [ ] **Step 2: Verify installation**

Check that node_modules contains @astrojs/check

- [ ] **Step 3: Commit if lockfile changed**

```bash
git add pnpm-lock.yaml
git commit -m "Update lockfile after adding @astrojs/check"
```

### Task 6: Verify lint works

**Files:**
- N/A

- [ ] **Step 1: Run lint**

Run: `pnpm --filter akiawebsite lint`

- [ ] **Step 2: Check it doesn't fail catastrophically**

Expected: No fatal errors, may have warnings but should run

### Task 7: Verify typecheck works

**Files:**
- N/A

- [ ] **Step 1: Run typecheck**

Run: `pnpm --filter akiawebsite typecheck`

- [ ] **Step 2: Check it succeeds**

Expected: Type checking passes

### Task 8: Verify build succeeds

**Files:**
- N/A

- [ ] **Step 1: Run build**

Run: `pnpm --filter akiawebsite build`

- [ ] **Step 2: Check it succeeds**

Expected: Build completes successfully

### Task 9: Stage fixes

**Files:**
- N/A

- [ ] **Step 1: Stage all changes**

Run: `git add .`

- [ ] **Step 2: Amend or commit**

Amend to existing commit or create new commit as appropriate.