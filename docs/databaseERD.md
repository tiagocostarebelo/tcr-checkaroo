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