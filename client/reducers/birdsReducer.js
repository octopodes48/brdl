import * as types from '../constants/actionTypes';

const initialState = {
  seenBirds: [],
  localBirds: [],
  leaderBoard: [],
};

const birdsReducer = (state = initialState, action) => {
  // const stateCopy = { ...state };

  switch (action.type) {
    case types.UPDATE_SEEN_BIRDS:
      console.log('in birds reducer', action.payload);
      return {
        ...state,
        seenBirds: action.payload,
      };

    case types.UPDATE_LOCAL_BIRDS:
      return {
        ...state,
        localBirds: action.payload,
      };

    case types.GET_LEADERS:
      return {
        ...state,
        leaderBoard: action.payload,
      }
    default:
      return state;
  }
};

export default birdsReducer;