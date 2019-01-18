import React from 'react';
import { GoogleLogin } from 'react-google-login';
import PropTypes from 'prop-types';

export default function LoginComponent({ onSuccess, onFailure }) {
  return (
    <div className="login">
      <h1>Please sign in to continue</h1>
      <GoogleLogin
        clientId="748917549487-hoeukkchunsdntek65gepkdgs8nsgpio.apps.googleusercontent.com"
        isSignedIn={false}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
}

LoginComponent.propTypes = {
  onSuccess: PropTypes.func,
  onFailure: PropTypes.func,
};

LoginComponent.defaultProps = {
  onSuccess: () => { },
  onFailure: () => { },
};
