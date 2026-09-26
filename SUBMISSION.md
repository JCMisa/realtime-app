# Submission — DocSync

## Links

- **Live product URL:** https://docsync-flax.vercel.app/
- **Source code (GitHub):** <FILL IN YOUR REPO LINK>
- **Walkthrough video:** <FILL IN AFTER RECORDING — see video-link.txt>

## What's included in this folder

- `README.md` — setup and run instructions
- `ARCHITECTURE.md` — architecture note and prioritization rationale
- `AI_WORKFLOW.md` — AI usage note
- `SUBMISSION.md` — this file
- `video-link.txt` — walkthrough video URL
- Source code (linked above / included in this folder)

## Feature status

| Requirement                                                     | Status                                                                                      |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Document creation, rename, edit, save/reopen                    | ✅ Working                                                                                  |
| Rich-text formatting (bold, italic, underline, headings, lists) | ✅ Working                                                                                  |
| File upload (comment attachments: media/image/PDF)              | ✅ Working                                                                                  |
| In-document media embedding                                     | ❌ Not implemented — see `ARCHITECTURE.md`                                                  |
| Sharing: owner, grant access, owned vs. shared distinction      | ✅ Working                                                                                  |
| Persistence of documents, formatting, and sharing state         | ✅ Working                                                                                  |
| Real authentication (not mocked)                                | ✅ Working (Clerk)                                                                          |
| Live deployment                                                 | ✅ Working (Vercel)                                                                         |
| Basic validation and error handling                             | ✅ Present (server-side try/catch); user-facing error UI is minimal — see `ARCHITECTURE.md` |
| At least one automated test                                     | ✅ Included — <FILL IN: e.g. "unit test for access-level resolution in lib/utils.ts">       |
| Architecture note                                               | ✅ Included                                                                                 |
| AI workflow note                                                | ✅ Included                                                                                 |

## What I'd build next with another 2-4 hours

See the "What's incomplete" section of `ARCHITECTURE.md`:

1. In-document image/media embedding in the Lexical editor
2. Broader automated test coverage (sharing/access logic, end-to-end flow)
3. User-facing error states instead of console-only error logging
