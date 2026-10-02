# Client Request Dashboard

A clean, responsive MERN stack client request management dashboard designed for tracking, managing, and advancing client tasks through a structured lifecycle in real-time.

---

## 1. Project Title
**Client Request Dashboard** — Minimalist Full-Stack Client Request Management System.

---

## 2. Short Description
The Client Request Dashboard allows teams to collect client requests, monitor overall progress with real-time summary statistics, and advance requests through an intuitive status pipeline (`New` → `In Progress` → `Done`) with instant UI synchronization and persistent MongoDB storage.

---

## 3. Features
- **Real-Time Synchronized State**: Updates React state immediately upon request creation or status modification with zero full-page reloads.
- **Derived Real-Time Analytics**: Summary cards for Total Requests, New, In Progress, and Done update dynamically via derived state calculations (`.filter().length`).
- **Structured Status Lifecycle**: One-click status progression (`New` → `In Progress` → `Done` → `Completed`) with row-specific updating states.
- **Request Creation Form**: Controlled input fields with client-side validation, submit disabling, and clear feedback.
- **Clean SaaS Aesthetic**: Light neutral theme, modern Inter typography, colored status badges, and subtle shadows.
- **Full Responsiveness**: Mobile-friendly layout where cards stack, inputs adapt, and tables scroll smoothly on small screens.
- **Mock Authentication**: Fast, credential-agnostic demo authentication flow using `localStorage` and route guarding via `ProtectedRoute`.
- **Database Persistence**: Connected to MongoDB with schema-level validation and timestamps.

---

## 4. Technology Stack
- **Frontend**:
  - React 19 + Vite
  - React Router v7
  - Axios
  - Plain Responsive CSS (Vanilla CSS design system)
- **Backend**:
  - Node.js (ES Modules)
  - Express
  - MongoDB + Mongoose ODM
  - CORS & Dotenv
  - Nodemon (development)
- **Package Manager**:
  - `pnpm`

---

## 5. Project Structure
```text
client-request-dashboard/
├── .gitignore
├── README.md
├── server/
│   ├── config/
│   │   └── db.js                 # MongoDB connection logic
│   ├── controllers/
│   │   └── requestController.js  # Controller handlers (GET, POST, PATCH)
│   ├── models/
│   │   └── Request.js            # Mongoose schema with enum & validation
│   ├── routes/
│   │   └── requestRoutes.js      # Express route definitions
│   ├── .env                      # Local server secrets (git-ignored)
│   ├── .env.example              # Server environment template
│   ├── .gitignore
│   ├── package.json
│   └── server.js                 # Express app entry point
└── client/
    ├── public/
    │   └── favicon.svg
    ├── src/
    │   ├── components/
    │   │   ├── ProtectedRoute.jsx # Route guard based on localStorage
    │   │   ├── RequestForm.jsx    # Controlled form for new requests
    │   │   ├── RequestTable.jsx   # Request list with status progression
    │   │   └── StatsCards.jsx     # Derived summary statistics cards
    │   ├── pages/
    │   │   ├── Login.jsx          # Mock demo sign-in page
    │   │   └── Dashboard.jsx      # Main dashboard view
    │   ├── services/
    │   │   └── requestApi.js      # Axios API service client
    │   ├── App.jsx                # Route declarations & navigation
    │   ├── index.css              # Centralized responsive styling system
    │   └── main.jsx               # React DOM entry point
    ├── .env                       # Local frontend secrets (git-ignored)
    ├── .env.example               # Frontend environment template
    ├── .gitignore
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## 6. Prerequisites
- **Node.js**: `v18.x` or later (tested on Node v20/v22)
- **pnpm**: `v9.x` or later (`npm install -g pnpm`)
- **MongoDB**: Local MongoDB instance running on `mongodb://127.0.0.1:27017` or a MongoDB Atlas URI

---

## 7. Backend Setup

1. Open your terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install dependencies using `pnpm`:
   ```bash
   pnpm install
   ```

3. Create the environment configuration file:
   ```bash
   cp .env.example .env
   ```
   *(Or copy `.env.example` to `.env` manually)*

4. Confirm that your MongoDB daemon is running locally.

---

## 8. Frontend Setup

1. Open a new terminal tab and navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install dependencies using `pnpm`:
   ```bash
   pnpm install
   ```

3. Create the frontend environment configuration file:
   ```bash
   cp .env.example .env
   ```

---

## 9. Environment Variables

