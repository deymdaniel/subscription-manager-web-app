import React from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import "./App.css";

function AppContent() {
  const { currentUser } = useAuth();

  return <div className='App'>{currentUser ? <Dashboard /> : <Auth />}</div>;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
