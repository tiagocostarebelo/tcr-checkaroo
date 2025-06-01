# Checkaroo – Task Management App (Work in progress)

**Note:** This README is being updated as I build the project.

Checkaroo is a portfolio-grade task management application designed with real-world features including user authentication, task creation, reminders, and labeling. Built using modern web technologies and best practices, it's designed to scale into a full-featured PWA.

---

## Project Purpose

This app is built as a real-world project to showcase full-stack development skills, including:

- Node.js and Express backend architecture
- PostgreSQL database via Supabase
- Authentication and user session handling
- ORM modeling with Prisma
- Database ERD documentation with Mermaid.js
- Future-proofing with features like subtasks, reminders, and PWA support

---

## Tech Stack

| Layer           | Technology            | Reason for Use                                                                    |
|-----------------|-----------------------|-----------------------------------------------------------------------------------|
| Backend         | Node.js + Express     | Fast, unopinionated, and widely adopted server framework                          |
| Database        | Supabase (PostgreSQL) | Hosted, scalable PostgreSQL with auth, real-time features, and a user-friendly UI |
| ORM             | Prisma                | Type-safe, intuitive ORM for modeling and querying databases with ease            |
| Documentation   | Mermaid.js            | To visually represent the database schema in the ERD format                       |
| Version Control | Git + GitHub          | Standard versioning and collaboration tools                                       |
| Environment     | nodemon + dotenv      | Auto-reloading and secure config management                                       |

---

## Current Project Status: Milestone 1 Complete

- ✅ Initialized project directory
- ✅ Set up Node.js + Express structure
- ✅ Installed core dependencies
- ✅ Chose Supabase for database (hosted PostgreSQL)
- ✅ Installed and set up Prisma ORM
- ✅ GitHub repo initialized and first commit done
- ✅ Set up `.env` and development environment
- ✅ Created folder structure: `/controllers`, `/routes`, `/services`, `/models`
- ✅ Added `.env.example` for deployment readiness

---

## Entity Relationship Diagram (ERD)

```mermaid
erDiagram
  User ||--o{ Task : has
  User ||--o{ Label : creates
  Task ||--o{ TaskLabel : tagged_with
  Task ||--o{ Reminder : has
  Task ||--o{ Comment : receives
  Task ||--o{ Task : has_subtask
  User ||--o{ Comment : writes

  User {
    uuid id PK
    string firstName
    string lastName
    string email
    string passwordHash
    timestamp createdAt
    timestamp updatedAt
  }

  Task {
    uuid id PK
    uuid userId FK
    string title
    string description
    date dueDate
    boolean isCompleted
    uuid parentTaskId FK
    timestamp createdAt
    timestamp updatedAt
  }

  Label {
    uuid id PK
    uuid userId FK
    string name
    string color
    timestamp createdAt
  }

  TaskLabel {
    uuid id PK
    uuid taskId FK
    uuid labelId FK
  }

  Reminder {
    uuid id PK
    uuid taskId FK
    timestamp remindAt
    boolean isSent
  }

  Comment {
    uuid id PK
    uuid taskId FK
    uuid userId FK
    string content
    timestamp createdAt
  }
```

## Environment Variables

A `.env.example` file is included. Copy it as `.env` and add your actual secrets:

```
DATABASE_URL=postgresql://user:password@db.supabase.co:5432/dbname
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_URL=https://your-project.supabase.co

```
Do not commit your `.env` file — it's listed in `.gitignore`.

## Future Plans

* Add subtasks and comment functionality

* Implement full user authentication (login/signup)

* Add frontend (likely using React or Next.js)

* Deploy backend and frontend

* Add Progressive Web App (PWA) support

* Add test user accounts for demo purposes

## Contributing

This project is personal/portfolio-based for now. Contributions are welcome via issues or pull requests once public.

## License

MIT License