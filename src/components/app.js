import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard'
import axios from 'axios';

export default class App extends Component {
  constructor(){
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
 
  }

  checkedLoginStatus() {
    axios.get("http://localhost:3001/logged_in", {withCredentials: true})
    .then(response => {
      console.log("logged in?", response);
      if(response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN"){
        
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: response.data.user
        });
      } else if(!response.data.logged_in && this.state.loggedInStatus == "LOGGED_IN"){
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
        });       
      }
      
    })
    .catch(error => {
      console.log("check login error", error)
    });
  }

  componentDidMount() {
  
    this.checkedLoginStatus();
  }

  handleLogout(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    });
  }

  handleLogin(data){
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    });
  }
  
  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <Switch>
            <Route 
            exact path={"/"}
            render={props => (
              <Home {...props} 
              handleLogin={this.handleLogin} 
              handleLogout={this.handleLogout}
              loggedInStatus={this.state.loggedInStatus}/>
            )}
            />
            <Route 
            exact path={"/Dashboard"} 
            render={props => (
              <Dashboard {...props} params={this.state}/>
            )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
