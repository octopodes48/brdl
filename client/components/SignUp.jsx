import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';
import path from 'path';
// import birdies from '../../../assets/img/brdl-logo-6-a.png';
import { Button, Card, Container, Paper, TextField, ThemeProvider, Typography, Slide } from '@mui/material';
import { createTheme } from '@mui/material/styles';


const displayMessage = [];

const mapStateToProps = state => ({ validUser: state.textField.validUser });

const mapDispatchToProps = dispatch => ({
  handleAccountSubmit: (e) => dispatch(actions.handleAccountSubmit(e)),
  usernameChangeActionCreator: () => dispatch(actions.usernameChangeActionCreator(event)),
  passwordChangeActionCreator: () => dispatch(actions.passwordChangeActionCreator(event)),
  fullNameChangeActionCreator: () => dispatch(actions.fullNameChangeActionCreator(event)),
});

const theme = createTheme({
  spacing: 30,
  palette: {
    primary: {
      light: '#ffe082',
      main: '#f7bf5a',
      dark: '#ffc107',
      contrastText: '#000',
    },
    secondary: {
      light: '#ffffff',
      main: '#000000',
      dark: '#002884',
      contrastText: '#dda',
      // ffecb3
    },
  }
});

class SignUp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Paper className="signup-container" key="suc" elevation={ 3 } sx={{ bgcolor: "#fff9ee", border: theme.palette.primary.main }}>
          <Typography component="h1" variant="h5" align="center" sx={{ fontWeight: "bold" }}>
            New to brd watching?
          </Typography>
          <Typography component="h2" variant="h6" align="center" sx={{ mb: 1 }}>
            Create a brdl account and get started today!
          </Typography>
          <Container>
              <TextField
                fullWidth
                type="text"
                id="username"
                name="username"
                label="Username"
                margin="dense"
                variant="filled"
                onChange={this.props.usernameChangeActionCreator}
              />
              <TextField
                fullWidth
                type="password"
                id="password"
                name="password"
                label="Password"
                margin="dense"
                variant="filled"
                onChange={this.props.passwordChangeActionCreator}
              />
              <TextField
                fullWidth
                type="text"
                id="full-name"
                name="full-name"
                label="Full Name"
                margin="dense"
                variant="filled"
                onChange={this.props.fullNameChangeActionCreator}
              />
            <Button 
              fullWidth
              className="create-account-btn" 
              type="submit" 
              value="Create account" 
              variant='contained' 
              margin="normal" 
              sx={{ my: 1, py: .4 }} 
              onClick={e => this.props.handleAccountSubmit(e)}>
              Create account
            </Button>
            {this.props.validUser === false ?
              (<p className="validation-msg">Username is already taken</p>) :
              (<p className="hidden"></p>)
            }
          </Container>
        </Paper>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
