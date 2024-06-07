import { FETCH_DATA_GET_REQUEST, FETCH_DATA_GET_SUCCESS, FETCH_DATA_GET_FAILURE } from '../actions/getRequestActions';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    data: null,
    error: ''
};

const getRequestReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_GET_REQUEST:
          return {
            ...state,
            loading: true,
            error: null,
          };
        case FETCH_DATA_GET_SUCCESS:
          return {
            ...state,
            loading: false,
            data: action.payload.data,
            error: ''
          };
        case FETCH_DATA_GET_FAILURE:
          return {
            ...state,
            loading: false,
            data: null,
            error: action.payload.error
          };
        default:
          return state;
    }
};

export default getRequestReducer;