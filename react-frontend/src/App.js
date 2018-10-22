import React, { Component } from "react";
import Main from "./js/components/Main";
import Login from "./js/components/Login";
import MySideNav from "./js/components/SideNav";
import MySideNav2 from "./js/components/SideNav2";
import axios from "axios";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGhost, faCalculator, faCogs, faChartLine } from '@fortawesome/free-solid-svg-icons'

library.add(faGhost, faCalculator, faCogs, faChartLine);

const HOST = "http://localhost:3000";
const firebase = require('firebase');
const styles = {
  contentHeaderMenuLink: {
    textDecoration: "none",
    color: "white",
    padding: 8
  },
  content: {
    padding: "16px"
  }
};
const axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Origin,Content-type,Accept,X-Access-Token,X-Key"
  }
};
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userData: null
    };
  }
  
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        console.log(this.state.user.uid);
        var url = HOST + `/employees/${this.state.user.uid}`;
        axios.get(url, axiosConfig).then(response => {
          console.log(response.data);
          this.setState({ userData: response.data })
        })
        .catch ((error) => console.log(error))
      } 
    });
  }

  updateState = (user) => {
    this.setState({user: user});
  }
  
  render() {
    return(
      
    <div>
    {this.state.user ? <MySideNav2 userData={this.state.userData}/> : <Login updateUser={this.updateState}/>}
    </div>   
    );
  }
} 
