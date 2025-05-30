🧠 Phase 1 – Backend Planning (No Code Yet)
We'll split this into four core milestones:

✅ MILESTONE 1: Project Setup & Planning
Goal: Set up the foundation of your backend project.

Tasks:

Initialize Project Directory

Setup Node.js + Express structure

Setup package.json, install core dependencies

Decide on DB: PostgreSQL (via Supabase or local)

Choose if you want to start with Supabase (hosted) or install locally

Pick and install ORM (Prisma recommended)

Setup Git & GitHub

Create repo and initial commit

Set up development environment

.env, nodemon, folder structure (/controllers, /routes, /services, /models)

✅ MILESTONE 2: Define Data Models & ERD
Goal: Finalize the data architecture.

Tasks:

Define user and task entities

What properties each should have?

Design ERD (Entity Relationship Diagram)

User ↔ Tasks (One-to-Many)

Optional: Tags or Labels

Create Prisma schema

Run DB migrations

prisma migrate dev

Seed DB with sample data (optional)

✅ MILESTONE 3: Implement Authentication
Goal: Enable user registration and login.

Tasks:

Create auth routes: /register, /login

Hash passwords using bcrypt

Generate JWT tokens

Create middleware to protect private routes

Add input validation (express-validator)

✅ MILESTONE 4: Implement Task CRUD
Goal: Build the core task management system.

Tasks:

Routes for tasks:

GET /tasks (user’s tasks)

POST /tasks

PUT /tasks/:id

DELETE /tasks/:id

Restrict access:

Only allow users to access their tasks

Add timestamps, completion status

Optional: due dates, tags, priority levels

🔜 Later Milestones (Once Backend Is Ready)
Frontend setup

Connect frontend to backend (API calls)

Add UI for login/register, task CRUD

Add loading states, validation, etc.

(Optional) Deploy backend and frontend