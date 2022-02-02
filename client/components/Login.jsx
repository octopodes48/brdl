import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

/*
loginGet: {
  valid: true,
},
*/

const mapStateToProps = state => ({
  loginGet: state.responses.loginGet,
  username: state.textField.username,
  password: state.textField.password,
  validLogin: state.textField.validLogin,
  mode: state.responses.mode,
});

const mapDispatchToProps = dispatch => ({
  changeToProfilePageActionCreator: () => dispatch(actions.changeToProfilePageActionCreator()),
  usernameChangeActionCreator: () => dispatch(actions.usernameChangeActionCreator(event)),
  passwordChangeActionCreator: () => dispatch(actions.passwordChangeActionCreator(event)),
  loginSubmitActionCreator: (e, mode, serverRes) =>
    dispatch(actions.loginSubmitActionCreator(e, mode, serverRes)),
});

class Login extends Component {
  constructor(props) {
    super(props);
  }

  handleAccountSubmit(e, mode, serverRes) {
    e.preventDefault();
    // console.log(e, { mode }, { serverRes });
    let queryRes;

    if (this.props.mode === 'dev') {
      // this.props.loginGet.valid = false;
      if (this.props.loginGet.valid) this.props.changeToProfilePageActionCreator();
      else this.props.loginSubmitActionCreator();
    } else {
      // queryRes = actual server query
      const url = `http://localhost:3000/gainAccess/?username=${this.props.username}&password=${this.props.username}`;
      const options = {
        method: 'GET',
        header: {
          'Access-Control-Allow-Origin': ' * ',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      };
      fetch(url, options)
        .then(res => res.json())
        .then(data => {
          if (data.valid) this.props.changeToProfilePageActionCreator();
          else this.props.loginSubmitActionCreator();
        });
    }
  }

  render() {
    return (
      <div className="login-container" key="lic">
        <header>
          <h1>Already have an accnt?</h1>
          <p>Sign in and get brdlng!</p>
        </header>

        <form key="li-form" action="" onSubmit={e => this.handleAccountSubmit(e)}>
          <label htmlFor="username">
            <p>Username:</p>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="enter username"
              onChange={this.props.usernameChangeActionCreator}
            />
          </label>
          <label htmlFor="password">
            <p>Password:</p>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="enter password"
              onChange={this.props.passwordChangeActionCreator}
            />
          </label>

          <button className="login-btn" type="submit" value="Create account">
            Get brdlng
          </button>
          {this.props.validLogin === false ? (
            <p className="validation-msg">Invalid username or password</p>
          ) : (
            <p className="hidden"></p>
          )}
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
