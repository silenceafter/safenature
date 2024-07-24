import { Password } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Routes,
  Route,
  Link,
  BrowserRouter,
  useParams,
  Outlet,
  Navigate
} from "react-router-dom";

import Avatar from '@mui/material/Avatar';
/*import Button from '@mui/material/Button';*/
//import CssBaseline from '@mui/material/CssBaseline';
//import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
//import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
//import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { login, logout } from '../store/actions/authActions';

const Login = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /*useEffect(() => {
        const fetchData = async () => {
            try {
                    const response = await fetch('https://localhost:7086/account/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'                 
                        },
                        body: JSON.stringify({ Email: 'ac@mail.ru', Password: 'Burzum59!' })
                    });                    
                    if (!response.ok)
                        throw new Error(`Error: ${response.statusText}`);

                    const result = await response.json();
                    setData(result);

                    //сохранить токен
                    const token = localStorage.getItem('ac@mail.ru');
                    if (!token)
                        localStorage.setItem('ac@mail.ru', data.result);                    
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);    
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
    return <div>Error: {error.message}</div>;
    }*/

    const [formData, setFormData] = useState({ email: '', password: ''});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await fetch('https://localhost:7086/account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'                 
                },
                body: JSON.stringify({ Email: formData.email, Password: formData.password })
            });

            if (response.ok) {
                // Handle successful login here, such as redirecting the user
                console.log('Login successful');

                const result = await response.json();
                //setData(result);

                //сохранить токен
                dispatch(login(formData.email, result.token.result));
                /*const token = localStorage.getItem(formData.email);
                if (!token)
                    localStorage.setItem(formData.email, result.token);*/
                navigate('/');
            } else {
            // Handle unsuccessful login here, such as displaying an error message
            console.error('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };   

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };
    //
    return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Вход
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Запомнить"
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => handleSubmit()}
                >
                  Войти
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Забыли пароль?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link component={RouterLink} to="/register" variant="body2">
                      {"Нет аккаунта? Регистрация"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>    
            </Container>
      );
};

export {Login};