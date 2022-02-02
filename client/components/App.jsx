import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import Navbar from './NavBar.jsx';
import CommunityContainer from '../containers/CommunityContainer.jsx';
import ProfileContainer from '../containers/ProfileContainer.jsx';

const mapStateToProps = state => ({ page: state.navigation.page });

const mapDispatchToProps = dispatch => ({
  resetFieldsActionCreator: () => dispatch(actions.resetFieldsActionCreator()),
  changePageActionCreator: payload => dispatch(actions.changePageActionCreator(payload)), // Replaces the four below it
  // changeToLoginPageActionCreator: () => dispatch(actions.changeToLoginPageActionCreator()),
  // changeToSignUpPageActionCreator: () => dispatch(actions.changeToSignUpPageActionCreator()),
  // changeToCommunityPageActionCreator: () => dispatch(actions.changeToCommunityPageActionCreator()),
  // changeToProfilePageActionCreator: () => dispatch(actions.changeToProfilePageActionCreator()),
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const display = [<h1 key="title">brdl</h1>];

    const display = [];

    if (this.props.page === 'signUp') {
      display.push(<SignUp key="su" />);
      // display.push(<h2 key='signUp'>Sign Up</h2>);
      // display.push(<button key='lB' onClick={this.props.changeToLoginPageActionCreator}>Have an account?</button>)
    } else if (this.props.page === 'login') {
      display.push(<Login />);
      // display.push(<h2 key='login'>Login</h2>);
      // display.push(<button key='sB' onClick={this.props.changeToSignUpPageActionCreator}>Need an account?</button>)
    } else if (this.props.page === 'community') display.push(<CommunityContainer />);
    else if (this.props.page === 'profile') display.push(<ProfileContainer />);

    return (
      <div>
        <Navbar
          // navigationActions={{
          //   changeToSignUpPageActionCreator: this.props.changeToSignUpPageActionCreator,
          //   changeToLoginPageActionCreator: this.props.changeToLoginPageActionCreator,
          //   changeToCommunityPageActionCreator: this.props.changeToCommunityPageActionCreator,
          //   changeToProfilePageActionCreator: this.props.changeToProfilePageActionCreator,
          // }}
          currPage={this.props.page}
          changePageActionCreator={this.props.changePageActionCreator}
          resetFieldsActionCreator={this.props.resetFieldsActionCreator}
        />
        {display}
        {/* <div className="dev">
          <button key="cB" onClick={this.props.changeToCommunityPageActionCreator}>
            Dev jump to community page
          </button>
          <button key="pB" onClick={() => this.props.changePageActionCreator('profile')}>
            Dev jump to profile page
          </button>
        </div> */}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
