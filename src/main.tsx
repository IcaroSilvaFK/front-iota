// import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import { router } from "./routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain={import.meta.env.VITE_GITHUB_CLIENT_ID}
    clientId={import.meta.env.VITE_GITHUB_CLIENT_SECRET}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <RouterProvider router={router} />
  </Auth0Provider>
);
