import React from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import "./App.css";

function AppContent() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return (
      <CurrencyProvider>
        <div className='App'>
          <Dashboard />
        </div>
      </CurrencyProvider>
    );
  }

  return (
    <div className='App'>
      <Auth />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
