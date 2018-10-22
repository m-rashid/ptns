import React, { Component } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {firebase} from '../../firebase/firebase'

const HOST = "http://localhost:3000";
const INITIAL_STATE  = {
    employees: [],
    employeeFormModal: false,
    employeeData: null
}

export default class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: [],
            employeeFormModal: false,
            employeeData: this.props.userData,
            newId: "",
            newFirstName: "",
            newLastName: "",
            newRole: "",
            newEmail: "",
            newPassword: "",
            newStoreId: "",
            snackMessage: ""
        };
        this.handleNewEmployee = this.handleNewEmployee.bind(this);
        this.handleSnackbar = this.handleSnackbar.bind(this);
        this.handleFirstName  = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleId = this.handleId.bind(this);
        this.handleRole = this.handleRole.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleStoreId = this.handleStoreId.bind(this);
    }

    componentWillMount() {
        var storeId = this.state.employeeData.store_id;
        var url = HOST + `/stores/${storeId}/employees`;
        console.log(url);
        axios.get(url).then(response => {
          this.setState({ employees: response.data });
          console.log(response.data);
        });
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then((idToken) => {
            console.log(idToken);
            axios.get(HOST + `/auth/verifyUser`, {
                headers: {authauth: idToken}
            }).then(response => {
                console.log("response: ",response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    });
    }

    handleNewEmployee = e => {
        e.preventDefault();
        var newEmployee = {
            id: this.state.newId,
            first_name: this.state.newFirstName,
            last_name: this.state.newLastName,
            email: this.state.newEmail,
            password: this.state.newPassword,
            store_id: this.state.newStoreId,
            role: this.state.newRole
        };
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then((idToken) => {
            axios
            .post(HOST + `/employees`, newEmployee, {
                headers: {authauth: idToken}
            })
            .then(response => {
                console.log(response),
                this.setState({ snackMessage: response.data, employeeFormModal: false}),
                this.handleSnackbar()
            })
            .catch((err)=>{
                console.log(err),
                this.setState({snackMessage: err, employeeFormModal: false}),
                this.handleSnackbar()
            });

          });
    };

    handleFirstName = e => {
        this.setState({ newFirstName: e.target.value });
    };

    handleLastName = e => {
        this.setState({ newLastName: e.target.value });
    };

    handleId = e => {
        this.setState({ newId: e.target.value });
    };
    handleRole = e => {
        this.setState({ newRole: e.target.value });
    };
    handleEmail = e => {
        this.setState({ newEmail: e.target.value });
    };
    handlePassword = e => {
        this.setState({ newPassword: e.target.value });
    };

    handleStoreId = e => {
        this.setState({ newStoreId: e.target.value });
    }

    handleSnackbar = () => {
        var bar = document.getElementById("snackbar");
        bar.className = "show";
        setTimeout(function() {
          bar.className = bar.className.replace("show", "");
        }.bind(this), 3000);
      };

    render() {
        var {snackMessage} = this.state;
        var renderEmployees = () => {
            return this.state.employees.map(employee => {
                return <ListItem primaryText={employee.first_name+" "+employee.last_name} key={employee.id}/>
            })
        };
        
        return (
            <div>>
                <div class="container">
                    
                    <div className="text-center">
                        <h2>
                        {this.state.employeeData.first_name}  {this.state.employeeData.last_name}
                        </h2>
                        <h3>
                            Store  {this.state.employeeData.store_id}
                        </h3>
                        <a
                        class="btn btn-success pull-left"
                        onClick={() => this.setState({ employeeFormModal: true })}
                        >
                        <i class="glyphicon glyphicon-plus" /> Add New Employee
                        </a>
                        <MuiThemeProvider>
                            <List style={{maxHeight: '15%', maxWidth: '25%', overflow: 'auto'}}>
                                <Subheader>Employees</Subheader>
                                {renderEmployees()}
                            </List>
                            
                        </MuiThemeProvider>
                    </div>
                </div>
                <Modal show={this.state.employeeFormModal}>
                <Modal.Header>
                    <Modal.Title>Add Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form class="form-horizontal" name="newEmployeeForm">
                    <div class="form-group">
                        <label class="col-md-4 control-label" for="id">
                        Id
                        </label>
                        <div class="col-md-4">
                        <input
                            id="id"
                            name="id"
                            placeholder="Employee Id"
                            class="form-control"
                            onChange={this.handleId}
                        />
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label" for="firstName">
                        First name
                        </label>
                        <div class="col-md-4">
                        <input
                            id="firstName"
                            name="firstName"
                            placeholder="First name"
                            class="form-control"
                            onChange={this.handleFirstName}
                        />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 control-label" for="lastName">
                        Last name
                        </label>
                        <div class="col-md-4">
                        <input
                            name="lastName"
                            placeholder="Last name"
                            class="form-control"
                            onChange={this.handleLastName}
                        />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 control-label" for="storeId">
                        Store Id
                        </label>
                        <div class="col-md-4">
                        <input
                            name="storeId"
                            placeholder="Store Id"
                            class="form-control"
                            onChange={this.handleStoreId}
                        />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 control-label" for="role">
                        Role
                        </label>
                        <div class="col-md-4">
                        <input
                            name="role"
                            placeholder="Role"
                            onChange={this.handleRole}
                            class="form-control"
                        />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 control-label" for="email">
                        Email
                        </label>
                        <div class="col-md-4">
                        <input
                            name="email"
                            placeholder="email address"
                            onChange={this.handleEmail}
                            class="form-control"
                        />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 control-label" for="password">
                        Password
                        </label>
                        <div class="col-md-4">
                        <input
                            name="password"
                            type="password"
                            placeholder="password"
                            onChange={this.handlePassword}
                            class="form-control"
                        />
                        </div>
                    </div>

                    <br /> <br /> <br />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.setState({ employeeFormModal: false })}>
                    Close
                    </Button>
                    <Button onClick={this.handleNewEmployee}>Submit</Button>
                </Modal.Footer>
                </Modal>
                <div id="snackbar">{snackMessage}</div>
            </div>

        );
    }
}




