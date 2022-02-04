import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';
import { Button, Card, CardMedia, CardContent, CardHeader, CardActionArea, Container, Paper, TextField, ThemeProvider, Typography, Slide } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import BirdPhoto from '../../assets/img/hummingbird-720px.jpeg';

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

const mapStateToProps = state => ({
  leaderBoard: state.birds.leaderBoard
});

class BirdOfDay extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return(
      <ThemeProvider theme={theme}>
        <Card sx={{ mt: .25, mb: .5, ml: .5, bgcolor: "#fff9ee", width:"250px" }}>
          <CardMedia
            component="img"
            height="150"
            sx= {{ objectFit: "fit" }} // do you guys want to come together soon just to talk over what's going on in the code? sure - just finishing up a couple things - cool cool bring us back when you are ready - thumbs up!
            image={ BirdPhoto }
            alt="Allen's Hummingbird"
          />
          <Typography variant="h6" className="bird-info" key={`frh`} sx={{ textAlign: "center", mt: .5, mb: -.3, fontWeight: "bold"}}>Bird Of The Day</Typography>
          <Typography 
            variant="body1" 
            key="bod" 
            sx={{ textAlign: "center", mx: 'auto', mb: .5, }}>
            Allen's Hummingbird
          </Typography>
        </Card>
      </ThemeProvider>
    );
  }
}
export default connect(mapStateToProps, null)(BirdOfDay);