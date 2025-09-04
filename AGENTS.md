# Repository Guidelines

## Project Structure
- App: `luna/` (Next.js + TypeScript).
- Docs: `lunadocs/` (all project documentation).
- Template/dev: `dev/next-ts/`.
- Source folders: `src/app/` (routes, e.g., `(auth)`, `jobs`), `components/`, `layouts/`, `sections/`, `theme/`, `store/` (Zustand), `services/`, `utils/`, `auth/`.
- Assets: `luna/public/`, `luna/src/assets/`. Global config: `luna/src/global-config.ts`.

## Build, Test, Dev
- From `luna/`: `yarn dev` (http://localhost:8083), `yarn build`, `yarn start`.
- Quality: `yarn lint`, `yarn lint:fix`, `yarn fm:check`, `yarn fm:fix`.
- Env: Node >= 20, `yarn@1.22.x`. Use `yarn clean` before fresh installs.

## Style & Naming
- TypeScript, 2-space indent, Prettier enforced; run `yarn fix:all` before PRs.
- Components PascalCase (`JobCard/JobCard.tsx`); hooks/utils camelCase (`useJobs.ts`, `jobsStore.ts`).
- App Router conventions; use route groups like `(auth)` when appropriate.
- ESLint via `eslint.config.mjs` (imports, ordering, no unused imports).

## Testing
- No harness yet. If adding tests: Vitest + RTL for units, Playwright for e2e.
- For changes, include manual verification steps (routes, state, responsive, auth flows).

## Commits & PRs
- Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`). Subject ≤ 72 chars.
- PRs: summary, linked issues, UI screenshots/GIFs, notes on i18n/a11y/perf; update impacted docs in `lunadocs/`.

## Documentation Rules (Mandatory)
- Follow `.claude/DOCUMENTATION_RULES.md`.
- Place all documentation under `lunadocs/`. Do not create `.md` files in repo root, `luna/`, or `dev/`.
- If you find docs elsewhere: move to `lunadocs/`, update references, remove originals, verify links.
- Exception: keep `luna/README.md` in place. This `AGENTS.md` is the only root guide; do not add other docs at root.

## Security & Config
- Never commit secrets. Use `luna/.env.local` (see `.env.local.example`).
- Supabase: `SUPABASE_URL`, `SUPABASE_ANON_KEY`; prefer server-side usage.
- Validate inputs with `zod`; avoid exposing sensitive data to clients.
