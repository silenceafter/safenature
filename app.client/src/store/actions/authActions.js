export const login = (username, email, token) => ({
    type: 'LOGIN',
    payload: { username, email, token },
});

export const logout = () => ({
    type: 'LOGOUT',
});