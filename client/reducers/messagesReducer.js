import * as types from '../constants/actionTypes';

const initialState = {
  communityMessages: [],
  friendMessages: []
};

const messagesReducer = (state = initialState, action) => {
  // const stateCopy = { ...state };

  switch (action.type) {
    case types.UPDATE_FRIEND_MESSAGES:
      return {
        ...state,
        friendMessages: action.payload,
      };

    case types.UPDATE_COMMUNITY_MESSAGES:
      return {
        ...state,
        communityMessages: action.payload,
      };

    default:
      return state;
  }
};

export default messagesReducer;