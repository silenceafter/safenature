import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import image from '../images/about.jpg';
import CircularProgress from '@mui/material/CircularProgress';
import Sidebar from '../components/sidebar';
import MainFeaturedPost from '../components/mainFeaturedPost';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
//import Paper from '@mui/material/Paper';

const About = () => {
  const { social } = useSelector((state) => state.social);
  //раздел
  const mainFeaturedPost = {
    title: 'О нас',
    description: "",
    image: image,
    imageText: '',
    linkText: '',
  };

  //информация о странице
  const sidebar = {
      title: '',
      description:
          'Еще какая-то информация',    
      social: social
  };
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
              <Paper>
              <Box
                sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                }}
              >
                <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
                  <Typography variant="h2" component="h1" gutterBottom>
                    SafeNature
                  </Typography>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {'Добро пожаловать в сердце экологической революции! Мы - команда страстных защитников природы, стремящихся к гармонии между человеком и окружающей средой. Наш проект по переработке опасных отходов первого и второго классов опасности - это наш ответ на вызовы нашего времени, выраженный в языке заботы, ответственности и инноваций.'}
                    {'По данным Всемирной организации здравоохранения (ВОЗ), каждый год в мире производится более 400 миллионов тонн опасных отходов. Это включает в себя отходы от промышленности, здравоохранения, сельского хозяйства, а также бытовые отходы. Опасные отходы могут содержать токсичные вещества, которые могут наносить вред здоровью людей и окружающей среде.'}
                    {'Мы верим, что каждый маленький шаг в сторону устойчивого потребления, переработки и утилизации отходов приближает нас к чистому и светлому будущему. Наша миссия не только в том, чтобы преображать опасные отходы в безопасные ресурсы, но и вдохновлять людей на заботу о драгоценной планете, которую мы делим. '}
                    {'Присоединяйтесь к нам в этом удивительном путешествии экологического созидания! Давайте вместе создадим мир, где каждый акт заботы о природе станет каплей великого океана экологического процветания. Помните: наш дом - это Земля, и только вместе мы можем защитить его и сохранить для будущих поколений.'}
                  </Typography>
                </Container>                
              </Box>
              </Paper>
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

export {About};