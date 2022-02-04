import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';
import { Box, Button, Card, CardActionArea, Container, Grid, Paper, TextField, ThemeProvider, Typography, Slide } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const mapStateToProps = state => ({
  seenBirds: state.birds.seenBirds,
  localBirds: state.birds.localBirds,
  testSeenBirds: state.responses.testSeenBirds,
  testLocalBirds: state.responses.testLocalBirds,
});

const mapDispatchToProps = dispatch => ({
  getBirds: (locInfo) => dispatch(actions.getBirds(locInfo)),
  newSeenBird: (bird) => dispatch(actions.newSeenBird(bird)),
  updateLocationActionCreator: (payload) => dispatch(actions.updateLocationActionCreator(payload)),
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

class UserStats extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(loc => {

      const lat =  String(Math.floor(loc.coords.latitude * 100) / 100);
      const long = String(Math.floor(loc.coords.longitude * 100) / 100);
      const locInfo = { lat, long };

      this.props.updateLocationActionCreator(locInfo);
      this.props.getBirds();
    });
  }

  render() {
    const display = [];
    if (this.props.localBirds instanceof Array) {
      const totalSeenBirds = this.props.seenBirds.length;
      const totalBirdsInArea = this.props.localBirds.length;

      const seenBirdNames = this.props.seenBirds.reduce((acc, curr) => {
          if ('sciName' in curr) curr.sciName = curr.sciName.split('_').join(' ');
          acc[curr.sciName] = true;
          return acc;
        }, {});

      let seenBirdsInThisArea = 0;
      console.log('local birds arrays?', this.props.localBirds)
      console.log('seen birds arrays?', this.props.seenBirds)

      this.props.localBirds.forEach((bird, i) => {
        let seen = 'Has not been seen.';
        console.log('local bird:', bird.sciName);
        console.log(bird);
        console.log(seenBirdNames);
        // const birdSeen = bird.sciName in seenBirdNames;
        if (seenBirdNames[bird.sciName]) {
          console.log('seen bird name', bird.sciName);
          seenBirdsInThisArea++;
          seen = 'Has been seen.';
          display.push(
            <Card sx={{ my: .25, bgcolor: "#fff9ee" }}>
              <Typography variant="h6" className="bird-info" key={`cM${i}`} sx={{ textAlign: "center", mt: .5, mb: -.3, fontWeight: "bold"}}>{bird.comName}</Typography>
              <Typography variant="body1" key={`cS${i}`} sx={{ textAlign: "center", fontStyle: "italic", mb: .3, }}>{bird.sciName}</Typography>
              <Button key={`key${i}`} fullWidth>
                SEEN
              </Button>
            </Card>
          );
        } else {
          display.push(
            <Card sx={{ my: .25, bgcolor: "#fff9ee" }}>
                <Typography variant="h6" className="bird-info" key={`cM${i}`} sx={{ textAlign: "center", mt: .5, mb: -.3, fontWeight: "bold"}}>{bird.comName}</Typography>
                <Typography variant="body1" key={`cS${i}`} sx={{ textAlign: "center", fontStyle: "italic", mb: .3, }}>{bird.sciName}</Typography>
                <Button key={`key${i}`} onClick={e => { console.log(e.target.innerText = "SEEN"); this.props.newSeenBird(bird.sciName) }} fullWidth>
                  Mark as seen
                </Button>
            </Card>
          );
        }
      });
    } //else display.push(<h1 key="oops">Error with localBirds</h1>);

    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {display}
        </Box>
      </ThemeProvider>
    );
  
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserStats);
