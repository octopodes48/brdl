import { Box, Container, Grid, Typography } from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';
import UserStats from '../components/userStats.jsx';
import LeaderBoard from '../components/LeaderBoard.jsx';
import BirdOfDay from '../components/BirdOfDay.jsx';

const mapStateToProps = state => ({
  fullName: state.textField.fullName,
  userName: state.textField.userName,
  seenBirds: state.birds.seenBirds,
  localBirds: state.birds.localBirds,
});

const mapDispatchTopProps = dispatch => ({
  changePageActionCreator: payload => dispatch(actions.changePageActionCreator(payload)),
  getLeaders: () => dispatch(actions.getLeaders()),
  // changeToCommunityPageActionCreator: () => dispatch(actions.changeToCommunityPageActionCreator()), // Replaced by the one above it
});

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    const totalSeenBirds = this.props.seenBirds.length;
    const totalBirdsInArea = this.props.localBirds.length;

    let seenBirdsInThisArea = 0; 

    const seenBirdNames = this.props.seenBirds.reduce((acc, curr) => {
      if ('sciName' in curr) curr.sciName = curr.sciName.split('_').join(' ');
      acc[curr.sciName] = true;
      return acc;
    }, {});

    this.props.localBirds.forEach((bird, i) => {
      if (seenBirdNames[bird.sciName]) seenBirdsInThisArea++;
    });

    return (
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "stretch", mt: 12, mx: 30 }}>
        {/* <button key='cB' onClick={() => this.props.changePageActionCreator('community')}>Community</button> */}
        <Typography variant="h3" className="profile-header">Hello, {this.props.fullName}</Typography>
        <Typography className="seen-birds-header" key="h2US">
          {`You have seen ${totalSeenBirds}.\nYou have seen ${seenBirdsInThisArea} out of ${totalBirdsInArea} in the area`}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "start" }}>
          <Box sx={{flexGrow: 3 }}>
            <UserStats />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", flexGrow: 1 }}>
            <BirdOfDay />
            <LeaderBoard />
          </Box>
        </Box>
      </Box>
    );
  }
}

export default connect(mapStateToProps, mapDispatchTopProps)(ProfileContainer);
