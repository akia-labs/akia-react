# Consolidate ESLint and TypeScript Config Packages

## Status

Approved for implementation.

## Overview

Remove `packages/akia-react-eslint-config` and `packages/akia-react-tsconfig` packages. Move their config files to root-level directories (`eslint/` and `tsconfig/`). Each subpackage will own its own `eslint.config.js` and `tsconfig.json` referencing the root configs via relative paths.

## Motivation

- Reduces package count and workspace complexity
- Simplifies dependency management — no intermediate workspace packages to maintain
- Configs are still centralized at root for sharing, but each subpackage has full ownership of its config files and can customize independently

## New Structure

```
akia-react/
├── eslint/                          # moved from packages/akia-react-eslint-config/
│   ├── base.js
│   └── react.js
├── tsconfig/                        # moved from packages/akia-react-tsconfig/
│   ├── base.json
│   ├── react-library.json
│   ├── react-app.json
│   └── astro.json
├── tsconfig.base.json               # will be removed (moved into tsconfig/base.json)
├── packages/
│   ├── akia-react-ai-markdown/
│   │   ├── eslint.config.js         # owned by package, imports from root
│   │   └── tsconfig.json            # owned by package, extends root
│   └── akia-react-livecode/
│       ├── eslint.config.js
│       └── tsconfig.json
```

## Subpackage Config Changes

### `eslint.config.js` (per subpackage)
```js
import config from '../../eslint/react.js';

export default config;
```

### `tsconfig.json` (per subpackage)
```json
{
  "extends": "../../tsconfig/react-library.json",
  "include": ["src", "vite.config.ts"]
}
```

## Implementation Steps

1. Create `eslint/` directory at root and move `base.js`, `react.js`, `astro.js` from `packages/akia-react-eslint-config/`
2. Create `tsconfig/` directory at root and move `base.json`, `react-library.json`, `react-app.json`, `astro.json` from `packages/akia-react-tsconfig/`
3. Update each subpackage's `eslint.config.js` to use relative path imports from root
4. Update each subpackage's `tsconfig.json` to extend from root
5. Update each subpackage's `package.json` to remove `akia-react-eslint-config` and `akia-react-tsconfig` from devDependencies
6. Remove `packages/akia-react-eslint-config/` directory
7. Remove `packages/akia-react-tsconfig/` directory
8. Remove `tsconfig.base.json` from root (replaced by `tsconfig/base.json`)
9. Update root `package.json` to add ESLint/TypeScript devDependencies (required for root-level configs imported via relative paths)

## Notes

- Subpackages can customize their `eslint.config.js` and `tsconfig.json` independently (e.g., add custom rules, include/exclude patterns)
- Root must keep ESLint/TypeScript dependencies (`@eslint/js`, `@typescript-eslint/*`, `eslint`, `typescript`, `globals`) because root-level configs are imported via relative paths and Node.js resolves their dependencies from the root
- `apps/playground` and `apps/website` also updated to use root configs (they also referenced the deleted packages)
- The `tsconfig.base.json` currently at root extends `akia-react-tsconfig/react-library.json` — after this change, it becomes `tsconfig/base.json` and subpackages extend from there directly
- `eslint/astro.js` is not created — the original `packages/akia-react-eslint-config/astro.js` just re-exported the react config with no additions and was not used by any package
- Root `package.json` has `"type": "module"` required for ESM eslint configs