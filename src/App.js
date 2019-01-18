import React, { Component } from 'react';
import './App.css';

import SignInComponent from './components/SignIn';
import HeaderComponent from './components/Header';
import DashboardComponent from './components/Dashboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  setLoggedIn = () => this.setState({ loggedIn: true })

  setLoggedOut = () => this.setState({ loggedIn: false })

  render() {
    const { loggedIn } = this.state;

    return (
      <div className="App">
        {!loggedIn ?
          <SignInComponent login={this.setLoggedIn} /> :
          <React.Fragment>
            <HeaderComponent logout={this.setLoggedOut} />
            <DashboardComponent />
          </React.Fragment>}
      </div>
    )
  }
}

export default App;
