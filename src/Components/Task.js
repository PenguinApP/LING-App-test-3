import React, { Component } from 'react';
import firebase, { auth, provider } from './config';
import './Task.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            taskName: '',
            description: '',
            startDate: '',
            endDate: '',
            items: [],
            user: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.login = this.login.bind(this); // <-- add this line
        this.logout = this.logout.bind(this); // <-- add this line
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        const itemsRef = firebase.database().ref(this.state.user.displayName);
        const item = {
            taskName: this.state.taskName,
            description: this.state.description,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        }
        itemsRef.push(item);
        this.setState({
            taskName: '',
            description: '',
            startDate: '',
            endDate: ''
        });
    }

    logout() {
        auth.signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            });
    }
    login() {
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.setState({
                    user
                });
            });
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
        });
        const itemsRef = firebase.database().ref('Panatpong Lertpattanachat');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item,
                    taskName: items[item].taskName,
                    description: items[item].description,
                    startDate: items[item].startDate,
                    endDate: items[item].endDate
                });
            }
            this.setState({
                items: newState
            });
        });
    }

    render() {
        return (

            <div class="App-div.container">
                <nav class="App-nav">
                    <div className="App">
                        {this.state.user ?
                            <button onClick={this.logout}>Log Out</button>
                            :
                            <button onClick={this.login}>Log In</button>
                        }
                        <section className="App-item">
                            <form onSubmit={this.handleSubmit}>
                                <br /><br />
                                <p>&nbsp;Task Name : <input type="text" name="taskName" placeholder="Task Name*" onChange={this.handleChange} value={this.state.taskName} /></p>
                                <br /><br />
                                <p>&nbsp;Description : <input type="text" name="description" placeholder="Description" onChange={this.handleChange} value={this.state.description} /></p>
                                <br /><br />
                                <p>&nbsp;Start : <input type="date" name="startDate" onChange={this.handleChange} value={this.state.startDate} /></p>
                                <br /><br />
                                <p>&nbsp;End : <input type="date" name="endDate" onChange={this.handleChange} value={this.state.endDate} /></p>
                                <br /><br />
                                <button>Save</button>
                            </form>
                            <form>
                                <button>Cancel</button>
                            </form>
                        </section>
                    </div>
                </nav>
                <section className="display-item">
                    <article className="App-article">
                        <br /><br /><br />
                        <h1>LING Project</h1>
                        <br />
                        <table id="t01">
                            <tr>
                                <th>Task Name</th>
                                <th>Description</th>
                                <th>Start</th>
                                <th>End</th>
                            </tr>
                            {this.state.items.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.taskName}</td>
                                        <td>{item.description}</td>
                                        <td>{item.startDate}</td>
                                        <td>{item.endDate}</td>
                                    </tr>
                                )
                            })}
                        </table>
                    </article>
                </section>
            </div>
        );
    }
}

export default App;