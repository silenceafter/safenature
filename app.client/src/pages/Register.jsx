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
import {
  Routes,
  Route,
  Link,
  BrowserRouter,
  useParams,
  Outlet,
  Navigate
} from "react-router-dom";
import CryptoJS from 'crypto-js';

const Register = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {        
        const fetchData = async () => {
            try {
                    //регистрация в сервисе авторизации
                    const responseAuth = await fetch('https://localhost:7086/account/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ Username: 'ag', Email: 'ajj@mail.ru', Password: 'Burzum59!', ConfirmPassword: 'Burzum59!' })
                    });

                    //добавить пользователя в базу данных приложения. если произойдет ошибка, то пользователь (при условии, что он не существует в системе) будет добавлен позднее
                    /*const responseServer = await fetch('https://localhost:7158/user/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ Email: 'ajj@mail.ru' })
                    });*/
                    setData({auth: responseAuth/*, server: responseServer*/});
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
    }

    return (
        <div>
            {data ? (
                <div>{data}</div> // отрендерить ваши данные здесь
            ) : (
                <div>No data available</div>
            )}
        </div>
    );
};

export {Register};