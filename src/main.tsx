import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";
import "./styles/global.css";
import "./styles/visibility-fix.css"; // Import our visibility fixes
import { configureGsap } from "./utils/animationUtils";
import ComicLayout from "./components/layout/ComicLayout";

// Configure GSAP for safe animations
configureGsap();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <ComicLayout>
        <App />
      </ComicLayout>
    </HashRouter>
  </React.StrictMode>
);
