/* eslint global-require: "off" */

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import trackEvents from '../middlewares/analytics';
import refreshMatchingContexts from '../middlewares/refreshMatchingContexts';
import openOptionsPage from '../middlewares/openOptionsPage';
import sendFeedback from '../middlewares/sendFeedback';
import fromJS from '../../utils/customFromJS';

import makeInitialState from './makeInitialState';

import migrate from './migrations.js';

export default function configureStore(callback, isBg) {
  let getState;
  if (isBg === undefined) getState = require('./getStoredState'); /* If you don't want to persist states, use './getDefaultState' */// eslint-disable-line max-len
  else getState = (isBg ? require('./getStateToBg') : require('./getStateFromBg'));

  getState(loadedState => {
    // let enhancer;
    const middlewares = [
      thunk,
      trackEvents,
      refreshMatchingContexts,
      openOptionsPage,
      sendFeedback
    ];

    const composeEnhancers = composeWithDevTools({
      // options
    });
    const enhancer = process.env.NODE_ENV !== 'production' ?
      composeEnhancers(applyMiddleware(...middlewares.concat([
        require('redux-immutable-state-invariant')(),
        require('redux-logger')({ level: 'info', collapsed: true }),
      ]))) :
      applyMiddleware(...middlewares);


    const initialPrefState = makeInitialState().delete('resources'); // Map
    const initialResourcesState = makeInitialState().delete('prefs'); // Map
    
    // migrate loadedState to the current state structure
    const migratedState = migrate(fromJS(loadedState), initialPrefState);
    
    const state = initialResourcesState.merge(migratedState);
    const store = createStore(rootReducer, state, enhancer);

    // FIXME
    // if (process.env.NODE_ENV !== 'production') {
    //   if (module.hot) {
    //     module.hot.accept('../reducers', () =>
    //       store.replaceReducer(require('../reducers'))
    //     );
    //   }
    // }

    return store;
  }, callback);
}
