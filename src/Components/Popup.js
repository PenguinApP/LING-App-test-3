import React, { Component } from 'react';
import Popup from "reactjs-popup";
import './Popup.css'
import firebase, { auth, provider, provider2 } from './config';

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: '',
            description: '',
            startDate: '',
            endDate: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSave() {
        const items = this.state;
        this.props.handleUpdate(items)
    }

    render() {
        return (
            <Popup trigger={<button className="button"> Edit </button>} modal>
                {close => (
                    <div className="modal">
                        <a className="close" onClick={close}>
                            &times;
        </a>
                        <div className="header"> Edit </div>
                        <div className="content">
                            <p>&nbsp;Task Name : <input type="text" name="taskName" onChange={this.handleChange} value={this.state.taskName} /></p>
                            <br /><br />
                            <p>&nbsp;Description : <input type="text" name="description" onChange={this.handleChange} value={this.state.description} /></p>
                            <br /><br />
                            <p>&nbsp;Start : <input type="date" name="startDate" onChange={this.handleChange} value={this.state.startDate} /></p>
                            <br /><br />
                            <p>&nbsp;End : <input type="date" name="endDate" onChange={this.handleChange} value={this.state.endDate} /></p>
                            <br /><br />
                        </div>
                        <div className="actions">
                            <button className="button" onClick={() => this.handleSave()}> Update </button>
                            <button
                                className="button"
                                onClick={() => {
                                    console.log('modal closed ')
                                    close()
                                }}
                            >
                                Cancel
          </button>
                        </div>
                    </div>
                )}
            </Popup>
        );
    }

}
export default Task;