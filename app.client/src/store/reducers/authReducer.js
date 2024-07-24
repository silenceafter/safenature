const initialState = {
    email: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).email : null,
    token: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).token : null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':        
        const loginData = {
          email: action.payload.email,
          token: action.payload.token,
        };
        localStorage.setItem('auth', JSON.stringify(loginData));
        return {
          ...state,
          ...loginData,
        };

      case 'LOGOUT':
        localStorage.removeItem('auth');
        return {
          ...state,
          ...{
            email: null,
            token: null,
          },
        };

      default:
        return state;
    }
  };
  
  export default authReducer;