import * as types from '../constants/actionTypes';

const initialState = {
  page: 'signUp',
};

const navigationReducer = (state = initialState, action) => {
  // const stateCopy = { ...state };

  switch (action.type) {
    case types.CHANGE_PAGE:
      return {
        ...state,
        page: action.payload,
      };

    case types.SIGN_UP:
      return {
        ...state,
        page: 'signUp',
      };

    case types.LOGIN:
      return {
        ...state,
        page: 'login',
      };

    case types.COMMUNITY:
      return {
        ...state,
        page: 'community',
      };

    case types.PROFILE:
      return {
        ...state,
        page: 'profile',
      };

    default:
      return state;
  }
};

export default navigationReducer;
