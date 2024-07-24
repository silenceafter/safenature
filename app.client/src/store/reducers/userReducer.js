// reducers/userReducer.js
import { createReducer } from '@reduxjs/toolkit';
import { fetchUserDataRequest, fetchUserDataSuccess, fetchUserDataFailure } from '../actions/userActions';

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(fetchUserDataRequest, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUserDataSuccess, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchUserDataFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
});

export default userReducer;