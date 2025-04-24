import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css"; // Ensure Tailwind CSS is included

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router> {/* ✅ Wrap App inside Router */}
      <App />
    </Router>
  </React.StrictMode>
);
