import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import Sidebar from '../components/sidebar';
import MainFeaturedPost from '../components/mainFeaturedPost';
import image from '../images/acceptance.jpg';
import { Divider } from '@mui/material';
import { Grid, TextField, Box  } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CircularProgress from '@mui/material/CircularProgress';
import { login, logout } from '../store/actions/authActions';
import Alert from '@mui/material/Alert';

const Acceptance = () => {
    const { email, token } = useSelector((state) => state.auth);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);//для submit
    const [submitResult, setSubmitResult] = useState(null);
    const { social } = useSelector((state) => state.social);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [value, setValue] = useState(1);
    let timeoutId;

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
    
    social: social,
    };

    //рассчитаем бонусы
    const calculateBonus = (selectValue, quantityValue) => {
        const selectedItem = userData.find(item => item.id === selectValue);
        return selectedItem ? selectedItem.bonuses * quantityValue : 0;
    };

    //state формы
    const [fields, setFields] = useState([
        { id: 1, selectValue: '', textFieldQuantityValue: 1, textFieldBonusValue: 0 }
      ]);

    //добавить строку
    const handleAddField = () => {
        setFields([...fields, { id: fields.length + 1, selectValue: '', textFieldQuantityValue: 1, textFieldBonusValue: 0 }]);
    };

    //удалить строку
    const handleRemoveField = (id) => {
        setFields(fields.filter((field) => field.id !== id));
    };

    //изменить значение Select
    const handleSelectChange = (id, newValue) => {
        const field = fields.find(field => field.id === id);
        const quantityValue = field ? field.textFieldQuantityValue : 0;
        //
        setFields(fields.map((field) =>
          field.id === id ? { ...field, selectValue: newValue, textFieldBonusValue: calculateBonus(newValue, quantityValue) } : field
        ));
    };
    
    //изменить значение TextValue1
    const handleTextFieldQuantityChange = (id, newValue) => {
        const field = fields.find(field => field.id === id);
        const selectValue = field ? field.selectValue : '';

        setFields(fields.map((field) =>
            field.id === id ? { ...field, textFieldQuantityValue: newValue, textFieldBonusValue: calculateBonus(selectValue, newValue) } : field
        ));
    };

    //изменить значение TextValue2
    const handleTextFieldBonusChange = (id, newValue) => {
        setFields(fields.map((field) =>
            field.id === id ? { ...field, textFieldBonusValue: newValue } : field
        ));
    };

    //собрать данные из элементов и отправить запрос на сервер
    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitLoading(true);
        const dataToSend = fields.map(field => ({
          email: email,
          hazardousWasteId: field.selectValue,
          quantity: field.textFieldQuantityValue
        }));
    
        try {
          const response = await fetch('https://localhost:7158/acceptance/register-dispose', {
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
          setSubmitResult({ success: true, message: 'Данные приняты!' });
          setFields([{ id: 1, selectValue: '', textFieldQuantityValue: 1, textFieldBonusValue: 0 }]);//оставить первую строку, очистить элементы
        } catch (error) {
          console.error('Error:', error);
          setSubmitResult({ success: false, message: 'Ошибка при отправке данных.' });
        } finally {
            setSubmitLoading(false);
            setTimeout(() => setSubmitResult(null), 3000);
        }
      };  

    //useEffect
    useEffect(() => {
        //доступ запрещен
        if (!email)
            navigate('/access-denied');
        
        //запросы: 1-й к сервису авторизации, 2-й к бекенд-части
        const userRequest = async () => {
            try {
                const response = await fetch('https://localhost:7158/hazardouswaste/get-hazardous-waste', {
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
        return () => 
            // Очистка таймера при размонтировании компонента
            clearTimeout();
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
                                    <Grid item xs={6}>
                                        <FormControl required sx={{ mb: 2 }} fullWidth>
                                            <InputLabel id={`select-label-${field.id}`}>Отход</InputLabel>
                                            <Select                                            
                                                labelId={`select-label-${field.id}`}
                                                value={field.selectValue}
                                                label="Отход"
                                                onChange={(event) => handleSelectChange(field.id, event.target.value, 0)}
                                            >
                                                {userData.map((option) => (
                                                <MenuItem key={option.id} value={option.id}> 
                                                    {option.name}
                                                </MenuItem>
                                                ))}
                                            </Select>                                            
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2} mb={2}>
                                        <TextField
                                            label="Кол-во"
                                            type="number"
                                            value={field.textFieldQuantityValue}
                                            onChange={(event) => handleTextFieldQuantityChange(field.id, parseInt(event.target.value, 10) || 0)}
                                            />
                                    </Grid>
                                    <Grid item xs={2} mb={2}>
                                        <TextField
                                            readOnly={true}
                                            label="Бонусы"
                                            type="number"
                                            value={field.textFieldBonusValue}                                           
                                        />
                                    </Grid>
                                    <Grid item xs={2} mb={2}>
                                        <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<RemoveIcon />}
                                        onClick={() => handleRemoveField(field.id)}
                                        disabled={fields.length === 1} //не позволяем удалить последний оставшийся элемент
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
                                    disabled={submitLoading}
                                    startIcon={submitLoading ? <CircularProgress size={24} /> : null}
                                    >
                                    Подтвердить
                                    </Button>
                                </Box>
                                {submitResult && (
                                    <Box sx={{ mt: 2 }}>
                                        <Alert severity={submitResult.success ? 'success' : 'error'}>
                                            {submitResult.message}
                                        </Alert>
                                    </Box>
                                )}
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