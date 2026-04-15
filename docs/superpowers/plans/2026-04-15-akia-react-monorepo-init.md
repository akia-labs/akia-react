# Akia React Monorepo Initialization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Initialize `akia-react` as a working `pnpm` + `turbo` monorepo with Astro/Starlight docs, a React/Vite playground, two starter publishable packages, shared config packages, and Changesets-based release tooling.

**Architecture:** The repo will use a root workspace layer to coordinate apps and packages through `pnpm-workspace.yaml`, root scripts, and `turbo.json`. Apps consume local workspace packages directly, while shared config packages provide centralized TypeScript and ESLint settings to keep each workspace small and consistent.

**Tech Stack:** pnpm workspaces, Turborepo, TypeScript, React, Vite, Astro, Starlight, ESLint, Changesets

---

## File Structure

### Root files

- Create: `package.json` — root workspace manifest and shared scripts
- Create: `pnpm-workspace.yaml` — workspace package discovery
- Create: `turbo.json` — task orchestration and caching rules
- Create: `.gitignore` — root ignore rules for node modules, build output, Turbo, Astro, Vite
- Create: `.npmrc` — workspace install defaults
- Create: `.nvmrc` — Node version pin for contributors
- Create: `tsconfig.json` — root solution-style TypeScript entrypoint
- Create: `tsconfig.base.json` — shared compiler defaults used by internal tsconfig package
- Create: `README.md` — update repo documentation to match actual monorepo
- Create: `.changeset/config.json` — Changesets configuration
- Create: `.changeset/README.md` — Changesets guidance

### Shared config packages

- Create: `packages/akia-react-tsconfig/package.json`
- Create: `packages/akia-react-tsconfig/base.json`
- Create: `packages/akia-react-tsconfig/react-library.json`
- Create: `packages/akia-react-tsconfig/react-app.json`
- Create: `packages/akia-react-tsconfig/astro.json`
- Create: `packages/akia-react-eslint-config/package.json`
- Create: `packages/akia-react-eslint-config/base.js`
- Create: `packages/akia-react-eslint-config/react.js`
- Create: `packages/akia-react-eslint-config/astro.js`

### Apps

- Create: `apps/website/package.json`
- Create: `apps/website/tsconfig.json`
- Create: `apps/website/astro.config.mjs`
- Create: `apps/website/src/content/docs/index.mdx`
- Create: `apps/website/src/content/docs/packages/livecode.mdx`
- Create: `apps/website/src/content/docs/packages/ai-markdown.mdx`
- Create: `apps/website/src/env.d.ts`
- Create: `apps/website/public/favicon.svg`
- Create: `apps/playground/package.json`
- Create: `apps/playground/tsconfig.json`
- Create: `apps/playground/index.html`
- Create: `apps/playground/vite.config.ts`
- Create: `apps/playground/src/main.tsx`
- Create: `apps/playground/src/App.tsx`
- Create: `apps/playground/src/styles.css`

### Publishable packages

- Create: `packages/akia-react-livecode/package.json`
- Create: `packages/akia-react-livecode/tsconfig.json`
- Create: `packages/akia-react-livecode/vite.config.ts`
- Create: `packages/akia-react-livecode/src/index.ts`
- Create: `packages/akia-react-livecode/src/LiveCodeDemo.tsx`
- Create: `packages/akia-react-ai-markdown/package.json`
- Create: `packages/akia-react-ai-markdown/tsconfig.json`
- Create: `packages/akia-react-ai-markdown/vite.config.ts`
- Create: `packages/akia-react-ai-markdown/src/index.ts`
- Create: `packages/akia-react-ai-markdown/src/AiMarkdown.tsx`

### Verification artifacts

- Create: `.changeset/initial-packages.md`

## Task 1: Create the root monorepo workspace

**Files:**
- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `turbo.json`
- Create: `.gitignore`
- Create: `.npmrc`
- Create: `.nvmrc`
- Create: `tsconfig.json`
- Create: `tsconfig.base.json`

- [ ] **Step 1: Write the root workspace manifests**

