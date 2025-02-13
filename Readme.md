# Chat Room Application

This project is a real-time chat room application built with a **Next.js** client and a **Bun-powered** server using **Socket.IO** for communication. The application provides a seamless chat experience with avatar support and smooth animations.

## Features

- Real-time messaging using **Socket.IO**
- Avatar generation using **DiceBear**
- Smooth animations with **Framer Motion**
- Modern UI components from **HeroUI**
- Built with **TypeScript**, **Tailwind CSS**, and **Next.js Turbopack** for high performance
- **Bun** as the server runtime for faster development

## Project Structure

### Client

The client is built with **Next.js** and **React**. The application uses **Tailwind CSS** for styling and **Framer Motion** for animations.

#### Scripts:

#### Key Dependencies:

- `next`: Framework for React apps
- `react`, `react-dom`: Core React libraries
- `socket.io-client`: Real-time communication
- `@dicebear/avatars`, `@dicebear/avatars-bottts-sprites`: Generate random avatars
- `lucide-react`: Icon library
- `framer-motion`: Animation library for React

### Server

The server is built using **Express** and powered by **Bun**, with real-time communication handled by **Socket.IO**.

#### Scripts:

#### Key Dependencies:

- `express`: Web framework for Node.js
- `socket.io`: Real-time bidirectional event-based communication
- `@types/express`: TypeScript types for Express
- `typescript`: TypeScript support

## How to Run the Project

### Prerequisites

Make sure you have the following installed:

- **Node.js** (for the client)
- **Bun** (for the server)
- **TypeScript**

### Steps

1. **Clone the Repository**
   ```bash
   git clone <repo-url>
   cd chat-room
   ```

## Install Client Dependencies

1. Install the client dependencies:
   ```bash
   bun install
   ```

## Install Server Dependencies

1. Install the server dependencies:
   ```bash
   bun install
   ```

## Run the Server

1. Start the server:
   ```bash
   bun server.ts
   ```

## Run the Client

1. Start the client:
   ```bash
   bun run dev
   ```

## License

Let me know if you want to include additional sections like **Contributing** or **Screenshots**. 😊
