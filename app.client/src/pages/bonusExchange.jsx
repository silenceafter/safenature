//import * as React from 'react';
//import CssBaseline from '@mui/material/CssBaseline';
//import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
//import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import Main from '../components/main';
import Sidebar from '../components/sidebar';
import MainFeaturedPost from '../components/mainFeaturedPost';
import image from '../images/bonusExchange.jpg';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper, IconButton, Divider
} from '@mui/material';
import { Container, Grid, TextField, FormControlLabel, Checkbox, Box, Autocomplete, Chip  } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import { login, logout } from '../store/actions/authActions';
import { Card, CardContent, Radio } from '@mui/material';

function formatDate(dateString) {
    //форматирование даты в дд.мм.гггг
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы от 0 до 11
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

const BonusExchange = () => {
    const { email, token } = useSelector((state) => state.auth);
    const [userData, setUserData] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDiscountId, setSelectedDiscountId] = useState(null);
    const [selectedDiscountBonus, setSelectedDiscountBonus] = useState(null);
    //
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSelect = (id, bonus) => {
        setSelectedDiscountId(id);//храним выбранный id карты
        setSelectedDiscountBonus(bonus);//храним количество бонусов, которое стоит купон
        console.log('Selected Discount ID:', id); // Здесь вы получаете значение выбранной карточки
    };
    const DiscountCard = ({ discount, isSelected, onSelect }) => (
        <Card
          key={discount.id}
          onClick={() => onSelect(discount.id, discount.bonus)}
          style={{
            margin: '10px',
            cursor: 'pointer',
            border: isSelected ? '2px solid #3f51b5' : '1px solid #ccc'
          }}
        >
          <CardContent>        
            <Typography variant="body2" component="div"><strong>Описание:</strong> {discount.conditions}</Typography>
            <Box mt={0.5}>
                <Typography variant="body2" component="div">
                    <strong>Магазин:</strong> {discount.storeName}
                </Typography>
            </Box>
            <Box mt={0.5}>
                <Typography variant="body2" component="div" align="left">
                    <strong>Действует:</strong> {formatDate(discount.dateStart)} - {formatDate(discount.dateEnd)}
                </Typography>
            </Box>
            <Radio
              checked={isSelected}
              value={discount.id}
              readOnly
            />
          </CardContent>
        </Card>
    );
    const DiscountCardList = ({ discounts }) => {
        return (
            <Grid container spacing={2} sx={{maxHeight: 600, overflowY: 'auto', p: 2}}>
            {discounts.map((discount) => (
                <Grid item xs={12} sm={6} md={4} key={discount.id}>
                <DiscountCard
                    discount={discount}
                    isSelected={selectedDiscountId === discount.id}
                    onSelect={handleSelect}
                />
                </Grid>
            ))}
            </Grid>
        );
    };

    //раздел
    const mainFeaturedPost = {
        title: 'Обменять бонусы',
        description: "",
        image: image,
        imageText: 'main image description',
        linkText: '',
    };

    //информация о странице
    const sidebar = {
    title: 'About',
    description:
        'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
    
    social: [
        { name: 'GitHub', icon: GitHubIcon },
        { name: 'X', icon: XIcon },
        { name: 'Facebook', icon: FacebookIcon },
    ],
    };



    //собрать данные из элементов и отправить запрос на сервер
    const handleSubmit = async (event) => {
        event.preventDefault();
        const dataToSend = {
            email: email,
            discountId: selectedDiscountId
        };
    
        try {
          const response = await fetch('https://localhost:7158/receivingdiscount/registerdiscountreserve', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dataToSend),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const result = await response.json();
          console.log('Success:', result);
          // Handle success (e.g., show a success message)
        } catch (error) {
          console.error('Error:', error);
          // Handle error (e.g., show an error message)
        }
      };  

    //useEffect
    useEffect(() => {
        //доступ запрещен
        if (!email)
            navigate('/access-denied');
        
        //1 получить список доступных купонов
        const userRequest = async () => {
            try {
                const response = await fetch('https://localhost:7158/receivingdiscount/getdiscounts', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                //
                if (response.ok) {
                    const userResponse = await response.json();
                    let items = [];
                    for(const item of userResponse) {
                        items.push(
                            {
                                id: item.id,
                                storeName: item.partner.name,
                                conditions: item.terms,
                                bonus: item.bonuses,
                                dateStart: item.dateStart,
                                dateEnd: item.dateEnd
                            }
                        );
                    }
                    setUserData(items);

                    //2 запрос баланса
                    try {
                        const response2 = await fetch('https://localhost:7158/user/getaccountbalance', {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ Email: email })
                        });
                        //
                        if (response2.ok) {
                            const balanceResponse = await response2.json();
                            setUserBalance(balanceResponse);
                        } else {
                            if (response.status === 401) {
                                //токен не действует
                                dispatch(logout());//удалить токен
                                navigate('/login');
                            }
                        }
                    } catch(error) {
                        setError(error);
                    }
                } else {
                    if (response.status === 401) {
                        //токен не действует
                        dispatch(logout());//удалить токен
                        navigate('/login');
                    }                
                }
            } catch (error) {
                setError(error);
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
                        <Box sx={{ textAlign: 'justify', mt: 2, mb: 2 }}>
                            <Typography variant="h4" component="h1" gutterBottom>
                                Обмен бонусов
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Выберите скидочный купон из списка. Подтвердите списание бонусных баллов со счета.
                            </Typography>            
                            <DiscountCardList discounts={userData} onSelect={handleSelect} />
                            <Box sx={{ mt: 2, mb: 2 }}>
                                <TextField
                                    label='Кол-во бонусов'
                                    value={userBalance.bonus}
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                    readOnly: true,
                                    }}
                                    margin="normal"
                                />
                                <Typography variant="body1" paragraph>
                                    Будет списано { selectedDiscountBonus } бонусов. Баллов на счете 
                                    <Box component="span" sx={{ color: userBalance.bonus >= selectedDiscountBonus ? 'inherit' : 'red' }}>
                                        { userBalance.bonus >= selectedDiscountBonus ? ' достаточно' : ' не достаточно' }.
                                    </Box>
                                </Typography>
                                <Button                            
                                    variant="contained"
                                    color="secondary"
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                Подтвердить
                                </Button>
                            </Box>
                        </Box>                                    
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

export {BonusExchange};