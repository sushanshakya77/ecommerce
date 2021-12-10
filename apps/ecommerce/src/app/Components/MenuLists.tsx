import {
  AttachMoney,
  ExpandLess,
  ExpandMore,
  Female,
  Headphones,
  Male,
  Menu,
  StarBorder,
} from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Zoom,
} from '@mui/material';
import React from 'react';
import styled from '@emotion/styled';
import useSWR from 'swr';
import { Link, useNavigate } from 'react-router-dom';

interface IProducts {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: any;
}

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((response) => response.json());

function MenuLists() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();

  const { data, error } = useSWR(`https://fakestoreapi.com/products`, fetcher);
  console.log(data);
  if (error) return <div>failed to load</div>;
  if (!data) return <CircularProgress color="secondary" />;
  return (
    <div>
      <ListItemButton
        onClick={handleClick}
        sx={{
          backgroundColor: '#7fad39',
          color: 'white',
          borderRadius: '2px',
          marginTop: '5px',
          '&:hover': {
            backgroundColor: '#688d31',
          },
        }}
      >
        <ListItemIcon sx={{ color: 'white' }}>
          <Menu />
        </ListItemIcon>
        <ListItemText primary="All Categories" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{
            display: 'flex',
            marginTop: '10px',
            width: '100%',
          }}
          key={data.id}
        >
          <Zoom in={open} style={{ transitionDelay: open ? '100ms' : '0ms' }}>
            <ListItemButton>
              <ListItemIcon>
                <Headphones />
              </ListItemIcon>
              <ListItemText primary="Electronics" />
            </ListItemButton>
          </Zoom>
          <Zoom in={open} style={{ transitionDelay: open ? '250ms' : '0ms' }}>
            <ListItemButton>
              <ListItemIcon>
                <AttachMoney />
              </ListItemIcon>
              <ListItemText primary="Jewelery" />
            </ListItemButton>
          </Zoom>
          <Zoom in={open} style={{ transitionDelay: open ? '450ms' : '0ms' }}>
            <ListItemButton>
              <ListItemIcon>
                <Male />
              </ListItemIcon>
              <ListItemText primary="Men's Clothing" sx={{ width: '120px' }} />
            </ListItemButton>
          </Zoom>
          <Zoom in={open} style={{ transitionDelay: open ? '650ms' : '0ms' }}>
            <ListItemButton>
              <ListItemIcon>
                <Female />
              </ListItemIcon>
              <ListItemText
                primary="Women's Clothing"
                sx={{ width: '160px' }}
              />
            </ListItemButton>
          </Zoom>
        </List>
      </Collapse>
    </div>
  );
}

export default MenuLists;
