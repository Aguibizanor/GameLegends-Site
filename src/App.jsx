import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./pages/AppRoutes";
import { AuthProvider } from "./AuthContext.jsx";
import "./App.css";

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
}

export default App;

