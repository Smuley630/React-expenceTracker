import { createStore } from 'redux';
import rootReducer from '../RootReducer';  // Import the combined reducers

// Create a store with a reducer
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // For Redux DevTools
);

export default store;
