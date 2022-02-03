import * as types from '../constants/actionTypes.js';

export const changePageActionCreator = pl => ({
  type: types.CHANGE_PAGE,
  payload: pl,
});

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

export const handleAccountSubmit = (e) => (dispatch, getState) => {
  // e.preventDefault();
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
      })
      .catch((err) => { console.log(err) });
  }
}

export const handleAccountLogin = (e) => (dispatch, getState) => {
  const valid = getState().responses.loginGet.valid;
  const mode = getState().responses.mode;
  const { username, password } = getState().textField;

  if (mode === 'dev') {
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

export const newSeenBird = (bird) => (dispatch, getState) => {
  const mode = getState().responses.mode;
  const seenBirds = getState().birds.seenBirds;
  const { username, lat, long } = getState().textField;

  if (mode === 'dev') {
    seenBirds.push({ sciName: bird, timeStamp: '5pm' });
    dispatch(updateSeenBirdsActionCreator(seenBirds));
  } else if (mode === 'prod') {
    bird = bird.split(' ').join('_');

    fetch(`http://localhost:3000/profile?username=${username}&lat=${lat}&long=${long}&sciBirdName=${bird} `, {
      method: 'POST',
      header: { 'Access-Control-Allow-Origin': ' * ', 'Content-Type': 'application/json' },
    })
      .then(data => data.json())
      .then(data => {
        if ('sciName' in data) {
          seenBirds.push({ sciName: data.sciName, timeStamp: data.timeStamp });
          dispatch(updateSeenBirdsActionCreator(seenBirds));
        } else console.log('Failed to update on the back end');
      })
      .catch(err => console.log(err));
  } else console.log('Mode must be prod or dev in ./client/reducers/responsesReducer.js');
}

export const getBirds = (locInfo) => (dispatch, getState) => {
  const mode = getState().responses.mode;
  const seenBirds = getState().birds.seenBirds.slice();
  const { username, lat, long } = getState().textField;

  if (mode === 'dev') {
    dispatch(updateSeenBirdsActionCreator(getState().responses.testSeenBirds));
    dispatch(updateLocalBirdsActionCreator(getState().responses.testLocalBirds));
  } else if (mode === 'prod') {
    fetch(`http://localhost:3000/profile?username=${username}&lat=${lat}&long=${long}`, {
      method: 'GET',
      header: { 'Access-Control-Allow-Origin': ' * ', 'Content-Type': 'application/json' },
    })
      .then(data => data.json())
      .then(data => {
        console.log(data);
        data.seenBirds.forEach(bird => bird.sciName = bird.scientific_name);
        if (data.seenBirds.length) {
          dispatch(updateSeenBirdsActionCreator(data.seenBirds.slice()));
        } else dispatch(updateLocalBirdsActionCreator(data.birds.slice()));
      //   dispatch(updateSeenBirdsActionCreator(getState().responses.testSeenBirds));
      // } else dispatch(updateLocalBirdsActionCreator(getState().responses.testLocalBirds));
      })
      .catch(err => console.log(err));
  } else console.log('Mode must be prod or dev in ./client/reducers/responsesReducer.js');
}

// export default login;
