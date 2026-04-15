# Update Package Dependencies Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update React peerDependencies to `^17 || ^18 || ^19` and add TypeScript declaration file generation via `vite-plugin-dts` for both packages.

**Architecture:** Add `vite-plugin-dts` as a devDependency to each package and configure it in `vite.config.ts`. Update `peerDependencies` in `package.json` to allow React 17, 18, and 19.

**Tech Stack:** `vite-plugin-dts`, pnpm, Vite

---

## Task 1: Update @akia/akia-react-ai-markdown

**Files:**
- Modify: `packages/akia-react-ai-markdown/package.json`
- Modify: `packages/akia-react-ai-markdown/vite.config.ts`

- [ ] **Step 1: Update peerDependencies in package.json**

Change:
```json
"peerDependencies": {
  "react": "^17 || ^18 || ^19",
  "react-dom": "^17 || ^18 || ^19"
}
```

Run: `pnpm add -D vite-plugin-dts` in `packages/akia-react-ai-markdown/`

Add `vite-plugin-dts` to `devDependencies` in `packages/akia-react-ai-markdown/package.json`.

- [ ] **Step 2: Update vite.config.ts to use dts plugin**

Change `packages/akia-react-ai-markdown/vite.config.ts` to:
```ts
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts()],
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

- [ ] **Step 3: Verify build generates .d.ts files**

Run: `pnpm build` in `packages/akia-react-ai-markdown/`
Expected: `dist/index.d.ts` exists alongside `dist/index.js`

- [ ] **Step 4: Commit**

```bash
cd packages/akia-react-ai-markdown
git add package.json vite.config.ts
git commit -m "feat: expand React peerDeps to ^17||^18||^19 and add dts plugin"
```

---

## Task 2: Update @akia/akia-react-livecode

**Files:**
- Modify: `packages/akia-react-livecode/package.json`
- Modify: `packages/akia-react-livecode/vite.config.ts`

- [ ] **Step 1: Update peerDependencies in package.json**

Change:
```json
"peerDependencies": {
  "react": "^17 || ^18 || ^19",
  "react-dom": "^17 || ^18 || ^19"
}
```

Run: `pnpm add -D vite-plugin-dts` in `packages/akia-react-livecode/`

Add `vite-plugin-dts` to `devDependencies` in `packages/akia-react-livecode/package.json`.

- [ ] **Step 2: Update vite.config.ts to use dts plugin**

Change `packages/akia-react-livecode/vite.config.ts` to:
```ts
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts()],
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

- [ ] **Step 3: Verify build generates .d.ts files**

Run: `pnpm build` in `packages/akia-react-livecode/`
Expected: `dist/index.d.ts` exists alongside `dist/index.js`

- [ ] **Step 4: Commit**

```bash
cd packages/akia-react-livecode
git add package.json vite.config.ts
git commit -m "feat: expand React peerDeps to ^17||^18||^19 and add dts plugin"
```

---

## Spec Coverage Check

- React peerDependencies `^17 || ^18 || ^19` → Task 1 Step 1, Task 2 Step 1
- TypeScript declaration files generated after build → Task 1 Step 2-3, Task 2 Step 2-3

No gaps found.
