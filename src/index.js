/* 
src/index.js 
credits: this was taken from the React tic-tac-toe tutorial
and modified by myself
*/

import React from "react";
import "./styles.css";
import App from "./App.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-hkp08n84scd0fy2u.us.auth0.com"
      clientId="ALc5oARs57GJbNIeUWLLIaRsgtpbtwP0"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);


