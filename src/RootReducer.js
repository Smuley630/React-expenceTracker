import { combineReducers } from 'redux';
import counterReducer from './redux/reducer'; 

const rootReducer = combineReducers({
  counter: counterReducer,
});

export default rootReducer;
