import React, { Component } from 'react';
import './App.css';

import HeaderComponent from './components/Header';
import LoginComponent from './components/Login';
import DashboardComponent from './components/Dashboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  render() {
    const { loggedIn } = this.state;

    if (!loggedIn) return <LoginComponent />;

    return (
      <React.Fragment>
        <HeaderComponent />
        <DashboardComponent />
      </React.Fragment>
    );
  }
}

export default App;
