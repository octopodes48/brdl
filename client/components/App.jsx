import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import Navbar from './NavBar.jsx';
import CommunityContainer from '../containers/CommunityContainer.jsx';
import ProfileContainer from '../containers/ProfileContainer.jsx';
import 'regenerator-runtime';
import axios from 'axios';

const mapStateToProps = state => ({
  page: state.navigation.page,
  username: state.responses.username,
  password: state.responses.password,
  fullName: state.responses.fullName,
});

const mapDispatchToProps = dispatch => ({
  resetFieldsActionCreator: () => dispatch(actions.resetFieldsActionCreator()),
  changePageActionCreator: page => dispatch(actions.changePageActionCreator(page)),
  changeToProfile: () => dispatch(actions.changeToProfilePageActionCreator()),
  setFullnameLogin: value => dispatch(actions.setFullnameLoginActionCreator(value))
});


const authOnRender = async (url) => {

  const data = await axios.get(url, { withCredentials: true })
  return data

}



class App extends Component {
  constructor(props) {
    super(props);
  }

componentDidMount() {
  authOnRender('/auth')
  .then((res) => {
    if (res.data.valid === true) {
    this.props.setFullnameLogin(res.data.username)
    this.props.changeToProfile()
    console.log(this.props.page)
    
    }
    console.log(res.data)

  })
}

  render() {
    const display = [];

    if (this.props.page === 'signUp') display.push(<SignUp
      key="su"
      username={this.props.username}
      password={this.props.password}
      fullName={this.props.fullName} 
    />);
    else if (this.props.page === 'login') display.push(<Login
      key="lo"
      username={this.props.username}
      password={this.props.password}
      />);
    else if (this.props.page === 'community') display.push(<CommunityContainer />);
    else if (this.props.page === 'profile') display.push(<ProfileContainer />);

    return (
      <div>
        <Navbar
          currPage={this.props.page}
          changePageActionCreator={this.props.changePageActionCreator}
          resetFieldsActionCreator={this.props.resetFieldsActionCreator}
        />
        {display}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
