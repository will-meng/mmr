import { RECEIVE_USERS, CLEAR_SEARCH } from '../actions/user_actions';

const searchResultsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USERS:
      return action.payload.searchResults;
    case CLEAR_SEARCH:
      return [];
    default:
      return state;
  }
};

export default searchResultsReducer;