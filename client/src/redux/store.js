import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        data: dataReducer,
        UI: uiReducer
    },
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in non-production environments
});

export default store;
