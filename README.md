# Wall of Shame 🧱

A community board where developers anonymously post their most embarrassing code snippets. No accounts, no judgement — just shared suffering.

---

## What it does

- A global corkboard where anyone can pin a shameful code snippet
- Click any snippet to open a thread and leave remarks
- React with GIFs using the Tenor API
- Fully anonymous — no signup, no login
- Your identity is a randomly generated alias that persists in your browser
- Only you can delete your own snippets and comments

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Vite |
| Styling | Tailwind CSS v4 |
| Backend | Node.js + Express.js |
| Database | MongoDB (Mongoose) |
| Avatars | DiceBear API |

---

## Project Structure

```
wall-of-shame/
├── client/                   # React frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── index.js      # all API calls
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── SnippetCard.jsx
│   │   │   ├── SnippetThread.jsx
│   │   │   ├── AddSnippetCard.jsx
│   │   │   └── AddSnippetForm.jsx
│   │   ├── hooks/
│   │   │   ├── useSnippets.js
│   │   │   └── useComments.js
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── utils/
│   │   │   └── identity.js   # anonymous identity logic
│   │   ├── assets/
│   │   └── main.jsx
│   └── index.html
│
├── server/                   # Express backend
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── snippet.controller.js
│   │   │   └── comment.controller.js
│   │   ├── models/
│   │   │   ├── snippet.model.js
│   │   │   └── comment.model.js
│   │   ├── routes/
│   │   │   ├── snippet.routes.js
│   │   │   └── comment.routes.js
│   │   ├── utils/
│   │   │   ├── asyncHandler.js
│   │   │   ├── apiResponse.js
│   │   │   └── errResponse.js
│   │   └── app.js
│   └── index.js
│
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure you have these installed:
- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier works)

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/wall-of-shame.git
cd wall-of-shame
```

---

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file inside `/server`:

```env
PORT=8000
MONGODB_URI=your_mongodb_atlas_connection_string
```

Start the server:

```bash
npm run dev
```

Server runs on `http://localhost:8000`

---

### 3. Set up the frontend

```bash
cd client
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## API Routes

### Snippets

| Method | Route | Description |
|---|---|---|
| GET | `/api/v1/snippets/getnewsnippets` | Get paginated snippets |
| POST | `/api/v1/snippets/addMySnippet` | Post a new snippet |
| GET | `/api/v1/snippets/getSnippetById` | Get single snippet |
| POST | `/api/v1/snippets/deleteMySnippet` | Delete your snippet |

### Comments

| Method | Route | Description |
|---|---|---|
| GET | `/api/v1/comments/getBySnipppetId` | Get comments for a snippet |
| POST | `/api/v1/comments/add` | Add a comment |
| POST | `/api/v1/comments/delete` | Delete your comment |

---

## How anonymity works

No accounts are created. On your first visit:

1. A random UUID is generated and saved in your browser's `localStorage`
2. A developer-flavoured alias is generated (e.g. `Async-Ninja_4f2`)
3. A robot avatar is generated from your alias using DiceBear
4. When you post, your UUID is sent to the server and stored as a **bcrypt hash**
5. When you delete, your UUID is compared against the stored hash
6. If they match — deletion allowed. If not — rejected.

Your alias is public. Your UUID is never exposed.

---

## Environment Variables

### Server `.env`

| Variable | Description |
|---|---|
| `PORT` | Port the server runs on (default 8000) |
| `MONGODB_URI` | Your MongoDB Atlas connection string |

---

## Notes

- The frontend proxies all `/api` requests to `http://localhost:8000` via Vite's proxy config — no CORS issues in development
- Avatars are generated on the fly from DiceBear and never stored in the database
- Deleting a snippet also deletes all its comments (cascade delete)
