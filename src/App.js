import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

// core components
import Admin from "layouts/Admin";
import Auth from "layouts/Auth.jsx";
import RTL from "layouts/RTL.jsx";

const App = () => {

  const hist = createBrowserHistory();

  const { REACT_APP_SERVER_URL } = process.env;

  axios.defaults.baseURL = `http://${REACT_APP_SERVER_URL}`;

  return (
    <Router history={hist}>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/auth" component={Auth} />
        <Route path="/rtl" component={RTL} />
        <Route path="/rtl" component={RTL} />
        <Redirect from="/" to="/auth/login-page" />
      </Switch>
    </Router>
  );
}

export default App;
