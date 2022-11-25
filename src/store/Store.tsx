import {AnyAction, combineReducers, configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/AuthSlice';
import appSlice from './slices/AppSlice';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger';
import {Actions} from '../constants/Actions';

const combinedReducer = combineReducers({
  auth: authSlice,
  app: appSlice,
});

const rootReducer = (
  state: ReturnType<typeof combinedReducer> | undefined,
  action: AnyAction,
) => {
  if (action.type === Actions.logout) {
    return combinedReducer(undefined, {type: undefined});
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
