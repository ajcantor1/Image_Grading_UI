import React, { Component } from 'react';
import Login from "./auth/Login";
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    handleLogoutClick(){
        this.props.handleLogout();
    }

    render(){
        return (
            <div>
                <Login/>
            </div>
        );
    }
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignUp: () => dispatch(actions.authCheckState())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);