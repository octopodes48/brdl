import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';
import { Button, Card, CardActionArea, Container, Paper, TextField, ThemeProvider, Typography, Slide } from '@mui/material';
import { createTheme } from '@mui/material/styles';

class Friends extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let display = [];

    for (let i = 0; i < 5; i += 1) {
      display.push(
        <Card sx={{ my: .5 }}>
          <Typography variant="h6" className="bird-info" key={`fr${i}`} sx={{ textAlign: "center", mt: .5, mb: -.3, fontWeight: "bold"}}>Friend #{i}</Typography>
          {/* <Typography variant="body1" key={`cS${i}`} sx={{ textAlign: "center", fontStyle: "italic", mb: .3, }}>{bird.sciName}</Typography> */}
          <Container>
            <Typography key={`frs${i}`}>SEEN</Typography>
            <Typography key={`fri${i}`}>{i}</Typography>
          </Container>
        </Card>
      );
    }
    return(
      {display}
    );
  }
}
export default Friends;