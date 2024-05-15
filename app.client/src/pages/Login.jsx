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

const Login = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                    const response = await fetch('https://localhost:7086/account/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ Email: 'ac@mail.ru', Password: 'Burzum59!' })
                    });

                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }
                    const result = await response.json();
                    setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    //сохранить токен
    const token = localStorage.getItem('ac@mail.ru');
    if (!token)
        localStorage.setItem('ac@mail.ru', data.result);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
    return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            {data ? (
                <div>{JSON.stringify(data)}</div> // отрендерить ваши данные здесь
            ) : (
                <div>No data available</div>
            )}
        </div>
    );
};

export {Login};