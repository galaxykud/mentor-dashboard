import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { initializeAnalytics } from "./lib/analytics";
initializeAnalytics();
createRoot(document.getElementById("root")).render(<App />);
