# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

There are no build, lint, or test scripts. The app runs TypeScript directly via Node — no compilation step.

## Environment Variables

Create a `.env` file with:
```
MONGODB_URI=<mongodb connection string>
JWT_SECRET=<secret key>
```

## Architecture

Express + TypeScript + MongoDB REST API backend. Runs on **port 8000**. Uses ES Modules (`"type": "module"`).

**Request flow:** `routes/` → middleware in `services/authService.ts` → `controllers/` → `models/`

### Auth & Authorization

JWT tokens are issued on sign-in and stored as HTTP-only cookies (`maxAge` = 30 min, matching `expiresIn: '30m'`).

Two middleware functions in `services/authService.ts`:
- `authenticateToken` — verifies token and user exists; for any authenticated user
- `authenticateRole` — same as above, plus enforces `role === 'admin'`; returns 403 for non-admins

### Route–Middleware Matrix

| Route | Middleware | Who can access |
|---|---|---|
| `POST /api/task/register` | `authenticateRole` | Admin only |
| `POST /api/task/userRegister` | `authenticateRole` | Admin only |
| `POST /api/task` | `authenticateRole` | Admin only |
| `DELETE /api/task/:id` | `authenticateRole` | Admin only |
| `GET/PATCH /api/task/*` | `authenticateToken` | Any authenticated user |
| `GET/PATCH /api/read_User/*`, `/api/updateUser/*` | `authenticateToken` | Any authenticated user |
| `POST /api/task/sign_in`, `/api/adminSignin` | none | Public |

### Models

**User** (`models/user.ts`): `name`, `email`, `password` (bcrypt hashed), `role` (`'admin' | 'user'`, default `'user'`)

**Task** (`models/task.ts`): `title`, `deadline`, `description`, `assignedId` (user ID string), `status` (`'Todo' | 'In Progress' | 'Done'`)

### Password Handling

Passwords are always stripped from responses using destructuring before `res.json()`:
```ts
const { password: _, ...safeUser } = results.toObject()
```
