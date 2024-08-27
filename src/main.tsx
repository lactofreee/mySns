import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Routes/Router.tsx";
import GlobalStyles from "./styles/GlobalStyles.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyles />
    <Router />
  </React.StrictMode>
);
