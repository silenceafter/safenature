import React from 'react';
import Main from '../components/main';
import Sidebar from '../components/sidebar';
import MainFeaturedPost from '../components/mainFeaturedPost';
import FeaturedPost from '../components/featuredPost';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import YoutubeIcon from '@mui/icons-material/YouTube';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, Typography } from '@mui/material';
import RecyclingIcon from '@mui/icons-material/Recycling';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DiscountIcon from '@mui/icons-material/Discount';
import Button from '@mui/material/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import Divider from '@mui/material/Divider';

const items = [
  {
    icon: <RecyclingIcon style={{ fontSize: 50, color: 'green' }} />,
    title: 'Сдавай отходы',
    description: 'Приноси использованные батарейки, аккумуляторы, лампочки, ртутные градусники и другие отходы (смотри таблицу отходов, которые мы принимаем) в наши пункты приема.'
  },
  {
    icon: <AttachMoneyIcon style={{ fontSize: 50, color: 'gold' }} />,
    title: 'Получай бонусы',
    description: 'Бонусные баллы можно обменять на скидочные купоны, которые действуют в магазинах наших партнеров. Покупки могут быть еще более выгодными! Поможем окружающей среде и сделаем это простым и удобным способом.'
  },
  {
    icon: <DiscountIcon style={{ fontSize: 50, color: 'purple' }} />,
    title: 'Выбирай купон на скидку',
    description: 'Список наших партнеров продолжает увеличиваться. Вы сможете найти для себя самые разные товары, а скидка сделает покупку еще более приятной! '
  }
];

const mainFeaturedPost = {
  title: 'Эко-проект по утилизации опасных отходов',
  description:
    "Эффективная координация деятельности по утилизации отходов первого и второго классов опасности",
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
  linkText: '',
};

const Home = () => {
  const { social } = useSelector((state) => state.social);
  const sidebar = {
    title: 'О нас',
    description:
      'Наш проект по обработке опасных отходов первого и второго классов опасности - это инициатива, посвящённая охране окружающей среды, созданию устойчивой экосистемы и обеспечению безопасности нашего будущего! Присоединяйтесь к нам в нашем стремлении сделать мир зеленым, чистым и безопасным для всех живых существ!',
    social: social
  };
  //
  return (
      <>
        <MainFeaturedPost post={mainFeaturedPost} />        
        <Grid container spacing={5} sx={{ mt: 3 }}>
        {/*<Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h4" gutterBottom>
            Принимаем отходы
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            В 2024 году мы открыли 1-й пункт по приему отходов. Сегодня их уже 5 в 2-х городах России
          </Typography>
          <Box sx={{ mt: 3, mb: 5 }}>
            <Button type="button"                  
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Регистрация
            </Button>
          </Box>
          <Grid container spacing={4} justifyContent="center">
            {items.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box sx={{ textAlign: 'center', px: 3 }}>
                  {item.icon}
                  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            ))}



       
                <div>
                <Box sx={{ textAlign: 'center', mt: 10, mb: 10 }}>
                <Typography variant="h4" gutterBottom>
            Отходы
          </Typography>
                    <TableContainer component={Paper} sx={{ textAlign: 'justify', mt: 4, mb: 4 }}>
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
                                <TableCell>111</TableCell>
                                
                            </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box></div>
                
          </Grid>
          
          
          </Box>*/}
        
        
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
      <Box sx={{ textAlign: 'justify', mt: 2, mb: 2 }}>                            
      <Typography variant="h4" component="h1" gutterBottom>
        Sample blog post
      </Typography>      
          <Typography variant="body1" paragraph>
            Добро пожаловать в сердце экологической революции! Мы - команда страстных защитников природы, стремящихся к гармонии между человеком и окружающей средой. Наш проект по переработке опасных отходов первого и второго классов опасности - это наш ответ на вызовы нашего времени, выраженный в языке заботы, ответственности и инноваций.
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'justify', mt: 2, mb: 2 }}>
            По данным Всемирной организации здравоохранения (ВОЗ), каждый год в мире производится более 400 миллионов тонн опасных отходов. Это включает в себя отходы от промышленности, здравоохранения, сельского хозяйства, а также бытовые отходы. Опасные отходы могут содержать токсичные вещества, которые могут наносить вред здоровью людей и окружающей среде.
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'justify', mt: 2, mb: 2 }}>
          Мы верим, что каждый маленький шаг в сторону устойчивого потребления, переработки и утилизации отходов приближает нас к чистому и светлому будущему. Наша миссия не только в том, чтобы преображать опасные отходы в безопасные ресурсы, но и вдохновлять людей на заботу о драгоценной планете, которую мы делим.
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'justify', mt: 2, mb: 2 }}>
            Присоединяйтесь к нам в этом удивительном путешествии экологического созидания! Давайте вместе создадим мир, где каждый акт заботы о природе станет каплей великого океана экологического процветания. Помните: наш дом - это Земля, и только вместе мы можем защитить его и сохранить для будущих поколений.
          </Typography>
 </Box>
      </div> 

      <div>
                <Box sx={{ textAlign: 'center', mt: 10, mb: 10 }}>
                <Typography variant="h4" gutterBottom>
            Отходы
          </Typography>
                    <TableContainer component={Paper} sx={{ textAlign: 'justify', mt: 4, mb: 4 }}>
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
                                <TableCell>111</TableCell>
                                
                            </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box></div>        
        </Grid> <Sidebar
            title={sidebar.title}
            description={sidebar.description}
            archives={sidebar.archives}
            social={sidebar.social}
          />  </Grid>                                   
      </>
  );
};

export {Home};