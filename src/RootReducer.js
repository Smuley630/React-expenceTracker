import { combineReducers } from 'redux';
import counterReducer from './redux/reducer'; // Import your reducer(s)

const rootReducer = combineReducers({
  counter: counterReducer,
});

export default rootReducer;
