/* 
src/index.js 
credits: this was taken from the React tic-tac-toe tutorial
and modified by myself
*/

import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import Game from "./App"; 
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}  
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >

    <Game />
  </Auth0Provider>
);

