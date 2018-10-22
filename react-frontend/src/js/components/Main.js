import React from "react";
import { Switch, Route } from "react-router-dom";
import Inventory from "./Inventory";
import Pos from "./Pos";
import Transactions from "./Transactions";
import Login from "./Login";

const Main = ({ childProps }) => (
  <main>
    <Switch>
      <Route exact path="/" component={Pos} />
      <Route path="/login" exact component={Login} />
      <Route path="/inventory" component={Inventory} />
      <Route path="/transactions" component={Transactions} />
    </Switch>
  </main>
);

export default Main;
