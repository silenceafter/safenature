import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { login } from '../store/actions/authActions';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: ''});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async () => {
      setLoading(true);
      setMessage(null);
      //
      try {
        const response = await fetch('https://localhost:7086/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'                 
            },
            body: JSON.stringify({ Email: formData.email, Password: formData.password })
        });

        if (response.ok) {
            const result = await response.json();

            //сохранить токен
            dispatch(login(result.userName, formData.email, result.token.result));   
            
            //запрос к бекенд-приложению
            const backendResponse = await fetch('https://localhost:7158/user/login', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${result.token.result}`,
                    'Content-Type': 'application/json'    
                }
            });

            //результат
            if (backendResponse.ok) {
                const data = await backendResponse.json();
                if (data.status === 401)
                  throw new Error('Ошибка авторизации');
            } else {
                throw new Error('Ошибка авторизации');
            }
            navigate('/');
        } else {
          const errorResult = await response.json();
          let errorMessages = '';
          for (let key in errorResult.errors) {
            if (errorResult.errors.hasOwnProperty(key)) {
              let values = errorResult.errors[key];
              values.forEach(value => {
                errorMessages += `${value}, `;
              });
            }
          }
          //
          errorMessages = errorMessages.slice(0, -2);
          setMessage({ type: 'error', text: 'Ошибка входа: ' + errorMessages });
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage({ type: 'error', text: 'Ошибка: ' + error.message });
      } finally {
        setLoading(false);
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
                alignItems: 'center',
            }}
        >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Вход
        </Typography>
        {message && (
            <Alert severity={message.type} sx={{ width: '100%', mb: 2 }}>
                {message.text}
            </Alert>
        )}
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Электронная почта"
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
                label="Пароль"
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
            {loading 
              ? (
                  <Box display="flex" justifyContent="center" sx={{ mt: 3, mb: 2 }}>
                      <CircularProgress />
                  </Box>
              ) 
              : (
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={() => handleSubmit()}
                  >
                      Войти
                  </Button>
              )
            }
            <Grid container>
                <Grid item xs>
                    <Link component={RouterLink} to="/forgot" variant="body2">
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