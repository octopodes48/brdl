import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';
import path from 'path';
// import birdies from '../../../assets/img/brdl-logo-6-a.png';

const displayMessage = [];

const mapStateToProps = state => ({
  username: state.textField.username,
  password: state.textField.password,
  fullName: state.textField.fullName,
  validUser: state.textField.validUser,
  mode: state.responses.mode,
  signUpPost: state.responses.signUpPost,
});

const mapDispatchToProps = dispatch => ({
  usernameChangeActionCreator: () => dispatch(actions.usernameChangeActionCreator(event)),
  passwordChangeActionCreator: () => dispatch(actions.passwordChangeActionCreator(event)),
  fullNameChangeActionCreator: () => dispatch(actions.fullNameChangeActionCreator(event)),
  createAccountSubmitActionCreator: (e, mode, serverRes) =>
    dispatch(actions.createAccountSubmitActionCreator(e, mode, serverRes)), // remove server res argument when not needed
  changeToLoginPageActionCreator: () => dispatch(actions.changeToLoginPageActionCreator()),
  changeToProfilePageActionCreator: () => dispatch(actions.changeToProfilePageActionCreator()),
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.handleAccountSubmit = this.handleAccountSubmit.bind(this);
  }

  handleAccountSubmit(e, mode, serverRes) {
    e.preventDefault();
    // console.log(e, { mode }, { serverRes });
    let queryRes;

    if (this.props.mode === 'dev') {
      // this.props.signUpPost.valid = false;
      if (this.props.signUpPost.valid) this.props.changeToProfilePageActionCreator();
      else this.props.createAccountSubmitActionCreator();
    } else {
      // queryRes = actual server query
      const url = path.resolve(__dirname, `/gainAccess/?username=${this.props.username}&password=${this.props.username}&fullName=${this.props.fullName}`);
      const options = {
        method: 'POST',
        header: { 'Access-Control-Allow-Origin': ' * ', 'Content-Type': 'application/json' },
      };
      fetch(url, options)
        .then(res => res.json())
        .then(data => {
          if (data.valid) this.props.changeToProfilePageActionCreator();
          else this.props.createAccountSubmitActionCreator();
        });
    }

    /*
    /gainAccess* 
  Get or Post
  /gainAccess?username=value&password=value
  { username: value, password: value }
  response = { valid: boolean }
  */

    // queryRes.valid = false;

    // console.log(queryRes);
  }

  render() {
    // if (this.props.validUser === false) displayMessage.push(<p>Incorrect username or password</p>);
    // console.log(displayMessage);
    // console.log(this.props);

    return (
      <div className="signup-container" key="suc">
        <header>
          <h1>New to brd wtchng?</h1>
          <p>Create a brdl account and get started today!</p>
        </header>

        <form action="" onSubmit={e => this.handleAccountSubmit(e)}>
          <label htmlFor="username">
            <p>Create a username:</p>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="enter username"
              onChange={this.props.usernameChangeActionCreator}
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
          {this.props.validUser === false ? (
            <p className="validation-msg">Username is already taken</p>
          ) : (
            <p className="hidden"></p>
          )}
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
