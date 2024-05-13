import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserStore from "./store/UserStore";
import ItemStore from "./store/ItemStore";
import { BrowserRouter } from "react-router-dom";
import OrderStore from "./store/OrderStore";


export const Context = createContext(null);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        user: new UserStore(),
        item: new ItemStore(),
        order: new OrderStore(),
      }}
    >
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </Context.Provider>
  </React.StrictMode>
);

reportWebVitals();
