# Subscription Manager

A web application for managing personal subscriptions built with React and Firebase.

## Features

- User authentication (sign up/login)
- Add and manage subscriptions
- Track monthly and annual costs
- Edit or delete subscriptions
- Mark subscriptions as active/inactive/cancelled

## Technologies Used

- React 19
- Tailwind CSS
- Firebase Authentication
- Firebase Firestore
- Vite

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure Firebase:
   - Create a Firebase project
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Update `src/config/firebase.js` with your Firebase config

3. Run the application:
```bash
npm run dev
```

## Usage

- Create an account or sign in
- Add subscriptions with service name, cost, due date, and billing frequency
- View total monthly and annual costs
- Edit or delete subscriptions as needed

## Build

```bash
npm run build
```+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
