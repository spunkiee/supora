import React from "react";
import NavigationBar from "../components/NavigationBar";
import { BrowserRouter, Switch } from "react-router-dom";
import Home from "../components/Home";
import AboutUs from "../components/AboutUs";
import Contact from "../components/Contact";
import Support from "../components/Support";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Activate from "../components/Activate";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Forgot from "../components/Forgot";
import Dashboard from "../components/Dashboard";
import Reset from "../components/Reset";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationBar />
        <Switch>
          <PublicRoute exact path="/" component={Home} />
          <PublicRoute exact path="/about-us" component={AboutUs} />
          <PublicRoute exact path="/contact" component={Contact} />
          <PublicRoute exact path="/support" component={Support} />
          <PublicRoute restricted exact path="/signin" component={SignIn} />
          <PublicRoute restricted exact path="/signup" component={SignUp} />
          <PublicRoute
            restricted
            path="auth/activate/:token"
            exact
            component={Activate}
          />
          <PublicRoute
            restricted
            path="/auth/password/forgot"
            exact
            component={Forgot}
          />
          <PublicRoute
            restricted
            path="/auth/password/reset/:token"
            exact
            component={Reset}
          />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