### Backend (`server/.env`)
| Variable | Description | Default Value |
| :--- | :--- | :--- |
| `PORT` | Port number for Express server | `5000` |
| `MONGO_URI` | MongoDB connection connection string | `mongodb://127.0.0.1:27017/client-request-dashboard` |

### Frontend (`client/.env`)
| Variable | Description | Default Value |
| :--- | :--- | :--- |
| `VITE_API_URL` | Base URL of the backend API | `http://localhost:5000/api` |

---

## 10. How to Run Both Apps

### 1. Start Backend Server
```bash
cd server
pnpm dev
```
The server will start at `http://localhost:5000` and connect to MongoDB.

### 2. Start Frontend App
```bash
cd client
pnpm dev
```
The Vite development server will start at `http://localhost:5173`. Open your browser and navigate to `http://localhost:5173`.

---

## 11. API Endpoints

Base URL: `http://localhost:5000/api/requests`

### 1. Get All Requests
- **Method**: `GET`
- **Path**: `/api/requests`
- **Description**: Returns all client requests sorted with the newest first.
- **Success Response (200 OK)**:
  ```json
  [
    {
      "_id": "660c1d2e4f1a2b3c4d5e6f7a",
      "clientName": "Acme Corp",
      "title": "Redesign customer onboarding portal",
      "status": "New",
      "createdAt": "2026-10-02T10:00:00.000Z",
      "updatedAt": "2026-10-02T10:00:00.000Z"
    }
  ]
  ```

### 2. Create Request
- **Method**: `POST`
- **Path**: `/api/requests`
- **Description**: Creates a new client request. Defaults `status` to `New`.
- **Request Body**:
  ```json
  {
    "clientName": "Stark Industries",
    "title": "Implement automated billing webhooks"
  }
  ```
- **Success Response (201 Created)**:
  ```json
  {
    "_id": "660c1d2e4f1a2b3c4d5e6f7b",
    "clientName": "Stark Industries",
    "title": "Implement automated billing webhooks",
    "status": "New",
    "createdAt": "2026-10-02T10:05:00.000Z",
    "updatedAt": "2026-10-02T10:05:00.000Z"
  }
  ```
- **Error Response (400 Bad Request)**:
  ```json
  {
    "message": "Client name and title are required"
  }
  ```

### 3. Update Request Status
- **Method**: `PATCH`
- **Path**: `/api/requests/:id/status`
- **Description**: Updates the status of an existing request with schema validation.
- **Request Body**:
  ```json
  {
    "status": "In Progress"
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "_id": "660c1d2e4f1a2b3c4d5e6f7b",
    "clientName": "Stark Industries",
    "title": "Implement automated billing webhooks",
    "status": "In Progress",
    "createdAt": "2026-10-02T10:05:00.000Z",
    "updatedAt": "2026-10-02T10:07:00.000Z"
  }
  ```
- **Error Response (404 Not Found)**:
  ```json
  {
    "message": "Request not found"
  }
  ```

---

## 12. Status Lifecycle

The application enforces a sequential, forward-moving status progression:

```text
[ New ] ──────> [ In Progress ] ──────> [ Done ] ──────> [ Completed (Static) ]
   │                    │                  │
   └─ Button:           └─ Button:         └─ Static Text
      "In Progress"        "Done"             "Completed"
```

1. **`New`**: Default status when a request is created. Action button displays **`In Progress`**.
2. **`In Progress`**: Work is active. Action button displays **`Done`**.
3. **`Done`**: Task completed. Displays a static **`Completed`** badge with no further transitions.

Each status update sends a `PATCH` request to `/api/requests/:id/status`. Upon confirmation from the backend, the React state replaces that request item in-place without triggering a browser refresh.

---

## 13. Mock Authentication Explanation

Full authentication (JWT, sessions, bcrypt) is not required for this technical test. Instead, a clean, professional mock authentication flow is implemented:

- **Login Flow**:
  - The login form requires non-empty email and password values.
  - Submitting saves `localStorage.setItem("loggedIn", "true")`.
  - The router navigates the user to `/dashboard`.
- **Protected Route Guard**:
  - The `<ProtectedRoute>` component wraps the dashboard page.
  - It checks `localStorage.getItem("loggedIn") === "true"`.
  - If unauthenticated, it redirects immediately to `/login` with `{ replace: true }`.
- **Logout Flow**:
  - Clicking **Logout** removes `loggedIn` from `localStorage` and redirects the user to `/login`.
