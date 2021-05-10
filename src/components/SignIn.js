import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import { GoogleLogin } from "react-google-login";

import { loginUser } from "../services/user";

const styles = (theme) => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  heading: {
    marginBottom: theme.spacing(4),
  },
  subheading: {
    marginBottom: theme.spacing(1),
  },
  error: {
    color: "red",
    marginTop: theme.spacing(1),
  },
});

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: "" };
  }

  render() {
    const { classes } = this.props;
    const { error } = this.state;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" className={classes.heading}>
            Lightweight Email Campaigner
          </Typography>

          <Typography
            component="h1"
            variant="subtitle2"
            className={classes.subheading}
          >
            Please sign in to continue
          </Typography>

          <GoogleLogin
            clientId="748917549487-hoeukkchunsdntek65gepkdgs8nsgpio.apps.googleusercontent.com"
            isSignedIn={false}
            buttonText="Login"
            onSuccess={this.onSuccess}
            onFailure={this.onFailure}
          />

          {error ? (
            <Typography
              component="h1"
              variant="caption"
              className={classes.error}
            >
              {error}
            </Typography>
          ) : null}
        </Paper>
      </main>
    );
  }

  onSuccess = async (ga) => {
    const idToken = ga.getAuthResponse().id_token;
    try {
      await loginUser({ idToken });
    } catch (e) {
      return this.onFailure(e);
    }
    this.props.login();
  };

  onFailure = (err) =>
    this.setState({
      error: `Error during sign-in: ${
        err.message || err.details || err.error || err
      }`,
    });
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
};

SignIn.defaultProps = {
  onSuccess: () => {},
};

export default withStyles(styles)(SignIn);
