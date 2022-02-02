import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

/*
loginGet: {
  valid: true,
},
*/

const mapStateToProps = state => ({ validLogin: state.textField.validLogin });

const mapDispatchToProps = dispatch => ({
  handleAccountLogin: (e) => dispatch(actions.handleAccountLogin(e)),
  usernameChangeActionCreator: () => dispatch(actions.usernameChangeActionCreator(event)),
  passwordChangeActionCreator: () => dispatch(actions.passwordChangeActionCreator(event)),
});

class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="login-container" key="lic">
        <header>
          <h1>Already have an account?</h1>
          <p>Sign in and get brdling!</p>
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

          <button className="login-btn" type="submit" value="Create account">Get brdlng</button>
          {this.props.validLogin === false ?
            (<p className="validation-msg">Invalid username or password</p>) :
            (<p className="hidden"></p>)
          }
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
