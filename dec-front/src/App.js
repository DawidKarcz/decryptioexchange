// Importing needed liabries
import React from "react";
import "antd/dist/antd.css";
import { Redirect, Route,Switch} from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Watchlist from "./pages/Watchlist";
import AboutPage from "./pages/AboutPage";
import Markets from "./pages/Markets";
import Register from "./pages/Register";
import HomeCoinInfo from "./pages/HomeCoinInfo";
import MarketCoinInfo from "./pages/MarketCoinInfo";
import StartingPage from "./pages/StartingPage"
import Education from "./pages/Education";

function App()  {
  
  return (
    <div className="App">
    
      <Router>
      <Switch>
        <Route path="/" exact component={StartingPage} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
     
        <ProtectedRoute path="/home" exact component={Home} />
        <ProtectedRoute path="/watchlist" exact component={Watchlist} />
        <ProtectedRoute path="/about" exact component={AboutPage} />
        <ProtectedRoute path="/market" exact component={Markets} />
        <ProtectedRoute path="/education" exact component={Education} />
        <ProtectedRoute path="/:coin" exact component={HomeCoinInfo} />
        <ProtectedRoute path="/crypto/:coinId" exact component={MarketCoinInfo} />

        </Switch>
      </Router>
    </div>
  );
};

export default App;

// Creating a function ProtectedRoute which uses the props from the constructor DefeaultLayout React components
// and authorized the user to view certian things on the application only when he is authorized to do so and that is getting done
// when the user successfully logs into the web application
// if the user doesn't log into the application he isn't able to view any other route than login route and register route
// if the user tries to enter a route that's protected he would be redirected back to the login screen
export function ProtectedRoute(prop) {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Redirect to="/" />;
  } else {
   return <Route {...prop} />;
  } 
}