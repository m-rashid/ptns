import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../../Login.css";
import axios from "axios";
import { auth } from '../../firebase';
import { Redirect } from 'react-router-dom'

const HOST = "http://localhost:3000";
const INITIAL_STATE = {
  email: '',
  password: ''
};

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }



  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    auth.doSignInWithEmailAndPassword(this.state.email, this.state.password) 
      .then((user) => {
        this.setState({ ...INITIAL_STATE });
        this.props.updateUser(user);
        //this.props.history.push("/").bind(this);
        <Redirect to='/' />
      })
      .catch(err => {
        console.log(err),
        this.props.updateUser(null),
        alert(`Failed to sign in!`);
      });
    
    /* let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
            "Access-Control-Allow-Headers": "Origin,Content-type,Accept,X-Access-Token,X-Key"
        }
      };
      axios
        .post(HOST + `/auth/signin`, credentials, axiosConfig)
        .then(
          response =>
            alert(`Signed in! as ${response}`),
            //this.handleSnackbar(),
            this.props.history.push("/")
        )
        .catch(err => {
          console.log(err),
          alert(`Failed to sign in!`);
          //this.handleSnackbar();
        }); */
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
