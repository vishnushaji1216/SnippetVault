# ⚡ SnippetVault

A high-performance, full-stack code snippet manager designed for developers. Features a **Hybrid Storage Architecture** that automatically syncs to the cloud (Supabase) but falls back to LocalStorage if no backend is configured.

<img width="1919" height="954" alt="image" src="https://github.com/user-attachments/assets/8da98075-56c4-4326-a05b-85c88e5e79ec" />



## 🚀 Key Features

- **Hybrid Storage Engine:** Automatically detects environment. Uses **Supabase (PostgreSQL)** if API keys are present, otherwise falls back to **LocalStorage** for offline/local use.
- **Smart Caching:** Implements an in-memory caching layer to eliminate redundant network requests, making navigation instant.
- **Search & Filter:** Real-time filtering by title and tags (e.g., #react, #python).
- **Responsive:** Fully optimized for Mobile, Tablet, and Desktop.

## 🛠️ Tech Stack

- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS
- **Backend:** Supabase (Optional)
- **State/Cache:** Custom In-Memory Store + React Hooks

## 🧠 Architecture Highlights

### 1. The Hybrid Fallback System
The app is built to be "distribution-ready." It checks for environment variables at runtime:
- **Scenario A (Cloud Mode):** If `.env` contains Supabase keys, the app acts as a full-stack cloud application with real-time database sync.
- **Scenario B (Local Mode):** If keys are missing (e.g., a user clones the repo without setup), the app automatically switches to `localStorage`, ensuring the app **never crashes** and remains fully functional.

### 2. Performance Strategy
To prevent "loading spinners" on every page turn, the app uses a module-level **Write-Through Cache**.
- **Reads:** Data is fetched from memory first (instant). Network requests only happen if the cache is cold.
- **Writes:** When a snippet is created/deleted, the cache is optimistically updated immediately, while the database updates in the background.

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/vishnushaji1216/SnippetVault/
   cd snippet-vault