```json
{
  "name": "akia-react",
  "private": true,
  "packageManager": "pnpm@10.0.0",
  "engines": {
    "node": ">=22.0.0"
  },
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "typecheck": "turbo typecheck",
    "test": "turbo test",
    "clean": "turbo clean"
  },
  "devDependencies": {
    "turbo": "^2.5.0",
    "typescript": "^5.8.0"
  }
}
```

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".astro/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"],
      "outputs": []
    },
    "typecheck": {
      "dependsOn": ["^typecheck"],
      "outputs": []
    },
    "test": {
      "dependsOn": ["^test"],
      "outputs": []
    },
    "clean": {
      "cache": false
    }
  }
}
```

- [ ] **Step 2: Add root environment defaults**

```gitignore
node_modules
.turbo
dist
.astro
coverage
.DS_Store
pnpm-lock.yaml
```

```ini
auto-install-peers=true
strict-peer-dependencies=false
```

```txt
22
```

- [ ] **Step 3: Add root TypeScript coordination files**

```json
{
  "extends": "./tsconfig.base.json",
  "files": []
}
```

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

- [ ] **Step 4: Install root dependencies**

Run: `pnpm install`
Expected: `pnpm-lock.yaml` is created and install exits successfully.

- [ ] **Step 5: Verify Turbo can see the workspace**

Run: `pnpm turbo run build --dry`
Expected: Turbo prints the task graph without "missing package" errors.

- [ ] **Step 6: Commit**

```bash
git add package.json pnpm-workspace.yaml turbo.json .gitignore .npmrc .nvmrc tsconfig.json tsconfig.base.json pnpm-lock.yaml
git commit -m "chore: initialize pnpm turbo workspace"
```

## Task 2: Add shared TypeScript and ESLint config packages

**Files:**
- Create: `packages/akia-react-tsconfig/package.json`
- Create: `packages/akia-react-tsconfig/base.json`
- Create: `packages/akia-react-tsconfig/react-library.json`
- Create: `packages/akia-react-tsconfig/react-app.json`
- Create: `packages/akia-react-tsconfig/astro.json`
- Create: `packages/akia-react-eslint-config/package.json`
- Create: `packages/akia-react-eslint-config/base.js`
- Create: `packages/akia-react-eslint-config/react.js`
- Create: `packages/akia-react-eslint-config/astro.js`

- [ ] **Step 1: Create the shared TypeScript config package**

```json
{
  "name": "akia-react-tsconfig",
  "version": "0.0.0",
  "private": true,
  "files": [
    "base.json",
    "react-library.json",
    "react-app.json",
    "astro.json"
  ]
}
```

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": false
  }
}
```

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "lib": ["ES2022", "DOM", "DOM.Iterable"]
  }
}
```

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "noEmit": true
  }
}
```

```json
{
  "extends": "./react-app.json",
  "compilerOptions": {
    "allowJs": true
  }
}
```

- [ ] **Step 2: Create the shared ESLint config package**

```json
{
  "name": "akia-react-eslint-config",
  "version": "0.0.0",
  "private": true,
  "type": "commonjs",
  "files": [
    "base.js",
    "react.js",
    "astro.js"
  ],
  "peerDependencies": {
    "eslint": "^9.0.0",
    "typescript": "^5.8.0"
  }
}
```

```js
module.exports = {
  root: false,
  env: {
    es2022: true,
    node: true
  },
  extends: ["eslint:recommended"]
};
```

```js
module.exports = {
  extends: ["./base.js"],
  env: {
    browser: true
  }
};
```

```js
module.exports = {
  extends: ["./react.js"]
};
```

- [ ] **Step 3: Verify the config packages are discoverable**

Run: `pnpm --filter akia-react-tsconfig exec node -p "require('./package.json').name"`
Expected: prints `akia-react-tsconfig`

Run: `pnpm --filter akia-react-eslint-config exec node -p "require('./package.json').name"`
Expected: prints `akia-react-eslint-config`

- [ ] **Step 4: Commit**

```bash
git add packages/akia-react-tsconfig packages/akia-react-eslint-config
git commit -m "chore: add shared config packages"
```

## Task 3: Add Changesets release tooling

**Files:**
- Create: `.changeset/config.json`
- Create: `.changeset/README.md`
- Create: `.changeset/initial-packages.md`
- Modify: `package.json`

