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
import { useSelector } from 'react-redux';

const Logout = () => {
    const { email, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const handleSubmit = async () => {
            try {
                const response = await fetch('https://localhost:7086/account/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`                 
                    }
                });

                if (response.ok) {
                    // Handle successful login here, such as redirecting the user
                    console.log('Logout successful');                    
                } else {
                // Handle unsuccessful login here, such as displaying an error message
                console.error('Logout failed');
                }
            } catch (error) {
                console.error('Error:', error);
            }

            //удалить токен
            dispatch(logout());
            navigate('/');
        };
        handleSubmit();
    }, []);
    return null;
};

export {Logout};