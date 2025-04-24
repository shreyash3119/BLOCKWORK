import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
