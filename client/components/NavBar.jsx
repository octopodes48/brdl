// import path from 'path';
import React, { Component } from 'react';

import LogoIcon from '../../assets/img/brdl-logo-2-b.png';
import LogoText from '../../assets/img/brdl-logo-2-c.png';
import * as actions from '../actions/actions.js';

// const img = require('')

console.log('navbar component');

const mapStateToProps = state => ({});

const mapStateToDispatch = dispatch => ({});

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  // <img src={require('/images/image-name.png')} />

  render() {
    const display = [];

    if (this.props.currPage === 'signUp' || this.props.currPage === 'login') {
      display.push(
        <ul>
          <li>
            <a
              href="#"
              onClick={() => {
                this.props.resetFieldsActionCreator();
                this.props.changePageActionCreator('signUp');
              }}
            >
              Sign Up
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => {
                this.props.resetFieldsActionCreator();
                this.props.changePageActionCreator('login');
              }}
            >
              Login
            </a>
          </li>
        </ul>
      );
    } else {
      display.push(
        <ul>
          <li>
            <a href="#" onClick={() => this.props.changePageActionCreator('community')}>
              Community
            </a>
          </li>
          <li>
            <a href="#" onClick={() => this.props.changePageActionCreator('profile')}>
              My Profile
            </a>
          </li>
          <li>
            <a href="#">Settings</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>
      );
    }
    return (
      <div className="nav-bar-container" key="nv">
        <div className="nav-logo-container">
          <a href="#" onClick={() => this.props.changePageActionCreator('profile')}>
            {/* <p>LOGO</p> */}
            {/* <blockquote class="imgur-embed-pub" lang="en" data-id="Sn2GV1f">
              <a href="https://imgur.com/Sn2GV1f"></a>
            </blockquote>
            <script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script> */}
            <img className="nav-logo nav--icon" src={LogoIcon} />
          </a>
          <a href="#" onClick={() => this.props.changePageActionCreator('profile')}>
            {/* <p>BRDL</p> */}
            <img className="nav-logo nav--text" src={LogoText} />
          </a>
        </div>
        <div className="nav-nav-container">{display}</div>
      </div>
    );
  }
}

export default NavBar;
