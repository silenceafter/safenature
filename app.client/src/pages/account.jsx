//import * as React from 'react';
//import CssBaseline from '@mui/material/CssBaseline';
//import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import Grid from '@mui/material/Grid';
import Main from '../components/main';
import Sidebar from '../components/sidebar';
import MainFeaturedPost from '../components/mainFeaturedPost';
import FeaturedPost from '../components/featuredPost';
import Divider from '@mui/material/Divider';
import Markdown from '../components/markdown';
//import Markdown from 'markdown-to-jsx';
import { post } from 'jquery';
//import ReactMarkdown from 'markdown-to-jsx';
import { Card, CardContent, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import { login, logout } from '../store/actions/authActions';
import image from '../images/account.jpg';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

const Account = () => {
    const [userData, setUserData] = useState(null);
    const [backendData, setBackendData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { email, token } = useSelector((state) => state.auth);
    const { social } = useSelector((state) => state.social);
    const dispatch = useDispatch();
    const navigate = useNavigate();  
    
    //раздел
    const mainFeaturedPost = {
        title: 'Учетная запись',
        description: "",
        image: image,
        imageText: '',
        linkText: '',
    };

    //информация о странице
    const sidebar = {
        title: '',
        description:
            'Данные Вашей учетной записи, количество бонусных баллов, информация о списании/начислении, последних совершенных действиях и т.д.',    
        social: social
    };
    //
    useEffect(() => {
        //доступ запрещен
        if (!email)
            navigate('/access-denied');

        //запрос 1 к сервису авторизации
        const userRequest = async () => {
        try {
            const response = await fetch('https://localhost:7086/account/get-current-user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const userResponse = await response.json();
                setUserData(userResponse);

                //запрос 2 к бекенд-приложению
                const userRequest2 = async () => {
                    try {
                        const response = await fetch('https://localhost:7158/user/getuser', {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ Email: userResponse.email })
                        });
            
                        if (response.ok) {
                            //setUserData(await response.json());
                            const backendResponse = await response.json();
                            setBackendData(backendResponse);
                        } else {
                            if (response.status === 401) {
                                //токен не действует
                                dispatch(logout());//удалить токен
                                navigate('/login');
                            }            
                        }
                        } catch (error) {
                            console.error('Error:', error);
                        } finally {
                            setLoading(false);
                        }
                    };
                    userRequest2();
            } else {
                if (response.status === 401) {
                    //токен не действует
                    dispatch(logout());//удалить токен
                    navigate('/login');
                }                
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
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }
    return (
        <> 
            <MainFeaturedPost post={mainFeaturedPost} />
            <Grid container spacing={5} sx={{ mt: 3 }}>                
            <Grid
                item
                xs={12}
                md={8}
                sx={{
                    '& .markdown': {
                    py: 3,
                    },
                }}
            >
                <Divider />
                <div>
                    <TableContainer component={Paper}>
                        <Table aria-label="user table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Имя пользователя</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Роль</TableCell>
                                <TableCell>Номер телефона</TableCell>
                                <TableCell>Кол-во баллов</TableCell>                                
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            <TableRow>
                                <TableCell>{userData.userName}</TableCell>
                                <TableCell>{userData.email}</TableCell>
                                <TableCell>{backendData.role}</TableCell>
                                <TableCell>{userData.phoneNumber != null ? userData.phoneNumber : 'не указан'}</TableCell>
                                <TableCell>{backendData.bonus}</TableCell>
                            </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                </Grid>
                <Sidebar
                    title={sidebar.title}
                    description={sidebar.description}
                    archives={sidebar.archives}
                    social={sidebar.social}
                />     
            </Grid>
        </>
    );
};

export {Account};