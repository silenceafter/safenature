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

const BonusExchange = () => {
    const { email, token } = useSelector((state) => state.auth);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [value, setValue] = useState(1);
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

    //state формы
    const [fields, setFields] = useState([
        { id: 1, selectValue: '', textFieldValue: 1 }
      ]);

    //добавить строку
    const handleAddField = () => {
        setFields([...fields, { id: fields.length + 1, selectValue: '', textFieldValue: 1 }]);
    };

    //удалить строку
    const handleRemoveField = (id) => {
        setFields(fields.filter((field) => field.id !== id));
    };

    //изменить значение Select
    const handleSelectChange = (id, newValue) => {
        setFields(fields.map((field) =>
          field.id === id ? { ...field, selectValue: newValue } : field
        ));
    };
    
    //изменить значение TextValue
    const handleTextFieldChange = (id, newValue) => {
    setFields(fields.map((field) =>
        field.id === id ? { ...field, textFieldValue: newValue } : field
    ));
    };

    //собрать данные из элементов и отправить запрос на сервер
    const handleSubmit = async (event) => {
        event.preventDefault();
        const dataToSend = fields.map(field => ({
          email: email,
          hazardousWasteId: field.selectValue,
          quantity: field.textFieldValue
        }));
    
        try {
          const response = await fetch('https://localhost:7158/acceptance/registerdispose', {
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
        
        //получить список доступных купонов
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
                    setUserData(userResponse);
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
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'justify',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    width: '100%',
                                    bgcolor: 'background.paper',
                                    p: 4,
                                    borderRadius: 1,
                                    boxShadow: 3,
                                    pl: 3.5,
                                    pr: 6
                                }}
                            >
                                {fields.map((field, index) => (
                                    <Grid container spacing={2} alignItems="center" key={field.id}>
                                        <Grid item xs={12}>
                                            <FormControl required sx={{ mb: 2 }} fullWidth>
                                                <InputLabel id={`select-label-${field.id}`}>Скидка</InputLabel>
                                                <Select                                            
                                                    labelId={`select-label-${field.id}`}
                                                    value={field.selectValue}
                                                    label="Отход"
                                                    onChange={(event) => handleSelectChange(field.id, event.target.value)}
                                                >
                                                    {userData.map((option) => (
                                                    <MenuItem key={option.id} value={option.id}>
                                                        {option.terms}
                                                    </MenuItem>
                                                    ))}
                                                </Select>                                            
                                            </FormControl>
                                        </Grid>
                                    
                                    </Grid>
                                ))}                                
                                <Box sx={{ mt: 1 }}>
                                    <Button                            
                                    variant="contained"
                                    color="secondary"
                                    type="submit"
                                    >
                                    Подтвердить
                                    </Button>
                                </Box>
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