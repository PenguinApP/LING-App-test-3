import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import Task from './Task'


export default class Facebook extends Component {
    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        picture: ''

    };
    responseFacebook = response => {
        //console.log(Response);

        this.setState({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            picture: response.picture.data.url
        });
    };

    componentClick = () => console.log("Click");

    render() {
        let fbContent;
        if (this.state.isLoggedIn) {
            fbContent = (
                <div>
                    <Task />
                </div>
            );
        } else {
            fbContent = (<FacebookLogin
                appId="802178246642253"
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />)
        }

        return (
            <div>
                {fbContent}
            </div>
        );
    }
}