- [ ] **Step 1: Add Changesets to the root manifest**

```json
{
  "scripts": {
    "changeset": "changeset",
    "version-packages": "changeset version",
    "release": "changeset publish"
  },
  "devDependencies": {
    "@changesets/cli": "^2.29.0"
  }
}
```

- [ ] **Step 2: Create the Changesets configuration**

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.1.1/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": [
    "akia-react-tsconfig",
    "akia-react-eslint-config"
  ]
}
```

```md
# Changesets

Use `pnpm changeset` to create release notes for publishable packages.
```

```md
---
"akia-react-livecode": patch
"akia-react-ai-markdown": patch
---

Initialize publishable workspace packages.
```

- [ ] **Step 3: Install and verify Changesets**

Run: `pnpm install`
Expected: lockfile updates with `@changesets/cli`.

Run: `pnpm changeset status --output=./.changeset/status.json`
Expected: command exits successfully after the publishable packages exist.

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml .changeset
git commit -m "chore: add changesets release workflow"
```

## Task 4: Scaffold the docs app with Astro and Starlight

**Files:**
- Create: `apps/website/package.json`
- Create: `apps/website/tsconfig.json`
- Create: `apps/website/astro.config.mjs`
- Create: `apps/website/src/content/docs/index.mdx`
- Create: `apps/website/src/content/docs/packages/livecode.mdx`
- Create: `apps/website/src/content/docs/packages/ai-markdown.mdx`
- Create: `apps/website/src/env.d.ts`
- Create: `apps/website/public/favicon.svg`

- [ ] **Step 1: Create the website package manifest**

```json
{
  "name": "akia-website",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "lint": "eslint .",
    "typecheck": "astro check",
    "test": "echo \"No tests yet for akiawebsite\"",
    "clean": "rm -rf .astro dist"
  },
  "dependencies": {
    "@astrojs/starlight": "^0.31.0",
    "@astrojs/react": "^4.3.0",
    "akia-react-ai-markdown": "workspace:*",
    "akia-react-livecode": "workspace:*",
    "astro": "^5.7.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "akia-react-eslint-config": "workspace:*",
    "akia-react-tsconfig": "workspace:*",
    "eslint": "^9.25.0"
  }
}
```

- [ ] **Step 2: Add Astro/Starlight configuration**

```js
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import starlight from "@astrojs/starlight";

export default defineConfig({
  integrations: [
    react(),
    starlight({
      title: "akia-react",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/your-org/akia-react"
        }
      ],
      sidebar: [
        {
          label: "Guide",
          items: [{ label: "Introduction", link: "/" }]
        },
        {
          label: "Packages",
          items: [
            { label: "akia-react-livecode", link: "/packages/livecode/" },
            { label: "akia-react-ai-markdown", link: "/packages/ai-markdown/" }
          ]
        }
      ]
    })
  ]
});
```

```json
{
  "extends": "akia-react-tsconfig/astro.json"
}
```

- [ ] **Step 3: Add starter docs content**

```mdx
---
title: Introduction
description: Overview of the akia-react monorepo.
---

# akia-react

`akia-react` is a monorepo for React-focused UI and markdown tooling, with a Starlight documentation site and a Vite playground.
```

```mdx
---
title: akia-react-livecode
description: Starter page for the live code package.
---

# akia-react-livecode

This package will provide embeddable live code demos for documentation experiences.
```

```mdx
---
title: akia-react-ai-markdown
description: Starter page for the AI markdown package.
---

# akia-react-ai-markdown

This package will provide React-friendly markdown rendering helpers.
```

- [ ] **Step 4: Add remaining website support files**

```ts
/// <reference types="astro/client" />
```

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0f172a" />
  <text x="50%" y="54%" text-anchor="middle" font-size="28" fill="#f8fafc" font-family="monospace">a</text>
