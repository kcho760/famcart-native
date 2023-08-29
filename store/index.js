import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './auth';
import listsReducer from './list';
import { itemReducer } from './item';  // Ensure the import is correct
import { listItemReducer } from './listItem';  // Ensure the import is correct

// Combine all reducers into a rootReducer
const rootReducer = combineReducers({
  auth: authReducer,
  lists: listsReducer,
  items: itemReducer,
  listItems: listItemReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const composeEnhancers = compose;  // You might replace this with a React Native-specific setup
  enhancer = composeEnhancers(applyMiddleware(thunk)); // Removed logger
}

// Create the Redux store
const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
