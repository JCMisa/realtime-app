# DocSync

A real-time collaborative document editor built with Next.js, Clerk, Liveblocks, and Lexical. Users can sign in, create documents, invite collaborators, edit shared content in real time, and manage document access with viewer/editor permissions.

## Overview

This project is a full-stack SaaS-style collaborative app where each document is backed by a Liveblocks room. Authentication is handled by Clerk, and the editor experience is powered by Lexical rich-text editing with Liveblocks collaboration features such as presence, comments, and threads.

## Key Features

- Secure authentication with Clerk
- Real-time room-based collaboration using Liveblocks
- Rich-text document editing with Lexical
- Document creation and listing for authenticated users
- Share access controls for viewer/editor roles
- Comments and collaborative thread support
- Sentry setup for application monitoring
- Tailwind-based styling and modern Next.js App Router structure

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Clerk Auth
- Liveblocks
- Lexical
- Radix UI primitives
- Sentry

## Project Structure

```bash
.
├── app/
│   ├── api/
│   │   └── liveblocks-auth/
│   │       └── route.ts
│   ├── (auth)/
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (root)/
│   │   ├── page.tsx
│   │   └── documents/[id]/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── Provider.tsx
├── components/
│   ├── editor/
│   ├── ui/
│   ├── ActiveCollaborators.tsx
│   ├── CollaborativeRoom.tsx
│   ├── Comments.tsx
│   ├── Header.tsx
│   ├── Notifications.tsx
│   ├── ShareModal.tsx
│   └── ...
├── lib/
│   ├── actions/
│   ├── liveblocks.ts
│   ├── utils.ts
│   └── ...
├── public/
├── styles/
├── types/
├── .env.local.example (create this locally)
├── liveblocks.config.ts
├── next.config.mjs
├── package.json
├── proxy.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Prerequisites

Before running the project, make sure you have:

- Node.js 18+ or 20+
- npm, pnpm, yarn, or bun
- A Clerk account and application
- A Liveblocks account and secret key
- Optional: Sentry project for monitoring

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd realtime-app
```

2. Install dependencies:

```bash
npm install
```

3. Create your local environment file:

```bash
copy NUL .env.local
```

On macOS/Linux:

```bash
touch .env.local
```

4. Add the required environment variables:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Liveblocks
LIVEBLOCKS_SECRET_KEY=your_liveblocks_secret_key

# Sentry (required for source map uploads on production builds)
SENTRY_AUTH_TOKEN=your_sentry_auth_token
```

> The app expects Clerk keys for authentication and a Liveblocks secret for room and access management. The Liveblocks auth endpoint in `app/api/liveblocks-auth/route.ts` uses the server-side secret.

## Clerk Setup

This app uses Clerk for user authentication and UI components. You will need to:

- Create a Clerk app in the Clerk dashboard
- Copy the publishable and secret keys to `.env.local`
- Make sure your app domain and sign-in/sign-up routes are configured correctly

The main public routes are:

- `/sign-in`
- `/sign-up`
- `/`

Protected routes are enforced by `proxy.ts` using Clerk middleware.

## Liveblocks Setup

This app uses Liveblocks rooms to represent each document.

- Each document gets a unique room ID
- Room access is managed with user-specific permissions
- Document metadata includes creator and title
- Authenticated users are identified through the `/api/liveblocks-auth` endpoint

The server-side Liveblocks client is initialized in `lib/liveblocks.ts`.

## Running the App

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Production Build

To build the app for production:

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

## Linting

```bash
npm run lint
```

## Application Flow

1. User signs in with Clerk.
2. The app loads the home page and lists documents created by the signed-in user.
3. User creates a new document from the dashboard.
4. A new Liveblocks room is created with access rules.
5. The document page opens the real-time editor in a `RoomProvider`.
6. Users can share documents, edit content, and collaborate using comments and live cursors/presence.

## Route Overview

- `/` — dashboard for signed-in users; list of documents
- `/sign-in` — Clerk sign-in page
- `/sign-up` — Clerk sign-up page
- `/documents/[id]` — collaborative document editor room

## Notes

- The app uses Next.js App Router conventions.
- Authentication is enforced for non-public routes via `proxy.ts`.
- `app/Provider.tsx` resolves Liveblocks users and mention suggestions using Clerk data.
- `lib/actions/room.actions.ts` is the central server layer for managing rooms and permissions.
- This project is designed around collaborative document management, not a general-purpose database-backed app.

## Deployment

This project is ready to deploy on platforms like Vercel. For production deployment:

- Add the same environment variables in your deployment platform
- Ensure the app domain is registered with Clerk
- Set your Liveblocks secret in the production environment
- Configure Sentry if you want error tracking enabled

## Troubleshooting

### 401 / authentication issues

Check that:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is valid
- `CLERK_SECRET_KEY` is set correctly
- the app domain is configured in Clerk

### Liveblocks errors

Check that:

- `LIVEBLOCKS_SECRET_KEY` is defined
- the `app/api/liveblocks-auth/route.ts` endpoint is reachable
- the Liveblocks room permissions are correctly configured

### Empty rooms or no documents

This is expected for a newly authenticated user. Create a document from the home page to initialize a Liveblocks room.

## License

This project is currently provided as a local application template/example and may be adapted for your own deployment or product needs.
