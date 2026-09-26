# Architecture Note

## Overview

DocSync is a real-time collaborative document editor. The core product bet was: **real-time collaboration and real authentication are harder to fake convincingly than any other requirement, so I prioritized making those genuinely solid**, rather than spreading effort thin across every listed feature.

## What I prioritized, and why

**1. Real authentication over mocked users.**
I used Clerk for actual user accounts rather than seeded/mocked auth. This meant more setup cost upfront (real sign-up/sign-in flows, session handling), but it makes the sharing model demonstrable with real, distinct accounts rather than hardcoded fixtures — closer to how this would actually ship.

**2. Real-time collaborative editing over a simpler single-user editor.**
The editor is built on Lexical with Liveblocks' Yjs-backed storage, giving live multi-cursor editing, not just "save and refresh to see changes." This was the most technically demanding part of the build and where most of the engineering time went — CRDT-backed collaborative text editing has real edge cases (conflict resolution, presence, reconnection) that a simple `PUT /document` endpoint doesn't have to deal with.

**3. Granular sharing with owner/editor/viewer roles.**
Documents track an owner (`creatorId`) and a `usersAccesses` map assigning each collaborator either `room:write` (editor) or read-only (viewer) access. The document dashboard visually distinguishes owned documents from documents shared with you. Access can be granted, changed, or revoked per user.

**4. Comments with file attachments, in place of in-document media embedding.**
The task allows flexibility in what "file upload" means, as long as it's product-relevant. I implemented file/image/PDF attachments on comments rather than inline document embedding. This was a deliberate scope cut: comment attachments are a complete, working feature, whereas rich media embedding inside the Lexical document tree (with correct real-time sync of binary/media references across collaborators) is a meaningfully larger scope that I judged wasn't worth partially implementing under the time limit.

## What's incomplete / what I'd build next with more time

- **In-document media embedding.** Right now the document body supports formatted text only (bold, italic, underline, headings, lists, alignment). Given another 2-4 hours, I'd add an image node to the Lexical editor schema and wire it to a storage bucket (e.g. Vercel Blob or Liveblocks' own upload endpoints).
- **Broader automated test coverage.** The submission includes one automated test as a floor, not a ceiling. I'd add integration tests around the sharing/access logic (this is the highest-risk area for silent bugs — an access check that's wrong fails silently rather than loudly) and at least one end-to-end test of the document creation → edit → share flow using Playwright.
- **User-facing error states.** Server actions currently log errors to the console and redirect on failure; I'd add visible toast/error UI so a failed action (e.g. losing access mid-session, a network blip during a Liveblocks call) is communicated to the user instead of failing silently.

## Stack notes

- **Next.js 16 (App Router, Turbopack)** for the frontend/backend.
- **Liveblocks** for real-time presence, storage (CRDT-backed document state), and comments/notifications.
- **Lexical** as the underlying rich-text editor framework, integrated with Liveblocks via `@liveblocks/react-lexical`.
- **Clerk** for authentication.
- **Sentry** for production error monitoring.
- **Vercel** for deployment.
