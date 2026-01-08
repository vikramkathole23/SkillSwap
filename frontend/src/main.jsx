import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { SkeletonTheme } from "react-loading-skeleton";

createRoot(document.getElementById("root")).render(
  <CookiesProvider>
    <StrictMode>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SkeletonTheme>
    </StrictMode>
  </CookiesProvider>
);
