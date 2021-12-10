import React from 'react';
import styled from '@emotion/styled';
import {
  ShoppingCart,
  Menu,
  AccountCircle,
  ExitToApp,
  FavoriteBorder,
} from '@mui/icons-material';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuthentication } from '../UseAuthentication/UseAuthentication';

const StyledAppBar = styled(AppBar)`
  background: white;
`;
const NavButton = styled(Button)`
  margin-left: 25px;
  color: black;
  font-family: 'Cairo', sans-serif;
  font-weight: 700;
  font-size: 15px;
  text-decoration: none;
  &:hover {
    color: green;
  }
`;

function Navbar() {
  const { token } = useAuthentication();

  const handleClick = () => {
    axios
      .post(
        '/api/auth/logout',
        {},
        { headers: { Authorization: 'Bearer' + token } }
      )
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div>
      <StyledAppBar
        elevation={0}
        position="static"
        color="transparent"
        style={{ height: '85px' }}
      >
        <Toolbar>
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton> */}
          <Link to="/">
            <img
              style={{ height: '40px' }}
              src="data:image/webp;base64,UklGRpgDAABXRUJQVlA4TIwDAAAvdkAMEO/BJpJkK72vXvT4ZqS4w78Aam04jiRJarJ3X/C6wSD8N0lqto0kSak5fjws8o+QCI5hE9m2E36dOGS6bAJrWKJCBH0SkBQ86JkfCJ731Wu9DYoxhk1iYOGSWLi2AMTIUCbp2vbvvU4Zlu97fkrCV1AqChChRlVJEpY17VzODKoiVZlcTPof1Zj/kOHNnMe9fc+x9IOw1RQzNUVBYaC8NAIVKIrgiYj6/3UEbdu22tjRVkQIwcY5lHHsfHMOpv//w84phDxab/0Q0f8JQOGPP35D8ck1dvJ7Sp+/Fpw/57Od+JFSSh+/Kye3OeebPUnpDYCr55xzft6JL1p6i5usn+/Du5TSp5RS+vPpyOU+fEopfTyklNK/Oef7nPPVPiT5TvyVc77bj4NySCm9vs93jznni314LdLrlNL7+6ernHM+2Yfvyivl+mfO+RE7eRCvDym9ur7OOeeLvfhdvH+f0t+XOef8gN38Jl6l9xc55/xwuh/4fkjpx4d/cs755hQ72VtHki9edqfnl+enKO8nF0hycaZvyhaqfRHVqcSQpFMMZVdiAgt9h/LGBBa7okjdVmD8JdqFK21R57mybDoSaiy/QgxcbQsGri7zR9hXoNmuWVhxOjLwuHPOrYokGYStEdrNLNWlB9CaoLBT2qC5HmrTT7ZkErMINei26qha6DEoTnFUB1QOohMcarDfyCoLjvcKI4CO6oDKPUl6ODGvCSI021DtCuAUA8AqM2pbMWEUbFZMgSTtJp2yoHRQHICgxGpBdGiVYYUZBbstjDIVRSUAkdKj9kCSAYAX8xo44beYlLEICoFOcQpLj8zCApgEmzVR0GzglK6OUUythnIAEJVhDYxg/O8ZlAYAgnCr4IWrNyvDFraWEzOkFWxXdYJjNaOYolbxQKc4xUhf0lKOSq+MqzCJ0NQalKVoUGYgKmyE6kpGpXxZ1wSSnGu1CmOJU0YAQTF1lgpsV6EXdJWwKK6gp9oAsEpoa7SsOa7DLNQag0J7JAbFAkBUuLQVpipLhTZsgUWh6wG0hmpoBazCYFrRLgVe6Y57wXYdxk1iUFYOUBuvkPTOeeoAIuWM45MyVYDbAl2FAUdjOFIMYFLGgqj4GnETxLAiDChs3boAIChtAbxgrACzCRpbZFuUD74smAboKReUWmWq0fhNgGacPUnvxhbro3FeLM50kFYxRb3ia6Db6H8TAQ=="
              alt="logo"
            />
          </Link>

          <div style={{ flexGrow: 1 }} />
          <div style={{ marginTop: '15px' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <NavButton variant="text">HOME</NavButton>
            </Link>
            <Link to="/shop" style={{ textDecoration: 'none' }}>
              <NavButton variant="text">SHOP</NavButton>
            </Link>
            <NavButton variant="text">SHOP Details</NavButton>
            <NavButton variant="text">BLOG</NavButton>
          </div>
          <div style={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <ShoppingCart />
          </IconButton>
          <IconButton color="inherit">
            <FavoriteBorder />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <IconButton edge="end" color="inherit" onClick={handleClick}>
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </StyledAppBar>
    </div>
  );
}

export default Navbar;
