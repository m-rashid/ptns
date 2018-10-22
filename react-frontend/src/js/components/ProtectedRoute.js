import React, {Component} from "react";
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import Unauthorized from './Unauthorized';

export default class ProtectedRoute extends Component {
    render() {
      const { component: Component, ...props } = this.props
  
      return (
        <Route 
          {...props} 
          render={props => (
            this.props.userData.role === "manager" ?
              <Component {...props} /> :
              <Unauthorized/>
          )} 
        />
      )
    }
  }