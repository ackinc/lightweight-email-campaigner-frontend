import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  display: 'flex',
};

export default function HeaderComponent({ logout }) {
  return (
    <header style={styles}>
      <h1>Lightweight Email Campaigner</h1>
      <button type="button" onClick={logout}>Logout</button>
    </header>
  );
}

HeaderComponent.propTypes = {
  logout: PropTypes.func,
};

HeaderComponent.defaultProps = {
  logout: () => { },
};
