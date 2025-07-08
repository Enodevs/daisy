# Daisy: AI Chat UI Platform

A modern, extensible AI chat interface built with Next.js 15, React 19, shadcn/ui, Tailwind CSS, and Prisma. Features a beautiful, animated chat UI and a modular, composable component system for rapid prototyping and production-ready AI chat products.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development Scripts](#development-scripts)
- [Customization](#customization)
- [Deployment](#deployment)
- [Acknowledgements](#acknowledgements)

---

## Features

- ✨ **Animated AI Chat UI** — Modern, responsive, and visually rich chat interface
- 🧩 **Composable Components** — Modular structure with shadcn/ui and custom elements
- 🎨 **Tailwind CSS** — Utility-first styling for rapid iteration
- 🔌 **Prisma ORM** — Type-safe database access and migrations
- 🤖 **OpenAI Integration** — Easily connect to OpenAI or other LLM APIs
- 🖼️ **File/Image Uploads** — Built-in support for attachments
- 🎤 **Voice Input Ready** — UI hooks for voice/mic input
- 🌗 **Dark Mode** — Theme switching with `next-themes`
- ⚡ **Turbopack** — Lightning-fast local development

---

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, SSR)
- **Language:** TypeScript, React 19
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), shadcn/ui, [framer-motion](https://www.framer.com/motion/)
- **UI Primitives:** [shadcn/ui](https://ui.shadcn.com/), [lucide-react](https://lucide.dev/)
- **Database:** [Prisma ORM](https://www.prisma.io/) (see `/prisma/schema.prisma`)
- **APIs:** [OpenAI](https://platform.openai.com/), custom integrations
- **Auth:** `better-auth` (see `/src/lib/auth.ts`)
- **Other:** [uploadthing](https://uploadthing.com/), [date-fns](https://date-fns.org/)

---

## Project Structure

```
daisy/
├── src/
│   ├── app/                # Next.js app directory (routes, layouts, pages)
│   ├── components/         # Custom React components
│   │   ├── ChatInputBox.tsx
│   │   ├── agent-config.tsx
│   │   ├── sidebar.tsx
│   │   ├── theme-provider.tsx
│   │   └── ui/             # shadcn/ui and custom UI primitives
│   │       ├── animated-ai-chat.tsx
│   │       ├── tooltip.tsx
│   │       ├── dialog.tsx
│   │       ├── demo.tsx
│   │       └── ...
│   ├── lib/                # Utilities, API clients, auth, etc.
│   │   ├── auth.ts
│   │   ├── openai.ts
│   │   ├── prisma.ts
│   │   └── utils.ts
│   └── ...
├── prisma/                 # Prisma schema and migrations
│   └── schema.prisma
├── public/                 # Static assets (SVGs, images)
├── package.json
├── tailwind.config.js
├── next.config.ts
└── README.md
```

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in required values (OpenAI keys, database URL, etc).

3. **Database setup (optional):**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your app:**
   Visit [http://localhost:3000](http://localhost:3000)

---

## Development Scripts

- `npm run dev` — Start local development with Turbopack
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Lint codebase
- `npm run db:generate` — Generate Prisma client
- `npm run db:push` — Push schema to database
- `npm run db:studio` — Open Prisma Studio

---

## Customization

- **UI Components:**
  - Add or edit components in `src/components` and `src/components/ui`.
  - Use and extend shadcn/ui primitives for consistent design.
- **Styling:**
  - Tailwind CSS is fully configured. Edit `tailwind.config.js` as needed.
- **Chat Logic:**
  - Core chat UI in `src/components/ui/animated-ai-chat.tsx` and `ChatInputBox.tsx`.
  - Integrate with your own API endpoints in `src/app` or `src/lib/openai.ts`.
- **Database:**
  - Edit `prisma/schema.prisma` for your data models.
  - Use Prisma migrations for schema changes.

---

## Deployment

- **Vercel:** Deploy instantly with Vercel (recommended for Next.js)
- **Custom:** Standard Next.js deployment supported (Node, Docker, etc)
- **Database:** Ensure your production database is accessible and `DATABASE_URL` is set

---

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma ORM](https://www.prisma.io/)
- [OpenAI](https://platform.openai.com/)
- [lucide-react](https://lucide.dev/)
- [framer-motion](https://www.framer.com/motion/)

---

Enjoy building with Daisy! 🚀