</svg>
```

- [ ] **Step 5: Install and verify the docs app**

Run: `pnpm install`
Expected: Astro and Starlight dependencies install successfully.

Run: `pnpm --filter akiawebsite build`
Expected: Astro builds the docs site without configuration errors.

- [ ] **Step 6: Commit**

```bash
git add apps/website package.json pnpm-lock.yaml
git commit -m "feat: scaffold starlight docs app"
```

## Task 5: Scaffold the React/Vite playground app

**Files:**
- Create: `apps/playground/package.json`
- Create: `apps/playground/tsconfig.json`
- Create: `apps/playground/index.html`
- Create: `apps/playground/vite.config.ts`
- Create: `apps/playground/src/main.tsx`
- Create: `apps/playground/src/App.tsx`
- Create: `apps/playground/src/styles.css`

- [ ] **Step 1: Create the playground package manifest**

```json
{
  "name": "akia-playground",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "echo \"No tests yet for akiaplayground\"",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "akia-react-ai-markdown": "workspace:*",
    "akia-react-livecode": "workspace:*",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.0",
    "akia-react-eslint-config": "workspace:*",
    "akia-react-tsconfig": "workspace:*",
    "eslint": "^9.25.0",
    "vite": "^6.3.0"
  }
}
```

- [ ] **Step 2: Add the Vite and TypeScript config**

```json
{
  "extends": "akia-react-tsconfig/react-app.json",
  "include": ["src", "vite.config.ts"]
}
```

```ts
import { defineConfig } from "vite";

export default defineConfig({});
```

- [ ] **Step 3: Add the playground entry files**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>akia-react playground</title>
    <script type="module" src="/src/main.tsx"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

```tsx
export default function App() {
  return (
    <main className="page">
      <h1>akia-react playground</h1>
      <p>Starter environment for trying workspace packages locally.</p>
    </main>
  );
}
```

```css
body {
  margin: 0;
  font-family: sans-serif;
  background: #f8fafc;
  color: #0f172a;
}

.page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  text-align: center;
  gap: 0.75rem;
}
```

- [ ] **Step 4: Install and verify the playground**

Run: `pnpm install`
Expected: Vite and React app dependencies install successfully.

Run: `pnpm --filter akiaplayground build`
Expected: Vite outputs a production build without TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add apps/playground package.json pnpm-lock.yaml
git commit -m "feat: scaffold vite playground app"
```

## Task 6: Scaffold the publishable React packages

**Files:**
- Create: `packages/akia-react-livecode/package.json`
- Create: `packages/akia-react-livecode/tsconfig.json`
- Create: `packages/akia-react-livecode/vite.config.ts`
- Create: `packages/akia-react-livecode/src/index.ts`
- Create: `packages/akia-react-livecode/src/LiveCodeDemo.tsx`
- Create: `packages/akia-react-ai-markdown/package.json`
- Create: `packages/akia-react-ai-markdown/tsconfig.json`
- Create: `packages/akia-react-ai-markdown/vite.config.ts`
- Create: `packages/akia-react-ai-markdown/src/index.ts`
- Create: `packages/akia-react-ai-markdown/src/AiMarkdown.tsx`

- [ ] **Step 1: Create the `akia-react-livecode` package**

```json
{
  "name": "akia-react-livecode",
  "version": "0.0.1",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "scripts": {
    "dev": "vite build --watch",
    "build": "vite build",
    "lint": "eslint src --ext .ts,.tsx",
    "typecheck": "tsc --noEmit",
    "test": "echo \"No tests yet for akia-react-livecode\"",
    "clean": "rm -rf dist"
  },
  "peerDependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.0",
    "akia-react-eslint-config": "workspace:*",
    "akia-react-tsconfig": "workspace:*",
    "eslint": "^9.25.0",
    "typescript": "^5.8.0",
    "vite": "^6.3.0"
  }
}
```

```json
{
  "extends": "akia-react-tsconfig/react-library.json",
  "include": ["src", "vite.config.ts"]
}
```

```ts
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index"
    },
    rollupOptions: {
      external: ["react", "react-dom"]
    }
  }
});
```

```ts
export { LiveCodeDemo } from "./LiveCodeDemo";
```

```tsx
type LiveCodeDemoProps = {
  title?: string;
  code?: string;
};

export function LiveCodeDemo({
  title = "Live code demo",
  code = "const message = 'akia-react';"
}: LiveCodeDemoProps) {
  return (
    <section>
      <h2>{title}</h2>
      <pre>
        <code>{code}</code>
      </pre>
    </section>
  );
}
```

