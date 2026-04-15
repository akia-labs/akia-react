# Akia React Monorepo Design

Date: 2026-04-15

## Summary

Initialize `akia-react` as a `pnpm` workspace monorepo managed by `turbo`, with Astro/Starlight for documentation, React/Vite for the playground, and Changesets for versioning and publishing workflows.

The initial workspace will include:

- `apps/website`
- `apps/playground`
- `packages/akia-react-livecode`
- `packages/akia-react-ai-markdown`
- `packages/akia-react-tsconfig`
- `packages/akia-react-eslint-config`

The goal of this initialization is to create a working development and release foundation, not to fully implement package features.

## Goals

- Establish a clean monorepo structure for apps and packages.
- Standardize local development with `pnpm` workspaces and `turbo`.
- Use Astro/Starlight for the docs site.
- Use React + Vite for the playground app.
- Create two initial publishable packages:
  - `akia-react-livecode`
  - `akia-react-ai-markdown`
- Create shared internal config packages:
  - `akia-react-tsconfig`
  - `akia-react-eslint-config`
- Set up Changesets from the start for versioning, changelogs, and publishing.
- Ensure local package development works smoothly inside both apps.

## Non-Goals

- Fully implementing package functionality.
- Designing package APIs beyond minimal starter exports.
- Building production-complete docs content.
- Adding extra monorepo infrastructure beyond what is needed for development and release workflows.

## Proposed Architecture

### Root Workspace

The repo root will own workspace and orchestration concerns:

- `pnpm-workspace.yaml` for package discovery
- root `package.json` for shared scripts
- `turbo.json` for task orchestration
- Changesets configuration for versioning and releases

The root scripts should expose a small, predictable interface:

- `dev`
- `build`
- `lint`
- `typecheck`
- `test`
- `clean`

These scripts will delegate to Turbo so work can be filtered and cached consistently across apps and packages.

### Apps

#### `apps/website`

This app will use Astro with Starlight and serve as the documentation site for the monorepo. Its responsibilities are:

- document packages
- render examples and usage guides
- consume local workspace packages during development

It should not own package implementation logic.

#### `apps/playground`

This app will use React + Vite and provide a standalone place to experiment with package behavior and interactive examples. It is intended to support URL-driven example sharing over time, but the initialization only needs the structure and tooling required to support that direction.

It should not become the source of truth for package logic.

### Packages

#### `packages/akia-react-livecode`

This is a publishable React package intended to support live demos and code examples, especially for documentation use cases.

The initial scaffold only needs:

- package metadata
- build entry point
- TypeScript wiring
- minimal export surface

#### `packages/akia-react-ai-markdown`

This is a publishable React package intended to provide markdown-related React utilities and components.

The initial scaffold only needs:

- package metadata
- build entry point
- TypeScript wiring
- minimal export surface

#### `packages/akia-react-tsconfig`

This is an internal workspace package that centralizes TypeScript configuration presets for apps and packages.

Its responsibility is limited to shared TypeScript configuration. It should not include runtime code.

#### `packages/akia-react-eslint-config`

This is an internal workspace package that centralizes ESLint configuration for the repo.

Its responsibility is limited to shared lint configuration. It should not include runtime code.

## Tooling Decisions

### Package Manager

Use `pnpm` as the standard package manager for the repository.

Rationale:

- efficient workspace dependency management
- strong monorepo ergonomics
- good fit for shared local package development

### Task Runner

Use `turbo` to orchestrate development and CI-oriented tasks across the workspace.

Rationale:

- consistent root-level commands
- workspace-aware task execution
- useful caching and filtering as the repo grows

### Docs Stack

Use Astro + Starlight for `apps/website`.

Rationale:

- strong fit for docs-first developer experience
- good structure for package documentation
- aligns with the intended docs site direction already noted in the README

### App and Package Build Tooling

- use React + Vite for `apps/playground`
- use Vite-based library builds for the React packages where appropriate
- use Astro's native build/dev tooling for the docs app

This keeps the toolchain cohesive while matching each workspace to its actual job.

### Release Tooling

Use Changesets from the start.

Rationale:

- publish flow exists before package count increases
- versioning and changelog generation are standardized early
- avoids retrofitting release workflows later

## Versioning and Publishing Model

The initialization assumes:

- `akia-react-livecode` is publishable
- `akia-react-ai-markdown` is publishable
- `akia-react-tsconfig` is internal
- `akia-react-eslint-config` is internal

Changesets should be configured around that model. Internal config packages remain workspace dependencies and are not part of the initial public package surface.

## Development Flow

The intended daily workflow is:

1. install dependencies once at the root
2. run a root-level development command
3. work inside a package while validating changes through the docs site or playground

Because the repo uses `pnpm` workspaces, local package changes should be consumed directly by `apps/website` and `apps/playground` without manual linking.

The most common development loops are expected to be:

- editing a package while viewing docs examples in `apps/website`
- editing a package while testing interaction behavior in `apps/playground`

## Quality Expectations

The initial monorepo should support:

- linting
- TypeScript checks
- build validation

Testing may begin with minimal or placeholder setup, but the root script surface should reserve a consistent `test` command so the repo does not need script redesign later.

The primary quality target for initialization is reliability of the platform:

- workspace packages resolve correctly
- apps can consume local packages
- root scripts behave consistently
- release tooling is present and understandable

## Error Handling and Operational Guardrails

The biggest early risks are tool mismatch and unnecessary complexity. To reduce that:

- standardize Node and `pnpm` versions early
- keep the root command surface small
- avoid adding extra infrastructure beyond `turbo` and Changesets
- keep package boundaries explicit

If a workspace fails, the failure should be understandable from the relevant package or app rather than hidden behind opaque root behavior. The repo structure should help contributors identify where a problem belongs.

## Boundaries

The initialization should preserve these boundaries:

- `apps/website` documents and consumes packages, but does not own package logic
- `apps/playground` experiments with package behavior, but does not own package logic
- publishable packages own runtime behavior and exported APIs
- config packages own shared configuration only

These boundaries are important because the repo is expected to grow into additional `akia-react-*` packages over time.

## Initialization Scope

The first implementation pass should create:

- root workspace setup
- Turbo setup
- Changesets setup
- shared config packages
- `apps/website`
- `apps/playground`
- `packages/akia-react-livecode`
- `packages/akia-react-ai-markdown`

Each app and package should be scaffolded enough to install, lint, typecheck, and build successfully with minimal starter source files.

The initialization does not need to deliver mature package features. Placeholder implementations are acceptable as long as the monorepo plumbing is real and the workspace relationships are correct.

## Recommended Next Step

After this design is approved, the next step is to write an implementation plan for initializing the monorepo in a sequence that preserves fast feedback:

1. root workspace and toolchain
2. shared config packages
3. apps
4. publishable packages
5. release and verification workflow

## Decisions Captured

- package manager: `pnpm`
- monorepo orchestrator: `turbo`
- docs app stack: Astro + Starlight
- playground app stack: React + Vite
- release flow: Changesets from the start
- initial publishable packages:
  - `akia-react-livecode`
  - `akia-react-ai-markdown`
- initial shared config packages:
  - `akia-react-tsconfig`
  - `akia-react-eslint-config`
