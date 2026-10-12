# Task & Team Management Platform

A full-stack MERN application for managing team tasks, deadlines, priorities, and assignments with secure JWT authentication and a responsive dashboard.

---

## Live Deployment Links

- **Frontend (Live App):** https://task-team-platform-j97umry5m-suraj-wakchaures-projects.vercel.app/login
- **Backend (API):** https://task-team-platform.onrender.com

---

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, Lucide React, Redux Toolkit, Axios
- **Backend:** Node.js, Express.js, Mongoose, JWT (jsonwebtoken), bcryptjs
- **Database:** MongoDB Atlas

---

## Key Features

- **Authentication:** User registration and login with bcrypt-hashed passwords and JWT token generation.
- **Persistent Sessions:** "Remember Me" functionality with extended token duration.
- **Task Management (CRUD):** Create, view, update, and delete tasks.
- **Team Collaboration:** Tasks can be assigned to team members or left unassigned.
- **Filters & Search:** Real-time search by task title, dropdown filtering by Status (`Pending`, `In Progress`, `Completed`), and Priority (`Low`, `Medium`, `High`).
- **Sorting:** Sort tasks by due date (Soonest first / Furthest first).
- **Dashboard Metrics:** Summary cards showing Total, Pending, In Progress, and Completed task counts.
- **Clean UI:** Saffron and white theme with responsive layout and clean table views.

---

## Project Structure

```text
├── client/                     # Frontend (React + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/         # Navbar, Sidebar, DashboardCards, TaskModal, ProtectedRoute
│   │   ├── hooks/              # useTasks (Custom CRUD hook)
│   │   ├── pages/              # Login, Register, Dashboard
│   │   ├── services/           # Axios instance with auth interceptor
│   │   └── store/              # Redux auth state slice
│   └── package.json
│
├── server/                     # Backend (Node.js + Express + MongoDB)
│   ├── config/                 # MongoDB database connection
│   ├── controllers/            # Auth and Task route controllers
│   ├── middleware/             # JWT auth verification middleware
│   ├── models/                 # User and Task Mongoose schemas
│   ├── routes/                 # Express API routes
│   └── server.js               # Express application entry point
│
├── TaskManager.postman_collection.json  # Exported Postman collection
└── README.md
```

---

## Getting Started Locally

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas connection string (or local MongoDB)

---

### 1. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
npm run dev
```

The server will run on `http://localhost:5000`.

---

### 2. Frontend Setup

In a new terminal:

```bash
cd client
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The client will run on `http://localhost:5173`.

---

## API Endpoints

### Authentication & Users
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Register a new user | No |
| `POST` | `/login` | Authenticate user & get JWT | No |
| `GET` | `/users` | Get all users for assignment | Yes |
| `DELETE`| `/users/:id` | Delete user account | Yes |

### Tasks
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/tasks` | Get all tasks (filterable/sortable) | Yes |
| `POST` | `/tasks` | Create a new task | Yes |
| `GET` | `/tasks/:id` | Get single task details | Yes |
| `PUT` | `/tasks/:id` | Update an existing task | Yes |
| `DELETE`| `/tasks/:id` | Delete a task | Yes |

---

## Evaluator Test Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| Test User | `suraj.wakchaure@gmail.com` | `SSW@pass123` |

---

## Postman Collection

The file `TaskManager.postman_collection.json` is located in the root directory.

To test with Postman:
1. Open Postman and click **Import**.
2. Select `TaskManager.postman_collection.json`.
3. In the collection variables, paste your active JWT token under `token` (after running `POST /login`).
4. All requests will automatically use the Bearer token.
