import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Inventory from "./Inventory";
import Login from "./Login";
import Pos from "./Pos";
import Admin from "./Admin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProtectedRoute from "./ProtectedRoute";

import './react-sidenav.css';

export default class MySideNav2  extends React.Component {
    render() {
        return (
            <Router>
    <Route render={({ location, history }) => (
        <React.Fragment>
            <SideNav
                onSelect={(selected) => {
                    const to = '/' + selected;
                    if (location.pathname !== to) {
                        history.push(to);
                    }
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="">
                    <NavItem eventKey="">
                        <NavIcon>
                        <FontAwesomeIcon icon="chart-line" size="2x" />
                        </NavIcon>
                        <NavText style={{ fontSize: '1.25em' }}>
                            Dashboard
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="pos">
                        <NavIcon>
                        <FontAwesomeIcon icon="calculator" size="2x" />
                        </NavIcon>
                        <NavText style={{ fontSize: '1.25em' }}>
                            PoS
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="admin">
                        <NavIcon>
                        <FontAwesomeIcon icon="cogs" size="2x" />
                        </NavIcon>
                        <NavText style={{ fontSize: '1.25em' }}>
                            Admin
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
            <main>
                <Route path="/" exact component={props => <Inventory />} />
                <Route path="/pos" component={props => <Pos />} />
                <ProtectedRoute path="/admin" userData={this.props.userData} component={props => <Admin userData={this.props.userData}/>} />
            </main>
        </React.Fragment>
    )}
    />
</Router>
        
        )
    }
}