import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Routes/Router.tsx";
import GlobalStyles from "./styles/GlobalStyles.ts";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyles />
    <RecoilRoot>
      <Router />
    </RecoilRoot>
  </React.StrictMode>
);
