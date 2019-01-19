import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { logoutUser } from '../services/user';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  hoverRight: {
    position: 'absolute',
    right: '40px',
  },
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Lightweight Email Campaigner
          </Typography>
          <Button color="inherit" onClick={handleLogoutBtnClick} className={classes.hoverRight}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );

  function handleLogoutBtnClick() {
    logoutUser();
    props.logout();
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func,
};

ButtonAppBar.defaultProps = {
  logout: () => { },
};

export default withStyles(styles)(ButtonAppBar);
