import { fetchAccountDataRequest, fetchAccountDataSuccess, fetchAccountDataFailure } from '../actions/accountActions';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    status: 'idle',
    error: null,
};

const accountReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(fetchAccountDataRequest, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchAccountDataSuccess, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
            state.error = null;
        })
        .addCase(fetchAccountDataFailure, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
});

export default accountReducer;