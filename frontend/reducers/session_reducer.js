import { combineReducers } from 'redux';
import currentUserReducer from './current_user_reducer';

const sessionReducer = combineReducers({
  currentUser: currentUserReducer
});

export default sessionReducer;