import React, { Component } from 'react';
import Task from './Components/Task';
import Facebook from './Components/Facebook';
import Google from './Components/Google';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Task/>
      </div>
    );
  }
}

export default App;
