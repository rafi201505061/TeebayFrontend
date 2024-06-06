// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";

import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext.jsx";
import { SkeletonTheme } from "react-loading-skeleton";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <AppContextProvider>
      <SkeletonTheme baseColor="#EFF2F4" highlightColor="#FBFCFD">
        <App />
      </SkeletonTheme>
    </AppContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
