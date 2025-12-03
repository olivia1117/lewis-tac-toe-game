/* 
src/index.js 
credits: this was taken from the React tic-tac-toe tutorial
and modified by myself
*/

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);