# DesignHub: AI-Powered 3D/AR Interior Design Platform

## Overview

**DesignHub** is a modern web application for interior design, enabling users to visualize, design, and shop for furniture in 3D and AR/VR. Powered by AI, it offers real-time room analysis, furniture and color recommendations, interactive 3D previews, and seamless e-commerce integration—all wrapped in a beautiful, responsive UI.

---

## ✨ Features

- **AI Room Analyzer**: Upload a photo or use your camera to get instant AI-powered furniture and color suggestions.
- **3D Room & Furniture Visualization**: Interactive 3D previews with real-time add/remove, move, rotate, and scale controls.
- **AR/VR Viewer**: Place furniture in your real environment using AR (WebXR) or explore immersive VR scenes.
- **Live Camera Suggestions**: Get real-time design tips and overlays as you scan your room with your device camera.
- **E-commerce Integration**: "Buy on Amazon/Flipkart/Pepperfry" buttons for each recommended item.
- **Gallery & Dashboard**: Browse, save, and manage your designs and inspirations.
- **Modern UI/UX**: Built with Tailwind CSS, Radix UI, and custom glassmorphism/gradient effects. Supports dark mode and theme toggling.
- **Profile & Auth**: Sign up, sign in, and manage your designer profile and achievements.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, React Router 6
- **Styling**: Tailwind CSS 3, Radix UI, Lucide Icons, custom CSS
- **3D/AR/VR**: Three.js, @react-three/fiber, @react-three/drei, @react-three/xr, WebXR
- **State & Data**: React Query, React Hook Form, Zod
- **Backend**: Node.js, Express, CORS (simple API for furniture state)
- **Testing**: Vitest
- **Deployment**: Netlify (see `netlify.toml`)

---

## 📁 Folder Structure

```
THE_HAWK-S_CIH_2.0/
├── backend/              # Express backend (API for furniture state)
│   └── server.cjs
├── public/               # Static assets (favicon, robots.txt, etc.)
├── src/
│   ├── components/
│   │   └── ui/           # Radix UI-based reusable components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions (e.g., cn)
│   ├── pages/            # Main app pages (Index, RoomAnalyzer, ARViewer, etc.)
│   ├── App.tsx           # Main app and routing
│   ├── main.tsx          # React entry point
│   ├── index.css         # Tailwind and global styles
│   └── ...
├── tailwind.config.ts    # Tailwind theme and tokens
├── package.json          # Project metadata and scripts
├── vite.config.ts        # Vite config
├── netlify.toml          # Netlify deployment config
└── ...
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### 1. Clone the repository
```bash
git clone <repo-url>
cd THE_HAWK-S_CIH_2.0
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the backend server
```bash
npm run backend
# Runs Express API at http://localhost:5001
```

### 4. Start the frontend (Vite dev server)
```bash
npm run dev
# App runs at http://localhost:8080 (see vite.config.ts)
```

### 5. Build for production
```bash
npm run build
```

---

## 🌐 Deployment

- **Netlify**: The app is ready for Netlify deployment. See `netlify.toml` for build settings.
- **Static Export**: The frontend is a SPA and can be exported as static files from `dist/`.

---

## 🧩 Main Pages & Features

- `/` — **Landing Page**: Hero, features, CTA, and animated backgrounds
- `/analyzer` — **Room Analyzer**: Upload/capture room, get AI suggestions, 3D preview
- `/camera` — **Live Camera**: Real-time AI overlays and suggestions
- `/ar` — **AR/VR Viewer**: Place furniture in AR, immersive VR mode
- `/designer` — **Room Designer**: Custom dimensions, 2D/3D design, export/share
- `/gallery` — **Gallery**: Browse and search community designs
- `/dashboard` — **Dashboard**: Manage projects, stats, and quick actions
- `/profile` — **Profile**: Edit profile, view stats, achievements
- `/signin`, `/signup` — **Auth**: Sign in/up with beautiful forms

---

## 🧑‍💻 Contributing

1. Fork the repo and create your branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -am 'Add new feature'`
3. Push to the branch: `git push origin feature/your-feature`
4. Open a pull request

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details. 