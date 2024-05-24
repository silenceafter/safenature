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

const UserInfoCard = styled(Card)(({ theme }) => ({
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  }));
  
  const UserAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: theme.spacing(2),
  }));
  
function UserProfile({ user }) {
    return (      
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box mt={2}> {/* Добавляем отступ сверху */}
                <Typography variant="body1" component="div">
                <strong>Имя пользователя:</strong> {user.userName}
                </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Email:</strong> {user.email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Phone Number:</strong> {user.phoneNumber != null ? user.phoneNumber : 'не указан'}
            </Typography>
          </Grid>
        </Grid>      
    );
}

const Account = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { email, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();  
    
    const mainFeaturedPost = {
        title: 'Title of a longer featured blog post',
        description:
          "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
        image: 'https://source.unsplash.com/random?wallpapers',
        imageText: 'main image description',
        linkText: 'Continue reading…',
    };

    const sidebar = {
    title: 'About',
    description:
        'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
    archives: [
        { title: 'March 2020', url: '#' },
        { title: 'February 2020', url: '#' },
        { title: 'January 2020', url: '#' },
        { title: 'November 1999', url: '#' },
        { title: 'October 1999', url: '#' },
        { title: 'September 1999', url: '#' },
        { title: 'August 1999', url: '#' },
        { title: 'July 1999', url: '#' },
        { title: 'June 1999', url: '#' },
        { title: 'May 1999', url: '#' },
        { title: 'April 1999', url: '#' },
    ],
    social: [
        { name: 'GitHub', icon: GitHubIcon },
        { name: 'X', icon: XIcon },
        { name: 'Facebook', icon: FacebookIcon },
    ],
    };
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
                <Typography variant="h6" gutterBottom>Учетная запись</Typography>
                <Divider />
                <div>
                    <UserProfile user={userData} />
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