import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "./assets/font-icons/style.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom";

import Main from "./containers/Main";
import { ApolloProvider, ConversationProvider } from "./providers";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <ConversationProvider>
    <ApolloProvider>
      <Main />
    </ApolloProvider>
  </ConversationProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
