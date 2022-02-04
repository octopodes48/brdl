import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';
import { Button, Box, Card, Container, Paper, TextField, ThemeProvider, Typography, Slide } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import LeaderBoard from '../components/LeaderBoard.jsx';
import BirdOfDay from '../components/BirdOfDay.jsx';

const mapStateToProps = state => ({ validLogin: state.textField.validLogin });

const mapDispatchToProps = dispatch => ({
  handleAccountLogin: (e) => dispatch(actions.handleAccountLogin(e)),
  usernameChangeActionCreator: () => dispatch(actions.usernameChangeActionCreator(event)),
  passwordChangeActionCreator: () => dispatch(actions.passwordChangeActionCreator(event)),
});

const theme = createTheme({
  spacing: 30,
  palette: {
    primary: {
      light: '#ffe082',
      main: '#f7bf5a',
      dark: '#fff',
      contrastText: '#000',
    },
    secondary: {
      light: '#757ce8',
      main: '#000000',
      dark: '#002884',
      contrastText: '#dda',
    },
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", flexGrow: 6}}>
          <Paper className="login-container" key="suc" elevation={3} sx={{ bgcolor: "#fff9ee" }}>
            <Typography component="h1" variant="h5" align="center" sx={{ fontWeight: 'bold' }}>
              Already have an account?
            </Typography>
            <Typography component="h2" variant="h6" align="center" sx={{ mb: 1 }}>
              Sign in and get brdling
            </Typography>
            <Container>
              <TextField
                  fullWidth
                  type="text"
                  id="username"
                  name="username"
                  placeholder="enter username"
                  onChange={this.props.usernameChangeActionCreator}
                  label="Username"
                  margin="dense"
                  variant="filled"
                />
                <TextField
                  fullWidth
                  type="password"
                  id="password"
                  name="password"
                  placeholder="enter password"
                  onChange={this.props.passwordChangeActionCreator}
                  label="Password"
                  margin="dense"
                  variant="filled"
                  />
                <Button className="login-btn" type="submit" value="Create account" onClick={(e) => {this.props.handleAccountLogin(e)}} variant='contained' margin="normal" sx={{my: 1, py: .4}} fullWidth>
                  Get brdlng
                </Button>
              {this.props.validLogin === false ?
                (<p className="validation-msg">Invalid username or password</p>) :
                (<p className="hidden"></p>)
              }
            </Container>
          </Paper>
          <Box sx={{ mt: 1, mx: "auto", display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "flex-start" }}>
            <Box >
              <BirdOfDay />
            </Box>
            <Box sx={{ flexShrink: 2 }}>
              <LeaderBoard />
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
}// yo what are you guys up to?


export default connect(mapStateToProps, mapDispatchToProps)(Login);
