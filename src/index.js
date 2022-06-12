import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import axios from "axios";
import * as registerServiceWorker from "./registerServiceWorker";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";

import "assets/css/material-dashboard-react.css?v=1.6.0";

const { REACT_APP_SERVER_URL } = process.env;

axios.defaults.baseURL = `http://${REACT_APP_SERVER_URL}/api`;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can chađinge
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
registerServiceWorker.unregister();

