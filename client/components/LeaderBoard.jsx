import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';
import { Box, Button, Card, CardContent, CardHeader, CardActionArea, Container, Paper, TextField, ThemeProvider, Typography, Slide } from '@mui/material';
import { createTheme } from '@mui/material/styles';

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

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const display = [];
    console.log('leaderboard', this.props.leaderBoard);

    for (let i = 0; i < this.props.leaderBoard.length; i += 1) {
      display.push(
        <Box sx={{display: "flex", justifyContent: "start"}}>
          <Typography 
            variant="body1" 
            key={`frs${i}`} 
            sx={{ textAlign: "left" }}>
            {i + 1}. {this.props.leaderBoard[i].username}: {this.props.leaderBoard[i].seen} birds
          </Typography>
          {/* <Typography 
            variant="body1" 
            key={`frt${i}`} 
            sx={{ textAlign: "left", }}>
            {this.props.leaderBoard[i].seen} birds
          </Typography> */}
        </Box>
      );
    }
    console.log('display', display);
    return(
      <ThemeProvider theme={theme}>
        <Card sx={{ mt: .25, ml:.5, p: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", bgcolor: "#fff9ee", width:"250px", minHeight: "243px" }}>
          <Typography 
            variant="h6" 
            className="bird-info" 
            key={`frh`} 
            sx={{ textAlign: "center", mb: .3, fontWeight: "bold"}}>
            Leader Board
          </Typography>
          {display}
        </Card>
      </ThemeProvider>
    );
  }
}
export default connect(mapStateToProps, null)(LeaderBoard);