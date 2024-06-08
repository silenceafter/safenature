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
import { fetchDataGet } from '../store/thunk/thunks';

const Account = () => {
    const { email, token } = useSelector((state) => state.auth);
    const { social } = useSelector((state) => state.social);    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accountBackendRequest = useSelector((state) => state.getRequest.accountBackendRequest);

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

    //useEffect
    useEffect(() => {
        //доступ запрещен
        if (!email)
            navigate('/access-denied');

        //запрос данных пользователя
        dispatch(fetchDataGet(token, 'https://localhost:7158/user/get-current-user', 'accountBackendRequest'));                
    }, [dispatch]);

    //состояния запросов
    const isLoading = accountBackendRequest?.loading;
    const isError = accountBackendRequest?.error;

    //рендер
    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }
    //
    if (isError) {
        if (accountBackendRequest.error === 401) {
            navigate('/login');
        }
    }
    //
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
                            { accountBackendRequest?.data
                                ? (
                                    <>
                                        <TableCell>{accountBackendRequest?.data.userName}</TableCell>
                                        <TableCell>{accountBackendRequest?.data.email}</TableCell>
                                        <TableCell>{accountBackendRequest?.data.role}</TableCell>
                                        <TableCell>{accountBackendRequest?.data.phoneNumber != null ? accountBackendRequest?.data.phoneNumber : 'не указан'}</TableCell>
                                        <TableCell>{accountBackendRequest?.data.bonus}</TableCell>
                                    </>
                                ) 
                                : (
                                    <>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </>
                                )
                            }  
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