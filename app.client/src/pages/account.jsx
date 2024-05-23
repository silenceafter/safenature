//import * as React from 'react';
//import CssBaseline from '@mui/material/CssBaseline';
//import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
//import Link from '@mui/material/Link';

const Account = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { email, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();    
    //
    useEffect(() => {
        //доступ запрещен
        if (!email)
            navigate('/access-denied');

        const userRequest = async () => {
        try {
            const response = await fetch('https://localhost:7086/account/get-current-user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setUserData(await response.json());
            } else {
            }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        userRequest();
    }, []);

    //рендер
    if (loading)
        return null;
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
                <Typography variant="h2" component="h1" gutterBottom></Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    {`Имя пользователя: ${userData.userName}`}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    {`Email: ${userData.email}`}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    {`Телефон: ${userData.phoneNumber != null ? userData.phoneNumber : 'не указан'}`}
                </Typography>
                <Typography variant="body1"></Typography>
            </Container>
            <Box
                component="footer"
                sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                    ? theme.palette.grey[200]
                    : theme.palette.grey[800],
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="body1"></Typography>                
                </Container>
            </Box>  
        </Box>
      );
};

export {Account};