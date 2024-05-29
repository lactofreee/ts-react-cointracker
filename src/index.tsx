import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </RecoilRoot>
);
