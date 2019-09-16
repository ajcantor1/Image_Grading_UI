import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationDate => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationDate * 1000)
    }
}
var getUserInfo = function(token) {
    return new Promise(function(resolve, reject) {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
            "Content-Type": "application/json",
            "Authorization": token,
        };
     
        axios.post("http://localhost:8000/user/current_user/", {
        
        })
        .then(response => {
            console.log(JSON.stringify(response));
            localStorage.setItem('first_name', response.data.first_name);
            localStorage.setItem('last_name', response.data.last_name);
            resolve();
    
        })
        .catch(error => {
            console.log("error", error)
        });        
    })
}

export const authLogin = (email, password1) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://localhost:8000/rest-auth/login/',{
            email: email,
            password: password1
        })
        .then(response => {
            
            const token = response.data.key;
            
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        
            console.log(token);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            getUserInfo(token).then(() =>{

                dispatch(authSuccess(token));
         
                dispatch(checkAuthTimeout(3600))
            });

         
        })
        .catch(error => {
            console.log(error);
            dispatch(authFail(error));
        })
    }
} 

export const authSignup = (email, first_name, last_name, password, password_confirmation) => {
    return dispatch => {
        dispatch(authStart());
        axious.post('http://localhost:8000/rest-auth/registration/',{
            email: email,
            first_name: first_name,
            last_name: last_name,
            password1: password,
            password2: password_confirmation
        })
        .then(response => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() * 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
            
        })
        .catch(error => {
            dispatch(authFail(error));
        })
    }
} 

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()) {
                dispatch(logout());
            }
            else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()/1000)))
            }
        }
    }
}
