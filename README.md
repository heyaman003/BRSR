# BRSR

BRSR is a full‑stack TypeScript application consisting of a React + Vite frontend and a NestJS backend. The project includes real‑time features (Socket.IO), PDF/extraction utilities, and a modular backend design for authentication, company/section/question management, conflict resolution, notifications, and comments.

## Key features
- Modular NestJS backend with modules for auth, company, section, user, notifications, conflict-resolution (websockets), comments, etc.
- React + Vite TypeScript frontend with TailwindCSS and MUI.
- Real-time collaboration via WebSockets (Socket.IO).
- Export sections to PDF (puppeteer/docx workflows present).
- Prisma ORM + Nest + Prisma client used on server.
- LangChain & OpenAI integration present in server dependencies.

## Tech stack
- Frontend: React, Vite, TypeScript, TailwindCSS, MUI, Redux Toolkit
- Backend: NestJS, TypeScript, Prisma, Socket.IO
- Other: Dockerfiles for building/serving, Puppeteer, OpenAI/langchain

---

## Repository layout
- client/ — React + Vite frontend
  - src/ — application source (components, pages, store, utils, etc.)
  - public/ — static assets
  - package.json, vite.config.ts, tailwind.config.js, Dockerfile, .env.sample
- server/ — NestJS backend
  - src/modules/ — backend feature modules (auth, company, section, user, conflict-resolution, notification, question-comment, etc.)
  - prisma/ — Prisma schema & migrations (if present)
  - package.json, tsconfig.json, .env.sample, README.md (module & route notes)
- Dockerfile — top-level Dockerfile (generic node container)
- .vite/ — Vite internal directory (generated)

---

## Quick start (local development)

Prerequisites
- Node.js >= 18
- npm
- (Optional) Docker & docker-compose if using containers

1. Clone the repo
   - git clone https://github.com/heyaman003/BRSR.git
   - cd BRSR

2. Backend (server)
   - cd server
   - Copy and populate environment variables:
     - cp .env.sample .env
     - Edit `.env` with DB_URL, JWT_SECRET, PORT, WS_PORT, PROFILE, etc.
   - Install
     - npm install
   - Run in development
     - npm run start:dev
   - Build & run production
     - npm run build
     - npm run start:prod
   - Tests
     - npm test

3. Frontend (client)
   - cd client
   - Copy and populate environment variables:
     - cp .env.sample .env
     - Update:
       - VITE_SERVER_URI (e.g. http://localhost:8000)
       - VITE_WS_ENDPOINT (e.g. http://localhost:8001)
       - VITE_WS_PATH (e.g. /ws)
   - Install
     - npm install
   - Run dev server
     - npm run dev
   - Build for production
     - npm run build
   - Preview build
     - npm run preview

---

## Docker

There are Dockerfiles in the repository:

- client/Dockerfile — builds static frontend and serves it with Nginx (exposes port 80)
- server Dockerfile (top-level or server/ if you prefer) — installs and runs the server (example Dockerfile in repo exposes port 5000)

Example: build and run client container
- docker build -t brsr-client ./client
- docker run -p 80:80 brsr-client

Example: build and run server container (from root Dockerfile)
- docker build -t brsr-server .
- docker run -p 5000:5000 brsr-server

Adjust ports and env vars as needed.

---

## Environment variables

server/.env.sample (examples)
- PORT=
- WS_PORT=
- JWT_SECRET=
- DB_URL=
- PROFILE=
- WS_PATH=/ws

client/.env.sample (examples)
- VITE_SERVER_URI=http://localhost:8000
- VITE_WS_ENDPOINT=http://localhost:8001
- VITE_WS_PATH=http://localhost:8001

Populate these with your values (DB_URL should point to your database, JWT_SECRET must be set, etc.).

---

## Backend modules & notable routes (summary)
From server/README.md — overview of modules and routes

- auth
  - POST /auth/signin — sign in
  - POST /auth/logout — logout
  - GET /auth/userdetails — get current user details
- company
  - POST /company — create company
  - GET /company/all — list companies
  - GET /company/:companyId — company details
  - DELETE /company/:companyId
  - GET /company/:companyId/sections — list sections/subsections/questions (no answers)
  - GET /company/:companyId/questions/stats — stats for company questions
- section
  - GET /section/subsection/:subsectionId — fetch subsection data (questions, tables, rows, cells)
  - POST /section/subsection/:subsectionId — save subsection data
  - POST /section/table/:tableId — update a table
  - GET /section/:sectionId/extract — export section to PDF
  - GET /section/:questionId/history — question history
- conflict-resolution
  - WebSocket endpoints under `/conflict-resolution` namespace
  - Join room and broadcast table/text changes
- notification
  - Server-Sent Events for mentions: /notification/mentions/:userId
  - Close SSE: GET /notification/mentions/:userId/close
  - sendNotification(userId, data) method used by services
- question-comment
  - POST /comment — add comment
  - GET /comment — list comments for a question
- user
  - POST /user/create/client — create client role user (Admin/Superadmin)
  - POST /user/create/admin — create admin role user (Superadmin)
  - DELETE /user/:userId — delete user
  - GET /get/mentions — fetch mentions for a user

Each module follows NestJS conventions: controller, service, repository/module patterns.

---

## Notes about dependencies

Frontend notable deps (see client/package.json): React, Vite, TailwindCSS, MUI (@mui/material), Redux Toolkit, ag-grid, socket.io-client, zod, react-router-dom.

Backend notable deps (see server/package.json): NestJS, Prisma (@prisma/client, prisma), Socket.IO (socket.io), Puppeteer, OpenAI/langchain, docx, bcryptjs.

---

## Contributing
- Open issues or PRs for bugs and feature requests.
- Follow the existing code structure and linting rules. Run linters and tests before submitting PRs.

---

## License
- MIT LISENSE. Confirm licensing for the repository and update README accordingly.

---

## Contact / Maintainer
- Repository: https://github.com/heyaman003/BRSR
- Author/maintainer details: check repository owner profile for contact info.
