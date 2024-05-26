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
import image from '../images/acceptance.jpg';
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

const Acceptance = () => {
    const { email, token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [value, setValue] = useState(0);

    const handleIncrement = () => {
      setValue(value + 1);
    };
  
    const handleDecrement = () => {
      setValue(value - 1);
    };

    //
    useEffect(() => {
        //доступ запрещен
        if (!email)
            navigate('/access-denied');
    }, []);

    //раздел
    const mainFeaturedPost = {
        title: 'Принять отходы',
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

    const [fields, setFields] = useState([{ id: Date.now(), value: '' }]);

    const handleAddField = () => {
    setFields([...fields, { id: Date.now(), value: '' }]);
    };

    const handleRemoveField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
    };

    const handleChange = (id, event) => {
    const newFields = fields.map((field) => {
        if (field.id === id) {
        return { ...field, value: event.target.value };
        }
        return field;
    });
    setFields(newFields);
    };

    const handleSubmit = (event) => {
    event.preventDefault();
    const data = fields.map((field) => field.value);
    console.log('Submitted data:', data);
    // Добавьте здесь код для отправки данных на сервер или другую обработку
    };

    const options = [
    { value: 10, label: 'Ten' },
    { value: 20, label: 'Twenty' },
    { value: 30, label: 'Thirty' },
    ];

    const [userData, setUserData] = useState(null);

    //useEffect
    useEffect(() => {
        //доступ запрещен
        if (!email)
            navigate('/access-denied');

        //запросы: 1-й к сервису авторизации, 2-й к бекенд-части
        const userRequest = async () => {
            try {
                const response = await fetch('https://localhost:7158/hazardouswaste/gethazardouswaste', {
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
        userRequest();//запросы
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
                                Список отходов
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Добавляйте отходы из списка, затем нажмите "Подтвердить".
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
                                    <Grid item xs={7}>
                                        <FormControl required sx={{ mb: 2 }} fullWidth>
                                            <InputLabel id={`select-label-${field.id}`}>Отход</InputLabel>
                                            <Select                                            
                                                labelId={`select-label-${field.id}`}
                                                value={field.value}
                                                label="Отход"
                                                onChange={(event) => handleChange(field.id, event)}
                                            >
                                                {userData.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.name}
                                                </MenuItem>
                                                ))}
                                            </Select>                                            
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3} mb={2}>
                                        <TextField
                                            label="Кол-во"
                                                type="number"
                                                value={value}
                                                onChange={(e) => setValue(e.target.value)}     
                                                defaultValue="1"                                           
                                            />
                                    </Grid>
                                    <Grid item xs={2} mb={2}>
                                        <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<RemoveIcon />}
                                        onClick={() => handleRemoveField(field.id)}
                                        disabled={fields.length === 1} // Не позволяем удалить последний оставшийся элемент
                                        >
                                        Удалить
                                        </Button>
                                    </Grid>
                                    </Grid>
                                ))}
                                <Box sx={{ mt: 2 }}>
                                    <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<AddIcon />}
                                    onClick={handleAddField}
                                    >
                                    Добавить
                                    </Button>
                                </Box>
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

export {Acceptance};