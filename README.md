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
- RESTful API design
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

## Entity Relationship Diagram (ERD)

```mermaid
erDiagram

  User {
    string id PK
    string email "unique"
    string firstName
    string lastName
    string displayName
    string profileImageUrl
    string authProvider
    datetime createdAt
    datetime updatedAt
  }

  Task {
    string id PK
    string title
    string description "nullable"
    datetime dueDate "nullable"
    TaskStatus status "DEFAULT PENDING"
    TaskPriority priority "DEFAULT MEDIUM"
    boolean isCompleted "DEFAULT false"
    datetime createdAt
    datetime updatedAt
    string userId FK
    string parentTaskId "nullable"
  }

  Label {
    string id PK
    string name
    string color
    datetime createdAt
    datetime updatedAt
    string userId FK
    %% @@unique([name, userId]) ensures a user cannot have two labels with the same name
  }

  TaskLabel {
    string id PK
    string taskId FK
    string labelId FK
    %% @@unique([taskId, labelId]) ensures a task cannot have the same label applied multiple times
  }

  Reminder {
    string id PK
    datetime remindAt
    boolean isSent "DEFAULT false"
    datetime createdAt
    datetime updatedAt
    string taskId FK
  }

  Comment {
    string id PK
    string content
    datetime createdAt
    datetime updatedAt
    string taskId FK
    string userId FK
  }

  TaskStatus {
    enum PENDING
    enum IN_PROGRESS
    enum COMPLETED
    enum ARCHIVED
  }

  TaskPriority {
    enum LOW
    enum MEDIUM
    enum HIGH
    enum URGENT
  }

  User ||--o{ Task : "has"
  User ||--o{ Label : "creates"
  User ||--o{ Comment : "writes"

  Task ||--o{ TaskLabel : "is labeled by"
  Task ||--o{ Reminder : "has"
  Task ||--o{ Comment : "has"
  Task }o--|| Task : "is subtask of / has subtasks" 
  %%Self-referencing for parent/subtasks

  Label ||--o{ TaskLabel : "labels"
```

## Environment Variables

A `.env.example` file is included. Copy it as `.env` and add your actual secrets:

```
PORT=your_PORT
# Connect to Supabase via connection pooling with Supavisor.
DATABASE_URL="postgres://postgres.[your-supabase-project]:[password]@aws-0-[aws-region].pooler.supabase.com:6543/postgres?pgbouncer=true"
# Direct connection to the database. Used for migrations.
DIRECT_URL="postgres://postgres.[your-supabase-project]:[password]@aws-0-[aws-region].pooler.supabase.com:5432/postgres"
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_DB_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret_key

```
Do not commit your `.env` file — it's listed in `.gitignore`.

## Future Plans

* Implement full user authentication (login/signup)

* Add frontend (likely using React or Next.js)

* Add test user accounts for demo purposes

* Deploy backend and frontend

* Add subtasks and comment functionality

* Add Progressive Web App (PWA) support


## Contributing

This project is personal/portfolio-based for now. Contributions are welcome via issues or pull requests once public.

## License

MIT License