import React, { Component } from 'react';
import firebase, { auth, provider2 } from './config';
import Task from './Task'
import { GoogleLogin } from 'react-google-login-component';

export default class Google extends Component {
    state = {
        userID: '',
        name: '',
        isLoggedIn: false,
        User: null
    }


responseGoogle = response => {
    //console.log(Response);

    this.setState({
        isLoggedIn: true,
        userID: response.userID,
        name: response.name,
    });
};

componentClick = () => console.log("Click");

render() {
    let Content;
    if (this.state.isLoggedIn) {
        Content = (
            <div className='Task'>
                <Task />
            </div>
        );
    } else {
        Content = (<GoogleLogin socialId="989521686632-5rfcbd5uotioldnob6a67miaoqjip7fc.apps.googleusercontent.com"
            className="google-login"
            scope="profile"
            fetchBasicProfile={false}
            responseHandler={this.responseGoogle}
            onClick={this.componentClicked}
            buttonText="Login With Google" />)
    }

    return (
        <div>
            {Content}
        </div>

    );
}
}