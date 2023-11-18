import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/userAuthSlice.js';
import { apiSlice } from './slices/apiSlice.js'; 
import adminReducer from './slices/adminAuthSlice.js'
// import checkTokenMiddleware from './middleware/checkTokenMIddleware'


const rootReducer = combineReducers({
  auth:authReducer,
  adminAuth:adminReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});



const store = configureStore({
    reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
  });

export default store;