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
    
      let post11 = `
      # Sample blog post

      ~~April 1, 2020 by~~
      
      Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
      Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.
      
      Curabitur blandit tempus porttitor. **Nullam quis risus eget urna mollis** ornare vel eu leo.
      Nullam id dolor id nibh ultricies vehicula ut id elit.
      
      Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum.
      Aenean lacinia bibendum nulla sed consectetur.
      
      ## Heading
      
      Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
      Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
      
      ### Sub-heading 1
      
      Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      
      ### Sub-heading 2
      
      Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod.
      Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo
      sit amet risus.
      
      - Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
      - Donec id elit non mi porta gravida at eget metus.
      - Nulla vitae elit libero, a pharetra augue.
      
      Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.
      
      1. Vestibulum id ligula porta felis euismod semper.
      1. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      1. Maecenas sed diam eget risus varius blandit sit amet non magna.
      
      Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.
      `;
      
      const post2 = `
      # Another blog post
      
      _March 23, 2020 by [Matt](/)_
      
      Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
      Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.
      
      Curabitur blandit tempus porttitor. **Nullam quis risus eget urna mollis** ornare vel eu leo.
      Nullam id dolor id nibh ultricies vehicula ut id elit.
      
      Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum.
      Aenean lacinia bibendum nulla sed consectetur.
      
      Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
      Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
      `;
      
      const post3 = `
      # New feature
      
      _March 14, 2020 by [Tom](/)_
      
      Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod.
      Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh,
      ut fermentum massa justo sit amet risus.
      
      - Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
      - Donec id elit non mi porta gravida at eget metus.
      - Nulla vitae elit libero, a pharetra augue.
      
      Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum.
      Aenean lacinia bibendum nulla sed consectetur.
      
      Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.
      `;
    const posts = [post11, post2, post3];

    const featuredPosts = [
        {
          title: 'Featured post',
          date: 'Nov 12',
          description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
          image: 'https://source.unsplash.com/random?wallpapers',
          imageLabel: 'Image Text',
        },
        {
          title: 'Post title',
          date: 'Nov 11',
          description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
          image: 'https://source.unsplash.com/random?wallpapers',
          imageLabel: 'Image Text',
        },
      ];

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
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }  
    /*return (
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
      );*/
    return (
        <> 
            <MainFeaturedPost post={mainFeaturedPost} />
            <Grid container spacing={5} sx={{ mt: 3 }}>                
            
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