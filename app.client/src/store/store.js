import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import sidebarReducer from './slices/sidebarSlice';
import { combineReducers } from 'redux';
//import thunk from 'redux-thunk'; // Middleware для асинхронных действий

//корневой редьюсер
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  social: sidebarReducer
});

//хранилище redux
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;