# Update Package Dependencies Design

## Context

Two packages in `packages/` need their React peerDependencies expanded and TypeScript declaration files generated after build:
- `akia-react-ai-markdown`
- `akia-react-livecode`

Both packages currently pin React to `^19.1.0` and do not generate `.d.ts` files during build.

## Changes

### 1. Update peerDependencies

In both packages, update `package.json`:

```json
"peerDependencies": {
  "react": "^17 || ^18 || ^19",
  "react-dom": "^17 || ^18 || ^19"
}
```

### 2. Generate TypeScript declaration files

Add `vite-plugin-dts` to `devDependencies` in both packages and update `vite.config.ts` to use it:

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

`vite-plugin-dts` generates `.d.ts` files inline during the Vite build — no extra build step required.

## Files to modify

- `packages/akia-react-ai-markdown/package.json`
- `packages/akia-react-ai-markdown/vite.config.ts`
- `packages/akia-react-livecode/package.json`
- `packages/akia-react-livecode/vite.config.ts`

## Verification

After the changes, `pnpm build` in each package should produce `dist/index.d.ts` alongside `dist/index.js`.
