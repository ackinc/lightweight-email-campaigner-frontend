import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import './App.css';

const CLIENT_ID = '748917549487-hoeukkchunsdntek65gepkdgs8nsgpio.apps.googleusercontent.com';

function responseGoogle(response) {
  console.log(response);
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </div>
    );
  }
}

export default App;
