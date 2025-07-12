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
   - Copy `.env.example` to `.env` and fill in required values:
   ```bash
   cp .env.example .env
   ```
   - Add your API keys:
     - **OpenAI API Key** (recommended): Get from https://platform.openai.com/api-keys
     - **OR Gemini API Key** (alternative): Get from https://makersuite.google.com/app/apikey
     - **Database URL**: PostgreSQL connection string
     - **Google OAuth** (optional): For social login

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

## 🤖 AI Configuration

Daisy requires an AI API key to function. You have several options:

### Option 1: OpenAI (Recommended)
```bash
OPENAI_API_KEY=sk-your-openai-key-here
```
- Best transcription quality with Whisper
- Reliable chat responses with GPT models
- Get your key: https://platform.openai.com/api-keys

### Option 2: Google Gemini (Alternative)
```bash
GEMINI_API_KEY=your-gemini-key-here
```
- Free tier available
- Good performance for chat
- Get your key: https://makersuite.google.com/app/apikey

### Option 3: Groq (Alternative)
```bash
GROQ_API_KEY=your-groq-key-here
```
- Fast inference
- Good for development
- Get your key: https://console.groq.com/keys

## 🎯 Features

### Core Functionality
- **Audio Transcription**: Upload meeting recordings for AI transcription
- **Smart Summaries**: Automatic generation of meeting summaries
- **Action Items**: Extract tasks, assignees, and deadlines
- **Speaker Identification**: Identify different speakers in recordings
- **Real-time Chat**: Interactive AI assistant for meeting insights

### Integrations
- **Google Calendar**: Sync action items as calendar events
- **Slack**: Send summaries to channels
- **Notion**: Save transcripts as pages
- **Zapier**: Connect to 1000+ apps
- **Email**: Automated meeting reports

### File Support
- **Audio**: MP3, WAV, M4A, FLAC
- **Documents**: PDF, DOC, DOCX, TXT
- **Images**: JPG, PNG, GIF (for context)

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
