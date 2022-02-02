import * as types from '../constants/actionTypes';

const testMessages = [
  { username: 'Kirk', location: { area: 'Lumberton' }, sciName: 'Robin', timeStamp: '1pm' },
  { username: 'Justin', location: { area: 'Beaumont' }, sciName: 'Blue Jay', timeStamp: '2pm' },
  { username: 'Calvin', location: { area: 'LA' }, sciName: 'Hawk', timeStamp: '2pm' },
  { username: 'Julia', location: { area: 'LA' }, sciName: 'Eagle', timeStamp: '4pm' },
];

const testSeenBirds = [
  { sciName: 'Robin', timeStamp: '2pm' },
  { sciName: 'Blue Jay', timeStamp: '2pm' },
  { sciName: 'Eagle', timeStamp: '2pm' },
  { sciName: 'Hawk', timeStamp: '2pm' },
  { sciName: 'Swallow', timeStamp: '2pm' },
  { sciName: 'Crane', timeStamp: '2pm' },
];

const testLocalBirds = [
  { sciName: 'Robin' },
  { sciName: 'Blue Jay' },
  { sciName: 'Eagle' },
  { sciName: 'Hawk' },
  { sciName: 'Swallow' },
  { sciName: 'Crane' },
  { sciName: 'Pelican' },
];

const initialState = {
  mode: 'prod',
  signUpPost: {
    valid: true,
  },
  loginGet: {
    valid: true,
  },
  testMessages: testMessages,
  testSeenBirds: testSeenBirds,
  testLocalBirds: testLocalBirds,
};

const responsesReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default responsesReducer;
