import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/authActions';

function Header(props) {
  const { /*sections,*/ title } = props;
  const { email, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  /*const handleLogout = () => {
    dispatch(logout());
    //localStorage.removeItem(email, token);
  }*/

  //список страниц для header
  let sections = [];
  if (email) {
    //для авторизованных пользователей
    sections = [
      { title: 'Главная', url: '/' },
      { title: 'О нас', url: '/about' },
      { title: 'Магазины-партнеры', url: '/partners' },
      { title: 'Товары бренда', url: '/products' },
      { title: 'Аккаунт', url: '/account' },
      { title: 'Обмен бонусов', url: '/bonus-exchange' },
      { title: 'Расчет бонусов', url: '/bonus-calculation' },
      { title: 'Карта пунктов приёма отходов', url: '/points' },
    ];
  } else {
    //для гостей
    sections = [
      { title: 'Главная', url: '/' },
      { title: 'О нас', url: '/about' },
      { title: 'Магазины-партнеры', url: '/partners' },
      { title: 'Товары бренда', url: '/products' },
      { title: 'Карта пунктов приёма отходов', url: '/points' },
    ];
  }

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button size="small">Subscribe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
       { email 
          ? (
              <Button variant="outlined" size="small" component={RouterLink} to="/logout">
                Выйти
              </Button>
            ) 
          : (
              <Button variant="outlined" size="small" component={RouterLink} to="/login">
                Войти
              </Button>
            )
        }
               
            
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  /*sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,*/
  title: PropTypes.string.isRequired,
};
//<Link to="/">Главная страница</Link>
export default Header;