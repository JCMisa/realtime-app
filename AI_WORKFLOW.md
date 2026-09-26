# AI Workflow Note

## Which AI tools I used

I used two AI tools during development, for different purposes:

- **Gemini** — [TODO: confirm/adjust — e.g. "initial app scaffolding and feature implementation during early development"]
- **Claude (Anthropic)** — primarily as a pair-programmer for debugging and dependency management. Used most heavily for a full dependency upgrade across the stack (Next.js, React, Clerk, Liveblocks, Lexical, Sentry, Tailwind, ESLint) and for diagnosing production issues after that upgrade.

Both tools are reflected in the final dependency versions in `package.json` (Next.js 16.3.6, React 19, Clerk 7.9.7, Liveblocks 3.24.2, Lexical 0.35.0, Sentry 11.0.0, ESLint 10, TypeScript 7) — this is the actual, current, up-to-date stack the app runs on, not a legacy setup.

## Where AI materially sped up my work

The clearest example: rather than manually researching each library's migration guide one at a time for a full-stack dependency upgrade, I worked through the upgrade interactively with Claude, fixing each breaking change as it surfaced from actual build/runtime errors. Specific examples:

- **Diagnosed a genuine dependency deadlock**, not just a version bump issue: an unmaintained editor package (`jsm-editor`, last published in 2024) was pinned to an old Lexical version incompatible with both the latest Liveblocks-Lexical integration and React 19. I verified the package was unused anywhere in the codebase via `grep` across all `.tsx`/`.ts` files before removing it, rather than assuming.
- **Found an undocumented breaking change** in `@sentry/nextjs` v11: `withSentryConfig` was silently moved from the package's main export to a `/config` subpath export. This was diagnosed by directly inspecting the installed package's `exports` map and testing the actual runtime export shape, rather than trusting documentation written for an older version.
- **Fixed several Next.js 14→16 and Clerk v5→v7 breaking changes**: dynamic route `params` becoming a `Promise` requiring `await`, and `clerkClient` changing from a plain object to an async function that must be called before use.
- **Debugged a Yjs/Lexical version-compatibility issue** surfacing only in real-time multi-user sessions (`syncChildrenFromYjs: could not find element node`), tracing it to a structural mismatch between documents created under an old Lexical version and the new editor's expectations.

## What AI-generated output I changed or rejected

The first fix suggested for the Sentry import error (destructuring a default import: `import pkg from "@sentry/nextjs"; const { withSentryConfig } = pkg;`) was wrong — it produced a different runtime error (`withSentryConfig is not a function`). Rather than accepting a second guess, I asked for the actual export shape of the installed package to be inspected directly, which revealed the real cause (the subpath export) and gave a fix that worked on the first try. No suggested fix was accepted until build or runtime behavior confirmed it.

## How I verified correctness, UX quality, and implementation reliability

- Every suggested fix was verified against an actual `npm run build` or runtime error output before being accepted — nothing was applied on faith.
- Before removing the `jsm-editor` dependency, I independently confirmed via `grep` that no source file imported from it.
- Real-time collaboration behavior was manually tested with two concurrent browser sessions (document owner + an invited collaborator) to catch sync issues that wouldn't show up in a single-user test.
- AI output was treated as a hypothesis to test, not an answer to apply directly — each fix was one iteration in a build → fail → diagnose → fix → rebuild loop, not a single one-shot generation.
