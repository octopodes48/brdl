// import path from 'path';
import React, { Component } from 'react';

import LogoIcon from '../../assets/img/brdl-logo-2-b.png';
import LogoText from '../../assets/img/brdl-logo-2-c.png';
import * as actions from '../actions/actions.js';
import { AppBar, Box, Button, Grid, Link, ThemeProvider, Toolbar } from '@mui/material' 
import { flexbox } from '@mui/system';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  spacing: 30,
  palette: {
    primary: {
      light: '#fff3e0',
      main: '#f7bf5a',
      dark: '#000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff9ee',
      main: '#000000',
      dark: '#fff',
      contrastText: '#dda',
    }
  }
});

const mapStateToProps = state => ({});

const mapStateToDispatch = dispatch => ({});

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const display = [];

    if (this.props.currPage === 'signUp' || this.props.currPage === 'login') {
      display.push(
        <Grid sx={{ alignItems: 'center' }}>
          <Button
            onClick={() => { this.props.resetFieldsActionCreator(); this.props.changePageActionCreator('login'); }}
            sx={{ bgcolor: theme.palette.primary.main, color:theme.palette.primary.dark, mx: .5 }}
            variant="outlined">
            Login
          </Button>
          <Button
            onClick={() => { this.props.resetFieldsActionCreator(); this.props.changePageActionCreator('signUp'); }}
            sx={{ color: theme.palette.primary.dark }}
            variant="outlined"> 
            Sign Up
          </Button>
        </Grid>
      );
    } else {
      display.push(
        <Grid sx={{ alignItems: 'center' }}>
          <Button 
            onClick={() => this.props.changePageActionCreator('community')} 
            sx={{ color: theme.palette.primary.dark, mx: .5 }} variant="text">
            Community
          </Button>
          <Button 
            onClick={() => this.props.changePageActionCreator('profile')} 
            sx={{ color: theme.palette.primary.dark }} 
            variant="text">
            Dashboard
          </Button>
        </Grid>
        /* <a href="#">Settings</a>
        <a href="#">About</a> */
      );
    }
    return (
      <ThemeProvider theme={theme}>
        <AppBar className="nav-bar-container" key="nv">
          <Toolbar className="nav-logo-container" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>  
            <Box
              component="img"
              onClick={() => this.props.changePageActionCreator('profile')}
              src={ LogoIcon }
              sx={{ height: 60, width: 'auto' }}
            />
            {display}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    );
  }
}

export default NavBar;
