# 🛡️ HUB OS - Secure Task Infrastructure

HUB OS is a production-ready, high-fidelity task management application built with a focus on security, role-based access control (RBAC), and a premium "Obsidian" aesthetic. It features a robust FastAPI backend and a modern Next.js frontend with cinematic animations.



## 🚀 Core Features

### 🔐 Advanced Authentication
- **JWT-Based Security**: Secure token-based authentication using `python-jose`.
- **Password Hashing**: Industry-standard encryption with `passlib[bcrypt]`.
- **RBAC (Role-Based Access Control)**: Strictly enforced roles for `Admin` and `User`.
  - **Admin**: Full visibility into all system operations and user tasks.
  - **User**: Secure, isolated access to personal operational protocols.

### 📋 Operational Hub (CRUD)
- **Task Lifecycle**: Initialize, manage, and finalize tasks with real-time status updates.
- **Dynamic Filtering**: Switch between `All`, `In Progress`, and `Finalized` views with smooth sliding transitions.
- **Persistence**: Local SQLite database ensuring high-performance data storage for small-to-medium deployments.

### 🎨 Cinematic UI/UX
- **Obsidian Theme**: Deep-slate dark mode with vibrant purple and cyan accents.
- **Fluid Animations**: Powered by `Framer Motion` for layout transitions and interaction feedback.
- **Glassmorphism**: Backdrop-blur effects and semi-transparent layers for a premium software feel.
- **Responsive Drawer**: Fully functional mobile menu and adaptive layout for all device sizes.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js 15+, React 19, Tailwind CSS 4, Framer Motion, Lucide Icons |
| **Backend** | FastAPI (Python), SQLAlchemy ORM, Pydantic v2 |
| **Database** | SQLite (Production-ready local storage) |
| **Auth** | JWT (JSON Web Tokens), BCrypt Hashing |
| **API Client** | Axios with interceptor-ready configuration |

---

## 📦 Installation & Setup

### 1. Backend Configuration
```bash
# Navigate to backend directory
cd backend

# Create a virtual environment
python -m venv venv
source venv/Scripts/activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment
# Ensure .env exists with SECRET_KEY and SQLALCHEMY_DATABASE_URI

# Start the server
uvicorn app.main:app --reload
```
*The API will be available at `http://localhost:8000`. Documentation at `/docs`.*

### 2. Frontend Configuration
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
*The UI will be available at `http://localhost:3000`.*

---

## 📂 Project Architecture

```text
├── backend/
│   ├── app/
│   │   ├── api/          # Versioned API endpoints (v1)
│   │   ├── core/         # Config, Security, and Dependencies
│   │   ├── db/           # Session management and Base models
│   │   ├── models/       # SQLAlchemy database entities
│   │   ├── repositories/ # Repository pattern for data access
│   │   └── schemas/      # Pydantic validation schemas
│   └── .env              # Environment variables
├── frontend/
│   ├── app/              # Next.js App Router (Layouts, Pages)
│   ├── components/       # Shadcn/ui-inspired UI components
│   ├── public/           # Static assets
│   └── globals.css       # Tailwind 4 configuration & animations
└── README.md
```

---

## 🔒 Security Implementation
The system uses a **Repository Pattern** to decouple business logic from database operations. Access is controlled via FastAPI dependencies that verify the JWT signature and check user roles before granting access to protected routes.

- **Private Routes**: Handled by client-side redirection.
- **Token Persistence**: Securely stored in `localStorage` with error-handling for malformed state.

---

## 📜 License
This project is part of a high-fidelity internal operational assignment. All rights reserved.


