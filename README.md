# 🌿 PlantAppClientV2

Frontend client for **Perennial**, a plant care application. This Angular-based UI interfaces with the [PlantAppAPI](https://github.com/scheltemat/PlantAppAPI) to deliver an interactive experience for managing plant care routines.

---

## 🚀 Getting Started

### ✅ Prerequisites

Make sure you have the following installed:

- [Node.js (Latest LTS Version)](https://nodejs.org)
- [Angular CLI](https://angular.io/cli)

---

### 📦 Installation & Setup

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the development server**
   ```bash
   ng serve
   ```
3. **Open your browser Visit http://localhost:4200**

## ⚙️ Development Environment

Before using the app, ensure the backend API is running locally:

1. Start the PlantAppAPI backend server.

2. Confirm it's accessible (at http://localhost:5000 or whatever port it’s set to).

3. Run the Angular app using `ng serve`.

## 🔐 Authentication Flow

1. The app is fully protected behind authentication.
2. You will be redirected to the Login page at startup.
3. From there, navigate to the Register page to create a new user.
4. After registration, log in using your new credentials.
5. Once authenticated, you can access the full app functionality.

## 🛠️ Tech Stack

- Angular 19
- TypeScript
- RxJS
- Angular CLI

## 🌱 API Integration
This app communicates with the backend API to manage plant data, user profiles, and care schedules.

Make sure the base API endpoint is configured in the environment file:

```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000'
};
```