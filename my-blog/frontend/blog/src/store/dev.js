import React from 'react';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {createDevTools, persistState} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import *as reducers from '../reducers/index';
// import {routerReducer} from 'react-router-redux';

const reducer = combineReducers({...reducers});

const DevToolsClass = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={true}/>
  </DockMonitor>
);

var composedCreateStore = compose(applyMiddleware(thunk), DevToolsClass.instrument())(createStore);

export const DevTools = <DevToolsClass />;

var finalStore = composedCreateStore(reducer);

export const store = finalStore;