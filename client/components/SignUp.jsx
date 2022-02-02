import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';
import path from 'path';
// import birdies from '../../../assets/img/brdl-logo-6-a.png';

const displayMessage = [];

const mapStateToProps = state => ({ validUser: state.textField.validUser });

const mapDispatchToProps = dispatch => ({
  handleAccountSubmit: (e) => dispatch(actions.handleAccountSubmit(e)),
  usernameChangeActionCreator: () => dispatch(actions.usernameChangeActionCreator(event)),
  passwordChangeActionCreator: () => dispatch(actions.passwordChangeActionCreator(event)),
  fullNameChangeActionCreator: () => dispatch(actions.fullNameChangeActionCreator(event)),
});

class SignUp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="signup-container" key="suc">
        <header>
          <h1>New to brd watching?</h1>
          <p>Create a brdl account and get started today!</p>
        </header>

        <form action="" onSubmit={e => this.props.handleAccountSubmit(e)}>
          <label htmlFor="username">
            <p>Create a username:</p>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="enter username"
              onChange={this.props.usernameChangeActionCreator} // could this be removed?
            />
          </label>
          <label htmlFor="password">
            <p>Create a password:</p>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="enter password"
              onChange={this.props.passwordChangeActionCreator}
            />
          </label>
          <label htmlFor="full-name">
            <p>Full Name:</p>
            <input
              type="text"
              id="full-name"
              name="full-name"
              placeholder="enter full name"
              onChange={this.props.fullNameChangeActionCreator}
            />
          </label>
          <button className="create-account-btn" type="submit" value="Create account">
            Create account
          </button>
          {this.props.validUser === false ?
            (<p className="validation-msg">Username is already taken</p>) :
            (<p className="hidden"></p>)
          }
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
