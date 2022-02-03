import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommunitySightings from '../components/CommunitySitings.jsx';
import FriendSightings from '../components/FriendSitings.jsx';
import * as actions from '../actions/actions.js';

const mapDispatchToProps = dispatch => ({
  changePageActionCreator: payload => dispatch(actions.changePageActionCreator(payload)),
  // changeToProfilePageActionCreator: () => dispatch(actions.changeToProfilePageActionCreator()), // replaced by the one above
});

class CommunityContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="component-container">
        {/* <button key='pB' onClick={() => this.props.changePageActionCreator('profile')}>Profile</button> */}
        <h1>Community Sightings</h1>
        <CommunitySightings />
        <h1 className="friend-sighting-heading">Friend Sightings</h1>
        <FriendSightings />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(CommunityContainer);
