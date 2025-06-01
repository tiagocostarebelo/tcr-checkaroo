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

## Entity Relationship Diagram (ERD)

```mermaid
erDiagram

  User {
    string id PK
    string firstName
    string lastName
    string email "unique"
    string passwordHash
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
    string parentTaskId "nullable" FK
  }

  Label {
    string id PK
    string name
    string color
    datetime createdAt
    datetime updatedAt
    string userId FK
  }

  TaskLabel {
    string id PK
    string taskId FK
    string labelId FK
    %% @@unique([taskId, labelId]) is implied by PK on (taskId, labelId) if we used composite PK.
    %% With separate 'id PK' on TaskLabel, unique constraint still needed.
    %% Mermaid doesn't have a direct way to show '@@unique' other than notes or PK.
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
  Task }o--|| Task : "is subtask of / has subtasks" %% Self-referencing for parent/subtasks

  Label ||--o{ TaskLabel : "labels"

  %% Explicitly linking Enums to Task (though not a standard ERD relation, helps visualize)
  %% Task .. TaskStatus : "uses status"
  %% Task .. TaskPriority : "uses priority"
  %% The above enum links might clutter. The type directly on Task attribute is often sufficient.

  %% Notes on FKs and onDelete (Mermaid doesn't directly support this on relation lines)
  %% Task.userId -> User.id (onDelete: Cascade)
  %% Task.parentTaskId -> Task.id (onDelete: SetNull)
  %% Label.userId -> User.id (onDelete: Cascade)
  %% TaskLabel.taskId -> Task.id (onDelete: Cascade)
  %% TaskLabel.labelId -> Label.id (onDelete: Cascade)
  %% Reminder.taskId -> Task.id (onDelete: Cascade)
  %% Comment.taskId -> Task.id (onDelete: Cascade)
  %% Comment.userId -> User.id (onDelete: Cascade)
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