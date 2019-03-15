import * as React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, RouteProps } from "react-router-dom";
import { Header } from "../components/header/Header";
import MovieModal from "../components/main/about-modal/MovieModal";
import Posters from "../components/main/posters/Posters";
import FavouriteList from "../components/main/favourites/FavouriteList";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <WithHeaderRoute exact path="/" component={Posters} />
          <WithHeaderRoute path="/favourites" component={FavouriteList} />
          <WithHeaderRoute path="/:id" component={MovieModal} />
        </Switch>
      </div>
    </Router>
  );
};

const WithHeaderRoute = ({ component: Component, ...rest }: RouteProps) => {
  return (
    <Route
      {...rest}
      render={props => (
        <div>
          <Header />
          <Component {...props} />
        </div>
      )}
    />
  );
};

export default App;
