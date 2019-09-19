
import React, {Component} from 'react';
import axios from 'axios';

export default function Authorization(HocComponent){
    
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token'),
    };

    return class extends Component{
        render(){
            return (
                <div>
                    <HocComponent {...this.props }></HocComponent>
                </div>

            );
        }
    } 
}