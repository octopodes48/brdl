import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

const mapStateToProps = state => ({
  mode: state.responses.mode,
  testMessages: state.responses.testMessages,
  communityMessages: state.messages.communityMessages,
});

const mapDispatchToProps = dispatch => ({
  updateCommunityMessagesActionCreator: payload =>
    dispatch(actions.updateCommunityMessagesActionCreator(payload)),
});

class CommunitySitings extends Component {
  constructor(props) {
    super(props);

    this.getCommunityMessages = this.getCommunityMessages.bind(this);
  }

  getCommunityMessages() {
    const url = `http://localhost:3000/community/?username=${this.props.username}&location=${this.props.location}`;

    if (this.props.mode === 'dev')
      this.props.updateCommunityMessagesActionCreator(this.props.testMessages);
    else if (this.props.mode === 'prod') {
      fetch(url, {
        method: 'GET',
        header: { 'Access-Control-Allow-Origin': ' * ', 'Content-Type': 'application/json' },
      })
        .then(data => data.json())
        .then(data => this.props.updateCommunityMessagesActionCreator(data.messages))
        .catch(err => console.log(err));
    } else console.log('Mode must be prod or dev in ./client/reducers/responsesReducer.js');
  }

  componentDidMount() {
    this.getCommunityMessages();
  }

  render() {
    const display = [];
    if (this.props.communityMessages instanceof Array) {
      if (this.props.communityMessages.length === 0)
        display.push(<h2 key="noMess">No community messages available at this time.</h2>);
      else {
        this.props.communityMessages.forEach((mess, ind) => {
          display.push(
            <div className="bird-row">
              <p
                className="bird-info"
                key={`cM${ind}`}
              >{`${mess.username} saw a ${mess.sciBirdName} in ${mess.location.area} around ${mess.timeStamp}`}</p>
            </div>
          );
        });
      }
    } else display.push(<h1 key="oops">Error with communityMessages</h1>);

    return (
      <div key="cMD" className="component-sub-container">
        {display}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunitySitings);
