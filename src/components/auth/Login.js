import React, { Component } from 'react';
import axios from 'axios';
import '../styles/login.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/auth';
import { withRouter } from 'react-router-dom';
import * as actionTypes from '../../store/actions/actionTypes';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            first_name: "",
            last_name: "",
            password: "",
            password_confirmation: "",
            errors: "",
            createAccount: false
        }

        this.handleChange = this.handleChange.bind(this);

        this.createAccountClick = this.createAccountClick.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.onLogin = this.onLogin.bind(this)
    }
    
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log("handle change", event);
    }


    onLogin(event){
        
     
        const {email, password} = this.state;
        this.props.onAuth(email, password);
        console.log(this.props);
        
    
      
        
    
        /*
        axios.post("http://localhost:3001/sessions", {
            user: {
                email: email,
                password: password
            }
        }, {withCredentials: true})
        .then(response => {
            console.log('hello');
            console.log("registration res", response);
            if(response.data.logged_in)
            {
                console.log("goolge");
                this.props.handleSuccessfulAuth(response.data);
            }
        })
        .catch(error => {
            console.log("registration error", error)
        });
        */
        event.preventDefault();

    }

    onRegister(event){
        const {email, first_name, last_name, password, password_confirmation} = this.state;
        this.props.onRegister(email, password, password_confirmation, first_name, last_name)
        /*
        axios.post("http://localhost:3001/registrations", {
            user: {
                email: email,
                first_name: first_name,
                last_name: last_name,
                password: password,
                password_confirmation: password_confirmation
            }
        }, {withCredentials: true})
        .then(response => {
            console.log("registration res", response);
            if(response.data.status === 'created')
            {
                this.props.handleSuccessfulAuth(response.data);
                this.setState({
                    createAccount: false,
                });
            }
        })
        .catch(error => {
            console.log("registration error", error)
        });
        */
        event.preventDefault();
    }

    createAccountClick(event){

  
        event.preventDefault();
        this.setState({
            createAccount: true,
        });
    }

    render(){
        return (
            <div id='login-form'>
                <form>
                    <input 
                    class="login-text-box"
                    type="email" 
                    name="email" 
                    placeholder = "Email"
                    value={this.state.email} 
                    onChange={this.handleChange} 
                    required 
                    />
                    { this.state.createAccount ? (
                        <div>
                            <input 
                            class="login-text-box"
                            type="text" 
                            name="first_name" 
                            placeholder = "First Name"
                            value={this.state.first_name} 
                            onChange={this.handleChange} 
                            required 
                            />

                            <input 
                            class="login-text-box"
                            type="text" 
                            name="last_name" 
                            placeholder = "Last Name"
                            value={this.state.last_name} 
                            onChange={this.handleChange} 
                            required 
                            />
                        </div>
                        ) : null}
                    <input 
                    class="login-text-box"
                    type="password" 
                    name="password" 
                    placeholder = "Password"
                    value={this.state.password} 
                    onChange={this.handleChange} 
                    required 
                    />

                    {this.state.createAccount ? (
                        <div>
                            <input 
                            class="login-text-box"
                            type="password" 
                            name="password_confirmation" 
                            placeholder = "Password confirmation"
                            value={this.state.password_confirmation} 
                            onChange={this.handleChange} 
                            required 
                            />
                            <button type="submit" class="login-text-box"  onClick={this.onRegister} value="register">Register</button>
                        </div>
                        
                    ) : (
                        <div>
                            
                            <button type="submit" class="login-text-box" onClick={this.onLogin} >Login</button>
                            <a class="login-text-box" onClick={this.createAccountClick}>Don't have an account, register</a>
                        </div>
                    )}

                 
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        loading: state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.authLogin(email, password)),
        onRegister: (email, password, password_confirmation, first_name, last_name) => dispatch(actions.authSignup(email, first_name, last_name, password, password_confirmation)) 
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));