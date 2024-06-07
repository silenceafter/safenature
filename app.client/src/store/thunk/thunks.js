import {
    fetchDataGetRequest,
    fetchDataGetSuccess,
    fetchDataGetFailure,
  } from '../actions';

export const fetchDataGet = (token, url) => {
    async (dispatch) => {
        dispatch(fetchDataGetRequest(token, url));
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });//'https://localhost:7086/account/get-current-user'
            //
            const data = await response.json();
            dispatch(fetchDataGetSuccess(data));
        } catch (error) {
            dispatch(fetchDataGetFailure(error.toString()));
        }
    };
};