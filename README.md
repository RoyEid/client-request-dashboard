# Client Request Dashboard

## About
A simple MERN stack client request management dashboard built for a technical test. It allows users to track and update client requests through a clear status progression.

## Features
- Mock login
- Create client requests
- View requests in a table
- Status flow: New → In Progress → Done
- Dashboard statistics (total and status counts)
- MongoDB persistence
- Responsive design for desktop, tablet, and mobile

## Tech Stack
- React + Vite
- React Router
- Axios
- CSS
- Node.js
- Express
- MongoDB
- Mongoose
- pnpm

## Project Structure
```text
client-request-dashboard/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── requestController.js
│   ├── models/
│   │   └── Request.js
│   ├── routes/
│   │   └── requestRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── client/
    ├── src/
    │   ├── components/
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── RequestForm.jsx
    │   │   ├── RequestTable.jsx
    │   │   └── StatsCards.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   └── Login.jsx
    │   ├── services/
    │   │   └── requestApi.js
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .env.example
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Setup

### Backend
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Start the server:
   ```bash
   pnpm dev
   ```

### Frontend
1. Navigate to the client directory in a separate terminal:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   pnpm dev
   ```

## Environment Variables

### Backend (`server/.env`)
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/client-request-dashboard
```

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

```text
GET    /api/requests
POST   /api/requests
PATCH  /api/requests/:id/status
```

### POST `/api/requests`
Request body:
```json
{
  "clientName": "Acme Corp",
  "title": "Update dashboard layout"
}
```

### PATCH `/api/requests/:id/status`
Request body:
```json
{
  "status": "In Progress"
}
```

## Mock Login
Full authentication was not required for this technical test. Users can enter any non-empty email and password to log in. `localStorage` stores `loggedIn = "true"` to simulate a logged-in state, and `ProtectedRoute` redirects users to `/login` if they try to access `/dashboard` while logged out.
