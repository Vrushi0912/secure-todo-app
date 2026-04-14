<div align="center">

# 🛡️ Secure AI Todo OS

A state-of-the-art, secure-by-default personal task management system with a breathtaking Bento-grid UI and military-grade encryption.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/react-%5E18.2.0-61dafb.svg?logo=react)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%5E3.3.5-38b2ac.svg?logo=tailwind-css)
![Zustand](https://img.shields.io/badge/zustand-state_management-orange.svg)
![Framer Motion](https://img.shields.io/badge/framer--motion-animations-ff0055.svg)

</div>

---

## ✨ Overview

**Secure AI Todo OS** is not just another task tracker. Built with privacy and a polished aesthetic in mind, it functions as a highly secure personal Operating System for your productivity. Inspired by modern dev tools like Linear and Raycast, it features a fluid, glassmorphic Bento-grid interface, zero-knowledge local persistence, and intelligent natural-language-based task creation.

## 🚀 Features

- 🔐 **Cyber-Warrior Security mode**: Local-only, zero-knowledge persistence relying on `CryptoJS` (AES-256). Your tasks are encrypted. Your data never leaves your device.
- 🎨 **State-of-the-Art UI**: A beautiful, premium Bento-grid layout with advanced window handling, slick dark-mode styles, and deep glassmorphism.
- 🧠 **AI-Powered Quick Add**: Natural language processing (NLP) to magically parse due dates, tags, and priorities directly from your string input.
- ✨ **High-Fidelity Interactions**: Smooth drag-and-drop mechanics, staggering micro-animations, and fluid transitions powered by `framer-motion`.
- ⚡ **Lightning Fast Engine**: Powered by Vite, React 18, and `Zustand` for bloat-free, instant state updates.
- ⌨️ **Command Palette**: Ctrl+K enabled universal command menu for incredibly fast keyboard-first workflow.
- 🍅 **Integrated Productivity Tools**: Includes a built-in Pomodoro timer and GitHub-style activity heatmaps.

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/) / [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) / `clsx` / `tailwind-merge`
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **Cryptography**: [Crypto-JS](https://www.npmjs.com/package/crypto-js)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 💻 Getting Started

### Prerequisites

Ensure you have Node.js (v18 or higher) and npm installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Vrushi0912/secure-todo-app.git
   cd secure-todo-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🔒 Security Architecture

1. **Master Key**: On your first visit, you will be prompted to create a Master Key.
2. **Encryption Mechanism**: Your Master Key decrypts the local vault. If you close the page, the key is wiped from temporary memory. 
3. **Data Residency**: No external databases are used. Your tasks exist strictly in an encrypted BLOB inside your browser's local storage.

---

## 🌌 User Experience

The application embraces a high-contrast dark theme by default, blending seamless typography with deep background blurs to emulate a sophisticated macOS/iOS-level native application environment within your browser.

- Press `Ctrl + K` (or `Cmd + K`) anywhere to jump to the rapid-entry Command Menu.
- Use natural language to create tasks (e.g., _"Buy groceries next Friday at 6pm #errands"_).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Vrushi0912/secure-todo-app/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">
  <p>Built with ❤️ for privacy and productivity.</p>
</div>
