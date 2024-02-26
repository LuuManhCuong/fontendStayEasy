import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux-tookit/store";
import GlobalStyle from "./components/GlobalStyle/GlobalStyle";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <GlobalStyle>
        <App />
      </GlobalStyle>
    </Provider>
  </BrowserRouter>
);

reportWebVitals();
