import React, { Component } from 'react';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            taskName: '',
            description: '',
            startDate: '',
            endDate: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            taskName: nextProps.taskName,
            description: nextProps.description,
            startDate: nextProps.startDate,
            endDate: nextProps.endDate
        });
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSave() {
        const itemId = this.state;
        this.props.handleUpdate(itemId)
    }

    render() {
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                                <div className="modal-body" key={item.id}>
                                    {item.user === this.state.user.displayName || item.user === this.state.user.email ? <p><span className="modal-lable">Task Name : </span><input value={this.state.taskName} onChange={(e) => this.handleChange(e)} /></p> : null}
                                    {item.user === this.state.user.displayName || item.user === this.state.user.email ? <p><span className="modal-lable">Description : </span><input value={this.state.description} onChange={(e) => this.handleChange(e)} /></p> : null}
                                    {item.user === this.state.user.displayName || item.user === this.state.user.email ? <p><span className="modal-lable">Start : </span><input value={this.state.startDate} onChange={(e) => this.handleChange(e)} /></p> : null}
                                    {item.user === this.state.user.displayName || item.user === this.state.user.email ? <p><span className="modal-lable">End : </span><input value={this.state.endDate} onChange={(e) => this.handleChange(e)} /></p> : null}
                                </div>
                            )
                        })}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { this.handleSave() }}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Edit;