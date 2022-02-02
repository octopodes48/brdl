import * as types from '../constants/actionTypes';

const initialState = {
  seenBirds: [],
  localBirds: []
};

const birdsReducer = (state = initialState, action) => {
  // const stateCopy = { ...state };

  switch (action.type) {
    case types.UPDATE_SEEN_BIRDS:
      return {
        ...state,
        seenBirds: action.payload,
      };

    case types.UPDATE_LOCAL_BIRDS:
      return {
        ...state,
        localBirds: action.payload,
      };

    default:
      return state;
  }
};

export default birdsReducer;