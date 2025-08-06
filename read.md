Task Manager
Manage tasks

Features
Authentication
Users -> Admin & Staff
Tasks ->

User flow
Login
---> Has account? -> Yes => Login
                  -> No -> Register

                                    -

---> LoggedIn User [Admin]
    -> View All tasks
    -> Create tasks
    -> Update task
    -> Delete task

    LoggedIn User [Staff]
    -> View All assigned tasks related to user
    -> Update assigned tasks related to user

Functionalities

Permissions = [
    // Users
    READ_USERS,
    CREATE_USERS,
    UPDATE_USERS,
    DELETE_USERS,
    // Tasks
    READ_TASKS,
    CREATE_TASKS,
    UPDATE_TASKS,
    DELETE_TASKS,
    ASSIGN_TASKS
]

Authentication /auth
-> Register user [Creating a user] POST /sign-up
-> Sign in user -> POST /sign-in

User management /users
-> View users GET =====> READ_USERS
-> View user by id GET /:id =====> READ_USERS
-> Update user PATCH /:id =======> UPDATE_USERS
-> Create user ============> CREATE_USERS

Tasks /tasks
-> View All tasks GET ======> READ_TASKS
-> View one task by id GET /:id ========> READ_TASKS
-> Create tasks POST ==========> CREATE_TASKS
-> Update task PATCH /:id ==========> UPDATE_TASKS
-> Delete task DELETE /:id ===========> DELETE_TASKS
-> Assign task POST /:id ===========> ASSIGN_TASKS

User Models (Schema)
-  id
-  email
-  name
-  password
-  permissions

Task
- id
- title
- deadline
- description
- assigneeId -> userID
- status => Todo | In Progress | Done
