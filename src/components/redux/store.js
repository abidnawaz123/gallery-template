import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './apiSlice';
// import thunk from 'redux-thunk';

const store = configureStore({
    reducer: {
        api: apiReducer,
    },
    // middleware: [thunk],
});

export default store;