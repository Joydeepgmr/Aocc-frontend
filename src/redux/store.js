import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';

import { rootReducer } from './rootReducer';

const Store = configureStore({
	reducer: rootReducer,
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
	devTools: process.env.NODE_ENV !== 'production',
});

export { Store };
