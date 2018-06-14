import React, { Component } from 'react';
import firebase, { auth, provider, provider2 } from './config';
import './Task.css';
import logo from './Ling logo.png';

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: '',
            description: '',
            startDate: '',
            endDate: '',
            items: [],
            username: '',
            user: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const itemsRef = firebase.database().ref('item').orderByChild;
        const item = {
            taskName: this.state.taskName,
            description: this.state.description,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            user: this.state.user.displayName || this.state.user.email
        }
        itemsRef.push(item);
        this.setState({
            taskName: '',
            description: '',
            startDate: '',
            endDate: '',
        });
    }

    handleUpdate(itemId) {
        const itemRef = firebase.database().ref('item/' + itemId);
        const item = {
            taskName: this.state.taskName,
            description: this.state.description,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
        }
        itemRef.update(item);
        this.setState({
            taskName: '',
            description: '',
            startDate: '',
            endDate: ''
        });
    }

    removeItem(itemId) {
        const itemRef = firebase.database().ref('item/' + itemId);
        itemRef.remove();
    }

    replaceModalItem(item) {
        this.setState({
            requiredItem: item
        });
    }

    login = () => {
        var that = this;
        const result = auth.signInWithPopup(provider).then(function (result) {
            var user = result.user;
            console.log(user);
            that.setState({ user: user });
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    }
    login2 = () => {
        var that = this;
        const result = auth.signInWithPopup(provider2).then(function (result) {
            var user = result.user;
            console.log(user);
            that.setState({ user: user });
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    }

    logout = () => {
        var that = this;
        auth.signOut().then(function () {
            that.setState({ user: null });
        }).catch(function (error) {
        });
    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
        });
        const itemsRef = firebase.database().ref('item');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item,
                    taskName: items[item].taskName,
                    description: items[item].description,
                    startDate: items[item].startDate,
                    endDate: items[item].endDate,
                    user: items[item].user
                });
            }
            this.setState({
                items: newState
            });
        });
    }

    renderLoginButon() {
        if (this.state.user) {
            return (
                <div class="App-div.container">
                    <nav class="App-nav">
                        <section className="App-item">
                            <form onSubmit={this.handleSubmit}>
                                <p>&nbsp;Task Name : <input type="text" name="taskName" placeholder="Task Name*" onChange={this.handleChange} value={this.state.taskName} /></p>
                                <br /><br />
                                <p>&nbsp;Description : <input type="text" name="description" placeholder="Description" onChange={this.handleChange} value={this.state.description} /></p>
                                <br /><br />
                                <p>&nbsp;Start : <input type="date" name="startDate" onChange={this.handleChange} value={this.state.startDate} /></p>
                                <br /><br />
                                <p>&nbsp;End : <input type="date" name="endDate" onChange={this.handleChange} value={this.state.endDate} /></p>
                                <br /><br />
                                <button className="buttonSave">Save</button>
                            </form>
                            <button className="buttonLogout" onClick={this.logout}>Log Out</button>
                            <br /><br />
                            {this.state.items.map((item) => {
                                return (
                                    <form key={item.id}>
                                        {item.user === this.state.user.displayName || item.user === this.state.user.email ? <p>&nbsp;Task Name : {item.taskName} </p> : null}
                                        {item.user === this.state.user.displayName || item.user === this.state.user.email ? <p>&nbsp;Task Name : <input key={item.id} type="text" name="taskName" placeholder="Task Name" onChange={this.handleChange} value={this.state.taskName} /></p> : null}

                                        {item.user === this.state.user.displayName || item.user === this.state.user.email ? <p>&nbsp;Description : <input key={item.id} type="text" name="description" placeholder="Description" onChange={this.handleChange} value={this.state.description} /></p> : null}

                                        {item.user === this.state.user.displayName || item.user === this.state.user.email ? <p>&nbsp;Start : <input key={item.id} type="date" name="startDate" onChange={this.handleChange} value={this.state.startDate} /></p> : null}

                                        {item.user === this.state.user.displayName || item.user === this.state.user.email ? <p>&nbsp;End : <input key={item.id} type="date" name="endDate" onChange={this.handleChange} value={this.state.endDate} /></p> : null}
                                        {item.user === this.state.user.displayName || item.user === this.state.user.email ? <button onClick={() => this.handleUpdate(item.id)}>Update</button> : null}
                                    </form>
                                )
                            })}
                        </section>
                    </nav>
                    <section className="display-item">
                        <article className="App-article">
                            <br /><br />
                            <h1>LING Project</h1>
                            <p>User : {this.state.user.displayName}</p>
                            <br />
                            <table id="t01">
                                <tr>
                                    <th>Task Name</th>
                                    <th>Description</th>
                                    <th>Start</th>
                                    <th>End</th>
                                    <th>Edit / Delete</th>
                                </tr>
                                {this.state.items.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            {item.user === this.state.user.displayName || item.user === this.state.user.email ? <td>{item.taskName}</td> : null}
                                            {item.user === this.state.user.displayName || item.user === this.state.user.email ? <td>{item.description}</td> : null}
                                            {item.user === this.state.user.displayName || item.user === this.state.user.email ? <td>{item.startDate}</td> : null}
                                            {item.user === this.state.user.displayName || item.user === this.state.user.email ? <td>{item.endDate}</td> : null}
                                            {item.user === this.state.user.displayName || item.user === this.state.user.email ? <td><button onClick={() => this.Edit}>Edit</button><button onClick={() => this.removeItem(item.id)}>Delete</button></td> : null}
                                        </tr>
                                    )
                                })}
                            </table>
                        </article>
                    </section>
                </div>
            );
        } else {
            return (
                <div className="loading container wrapper">
                    <img src={logo} className="App-logo" alt="logo" />
                    <br />
                    <p class="sansserif">Log in</p>
                    <button className="loginBtn loginBtn--facebook" onClick={this.login}> Log in with Facebook</button>
                    <br /> <br />
                    <button className="loginBtn loginBtn--google" onClick={this.login2}>Log in with Google</button>
                </div>
            )
        }

    }

    render() {
        return (
            <div className="App">
                {this.renderLoginButon()}
            </div>

        );
    }
}

export default Task;