export const login = (email, token) => ({
    type: 'LOGIN',
    payload: { email, token },
});

export const logout = () => ({
    type: 'LOGOUT',
});