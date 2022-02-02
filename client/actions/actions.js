import * as types from '../constants/actionTypes.js';

export const changePageActionCreator = pl => ({
  type: types.CHANGE_PAGE,
  payload: pl,
});

// handleAccountSubmit(e, mode, serverRes) {
//   if (this.props.mode === 'dev') {
//     // this.props.loginGet.valid = false;
//     if (this.props.loginGet.valid) this.props.changeToProfilePageActionCreator();
//     else this.props.loginSubmitActionCreator();
//   } else {
//     // queryRes = actual server query
//     const url = `http://localhost:3000/gainAccess/?username=${this.props.username}&password=${this.props.username}`;
//     const options = {
//       method: 'GET',
//       header: {
//         'Access-Control-Allow-Origin': ' * ',
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       },
//     };
//     fetch(url, options)
//       .then(res => res.json())
//       .then(data => {
//         if (data.valid) this.props.changeToProfilePageActionCreator();
//         else this.props.loginSubmitActionCreator();
//       });
//   }
// }

export const changeToProfilePageActionCreator = () => ({
  type: types.PROFILE,
});

export const changeToLoginPageActionCreator = () => ({
  type: types.LOGIN,
});

export const createAccountSubmitActionCreator = (e, mode, serverRes) => ({
  type: types.CREATE_ACCOUNT_SUBMIT,
  payload: { e, mode, serverRes },
});

export const handleAccountSubmit = (e) => (dispatch, getState) => {
  e.preventDefault();
  const mode = getState().responses.mode;
  const valid = getState().responses.signUpPost.valid;
  const { username, password, fullName } = getState().textField;

  if (mode === 'dev') {
    if (valid) dispatch(changeToProfilePageActionCreator());
    else dispatch(createAccountSubmitActionCreator());
  } else {  // Should the second username be password?
    fetch(`http://localhost:3000/gainAccess/?username=${username}&password=${password}&fullName=${fullName}`, {
        method: 'POST',
        header: { 'Access-Control-Allow-Origin': ' * ', 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        if (data.valid) dispatch(changeToProfilePageActionCreator());
        else dispatch(createAccountSubmitActionCreator());
      });
  }
}

export const handleAccountLogin = (e) => (dispatch, getState) => {
  const valid = getState().responses.loginGet.valid;
  const mode = getState().responses.mode;
  const { username, password } = getState().textField;

  if (this.props.mode === 'dev') {
    if (valid) dispatch(changeToProfilePageActionCreator());
    else dispatch(loginSubmitActionCreator());
  } else {
    fetch(`http://localhost:3000/gainAccess/?username=${username}&password=${password}`, {
      method: 'GET',
      header: {
        'Access-Control-Allow-Origin': ' * ',
        'Content-Type': 'application/json',
        Accept: 'application/json', // string? necessary?
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.valid) dispatch(changeToProfilePageActionCreator());
        else dispatch(loginSubmitActionCreator());
      });
  }
}

export const changeToSignUpPageActionCreator = () => ({
  type: types.SIGN_UP,
});

export const changeToCommunityPageActionCreator = () => ({
  type: types.COMMUNITY,
});

export const usernameChangeActionCreator = e => ({
  type: types.USERNAME_CHANGE,
  payload: e,
});

export const passwordChangeActionCreator = e => ({
  type: types.PASSWORD_CHANGE,
  payload: e,
});

export const fullNameChangeActionCreator = e => ({
  type: types.FULL_NAME_CHANGE,
  payload: e,
});

export const resetFieldsActionCreator = () => ({
  type: types.RESET_FIELDS,
});

export const loginSubmitActionCreator = (e, mode, serverRes) => ({
  type: types.LOGIN_SUBMIT,
  payload: { e, mode, serverRes },
});

export const updateSeenBirdsActionCreator = pl => ({
  type: types.UPDATE_SEEN_BIRDS,
  payload: pl,
});

export const updateLocalBirdsActionCreator = pl => ({
  type: types.UPDATE_LOCAL_BIRDS,
  payload: pl,
});

export const updateFriendMessagesActionCreator = pl => ({
  type: types.UPDATE_FRIEND_MESSAGES,
  payload: pl,
});

export const updateCommunityMessagesActionCreator = pl => ({
  type: types.UPDATE_COMMUNITY_MESSAGES,
  payload: pl,
});

export const updateLocationActionCreator = pl => ({
  type: types.UPDATE_LOCATION,
  payload: pl,
});

// export default login;