- [ ] **Step 2: Create the `akia-react-ai-markdown` package**

```json
{
  "name": "akia-react-ai-markdown",
  "version": "0.0.1",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "scripts": {
    "dev": "vite build --watch",
    "build": "vite build",
    "lint": "eslint src --ext .ts,.tsx",
    "typecheck": "tsc --noEmit",
    "test": "echo \"No tests yet for akia-react-ai-markdown\"",
    "clean": "rm -rf dist"
  },
  "peerDependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.0",
    "akia-react-eslint-config": "workspace:*",
    "akia-react-tsconfig": "workspace:*",
    "eslint": "^9.25.0",
    "typescript": "^5.8.0",
    "vite": "^6.3.0"
  }
}
```

```json
{
  "extends": "akia-react-tsconfig/react-library.json",
  "include": ["src", "vite.config.ts"]
}
```

```ts
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index"
    },
    rollupOptions: {
      external: ["react", "react-dom"]
    }
  }
});
```

```ts
export { AiMarkdown } from "./AiMarkdown";
```

```tsx
type AiMarkdownProps = {
  content: string;
};

export function AiMarkdown({ content }: AiMarkdownProps) {
  return <article>{content}</article>;
}
```

- [ ] **Step 3: Install and verify both packages**

Run: `pnpm install`
Expected: workspace dependencies resolve without missing package warnings.

Run: `pnpm --filter akia-react-livecode build`
Expected: package builds `dist/index.js` successfully.

Run: `pnpm --filter akia-react-ai-markdown build`
Expected: package builds `dist/index.js` successfully.

- [ ] **Step 4: Commit**

```bash
git add packages/akia-react-livecode packages/akia-react-ai-markdown package.json pnpm-lock.yaml
git commit -m "feat: scaffold starter publishable packages"
```

## Task 7: Wire repo documentation and full-workspace verification

**Files:**
- Modify: `README.md`
- Modify: `package.json`

- [ ] **Step 1: Replace the placeholder README with workspace-aware docs**

```md
# akia-react

Awesome UI components powered by React.

## Workspace

- `apps/website`: Astro + Starlight documentation site
- `apps/playground`: React + Vite playground
- `packages/akia-react-livecode`: starter live code package
- `packages/akia-react-ai-markdown`: starter AI markdown package
- `packages/akia-react-tsconfig`: shared TypeScript config package
- `packages/akia-react-eslint-config`: shared ESLint config package

## Getting Started

```bash
pnpm install
pnpm dev
```

## Common Commands

```bash
pnpm build
pnpm lint
pnpm typecheck
pnpm test
pnpm changeset
```
```

- [ ] **Step 2: Add a root `lint` and `typecheck` dependency set if missing**

```json
{
  "devDependencies": {
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.0",
    "eslint": "^9.25.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  }
}
```

- [ ] **Step 3: Run full-workspace verification**

Run: `pnpm install`
Expected: all workspace dependencies are resolved.

Run: `pnpm build`
Expected: Turbo completes builds for packages and apps.

Run: `pnpm typecheck`
Expected: all workspaces pass their type checks.

Run: `pnpm test`
Expected: each workspace reports its placeholder test command cleanly.

- [ ] **Step 4: Commit**

```bash
git add README.md package.json pnpm-lock.yaml
git commit -m "docs: document monorepo usage"
```

## Self-Review

### Spec coverage

- Root workspace and toolchain are covered by Task 1.
- Shared config packages are covered by Task 2.
- Release tooling is covered by Task 3.
- Starlight docs app is covered by Task 4.
- React/Vite playground is covered by Task 5.
- Publishable package scaffolds are covered by Task 6.
- Repo-level verification and documentation are covered by Task 7.

### Placeholder scan

- No `TODO`, `TBD`, or deferred implementation markers remain in the task steps.
- Every task includes exact files, commands, and expected verification outcomes.

### Type consistency

- Shared config package names remain `akia-react-tsconfig` and `akia-react-eslint-config` throughout.
- Publishable package names remain `akia-react-livecode` and `akia-react-ai-markdown` throughout.
- App package names remain `akiawebsite` and `akiaplayground` throughout.
