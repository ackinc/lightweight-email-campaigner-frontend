import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
    };
  }

  render() {
    const { user } = this.state;
    return (
      <div>{user}</div>
    );
  }
}

export default App;
