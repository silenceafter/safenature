import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import Sidebar from '../components/sidebar';
import MainFeaturedPost from '../components/mainFeaturedPost';
import image from '../images/products.jpg';
import { Divider } from '@mui/material';
import { Grid, TextField, Box } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { logout } from '../store/actions/authActions';
import { Card, CardContent, Radio } from '@mui/material';
import { Alert } from '@mui/material';
import { Paper } from '@mui/material';
import { CardMedia } from '@mui/material';
import product_1 from '../images/shopper_1.jpg';
import product_2 from '../images/cap_2.jpg';
import product_3 from '../images/t-shirt_3.jpg';
import product_4 from '../images/hoodie_4.jpg';

const productImages = {
    1: product_1,
    2: product_2,
    3: product_3,
    4: product_4
  };

const ProductCard = ({ product, onQuantityChange }) => {
    const imageUrl = productImages[product.id];
    return (
        <Card style={{ margin: '20px', width: '200px' }}>
          <CardMedia
            component="img"
            image={imageUrl}
            alt={product.name}
            style={{ width: '100%', height: 200, objectFit: 'cover' }}
          />
          <CardContent>
            <Typography variant="h5" component="div">{product.name}</Typography>
            <Typography variant="body1" color="textSecondary">Цена: {product.bonus} бонусов</Typography>
            <TextField
              label="Количество"
              type="number"
              variant="outlined"
              size="medium"
              value={product.quantity}
              onChange={(e) => onQuantityChange(product.id, e.target.value)}
              style={{ marginTop: '20px', width: '100%' }}
            />
          </CardContent>
        </Card>
    );
  };

const Products = () => {
    const { email, token } = useSelector((state) => state.auth);
    const [userData, setUserData] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDiscountId, setSelectedDiscountId] = useState(null);
    const [selectedDiscountBonus, setSelectedDiscountBonus] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitResult, setSubmitResult] = useState(null);
    const [products, setProducts] = useState([]);
    //
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await fetch('https://localhost:7158/product/get-products', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
    
            if (response.ok) {
              const data = await response.json();
              const productsWithQuantity = data.map(product => ({ ...product, quantity: 0 }));
              setProducts(productsWithQuantity);
            } else {
              console.error('Failed to fetch products');
            }
          } catch (error) {
            console.error('Error:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchProducts();
      }, [token]);
    
      const handleQuantityChange = (id, quantity) => {
        setProducts(products.map(product => 
          product.id === id ? { ...product, quantity: parseInt(quantity, 10) } : product
        ));
      };
    

    const handleSelect = (id, bonus) => {
        setSelectedDiscountId(id);//храним выбранный id карты
        setSelectedDiscountBonus(bonus);//храним количество бонусов, которое стоит купон
        console.log('Selected Discount ID:', id); // Здесь вы получаете значение выбранной карточки
    };

    //раздел
    const mainFeaturedPost = {
        title: 'Наши товары',
        description: "",
        image: image,
        imageText: 'main image description',
        linkText: '',
    };

    //информация о странице
    const sidebar = {
    title: 'Товары',
    description:
        'Наши товары прекрасно дополнят любой гардероб благодаря своим базовым цветам - белому, бежевому и черному. Не упустите шанс добавить стильные и экологически чистые вещи в свою коллекцию!',    
    social: [
        { name: 'GitHub', icon: GitHubIcon },
        { name: 'X', icon: XIcon },
        { name: 'Facebook', icon: FacebookIcon },
    ],
    };

    //собрать данные из элементов и отправить запрос на сервер
    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitLoading(true);
        const dataToSend = {
            email: email,
            discountId: selectedDiscountId
        };
    
        try {
          const response = await fetch('https://localhost:7158/receivingdiscount/register-discount-reserve', {
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
        } catch (error) {
          console.error('Error:', error);
          setSubmitResult({ success: false, message: 'Ошибка. Данные не приняты.' });
        } finally {
            setSubmitLoading(false);
            setTimeout(() => setSubmitResult(null), 3000);

            //обновляем баланс после успешного запроса
            try {
                const response2 = await fetch('https://localhost:7158/user/get-account-balance', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
    
                if (response2.ok) {
                    const balanceResponse = await response2.json();
                    setUserBalance(balanceResponse);
                } else {
                    if (response2.status === 401) {
                        dispatch(logout());
                        navigate('/login');
                    }
                }
            } catch (error) {
                setError(error);
            }
        }
      };  

    //useEffect
    /*useEffect(() => {
        //доступ запрещен
        if (!email)
            navigate('/access-denied');
        
        //1 получить список доступных купонов
        const userRequest = async () => {
            try {
                const response = await fetch('https://localhost:7158/receivingdiscount/get-discounts', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
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
                        const response2 = await fetch('https://localhost:7158/user/get-account-balance', {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            }
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
    }, []);*/

    const selectedProducts = products.filter(product => product.quantity > 0);

    //рендер
    /*if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }*/
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
                    <Paper elevation={3} style={{ padding: '16px', marginTop: '16px', height: '100%', overflow: 'hidden' }}>
                        <Box sx={{ textAlign: 'justify', mt: 2, mb: 2, height: '100%', overflow: 'hidden' }}>
                            <Typography variant="h4" component="h1" gutterBottom>
                                Список товаров
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Посмотрите наши прекрасные товары! Теперь у нас есть шопперы, худи, футболки и кепки - все с логотипом 
                                нашего экологического бренда. Они изготовлены из натуральных тканей, и самое классное - их можно обменять 
                                на бонусы для всех участников нашего экологического проекта!
                            </Typography>            
                            <Grid container direction="row" spacing={2}> {}
                                {products.map((product) => (
                                <Grid item xs={12} md={6} key={product.id}> {/* для экранов меньших (xs) один элемент в строке, для экранов больших (md) два элемента в строке */}
                                    <ProductCard product={product} onQuantityChange={handleQuantityChange} />
                                </Grid>
                                ))}
                            </Grid>
                            <Divider style={{ marginTop: '32px' }} />
                            <Box sx={{ textAlign: 'justify', mt: 2, mb: 2, height: '100%', overflow: 'hidden' }}>
                                <Typography variant="h4" component="h1" gutterBottom>
                                    Итого
                                </Typography>
                            </Box>
                            {selectedProducts.length > 0 && (
                                <Box sx={{ mt: 2, mb: 2 }}>
                                    {selectedProducts.map((product) => (
                                        <Typography key={product.id} variant="body2" color="textSecondary">
                                            {product.name} {product.quantity} штуки = {product.quantity * product.bonus} бонусов
                                        </Typography>
                                    ))}
                                </Box>
                            )}
                            

                            <Box sx={{ mt: 2, mb: 2 }}>
                                <TextField
                                    label='Кол-во бонусов'
                                    value={userBalance?.bonus}
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    margin="normal"
                                />
                                {selectedDiscountBonus && (
                                    <Typography variant="body1" paragraph>
                                        Будет списано { selectedDiscountBonus } бонусов. Баллов на счете 
                                        <Box component="span" sx={{ color: userBalance?.bonus >= selectedDiscountBonus ? 'inherit' : 'red' }}>
                                            { userBalance?.bonus >= selectedDiscountBonus ? ' достаточно' : ' не достаточно' }.
                                        </Box>
                                    </Typography>
                                )}                                
                                <Button                            
                                    variant="contained"
                                    color="secondary"
                                    type="submit"
                                    onClick={handleSubmit}
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

export {Products};