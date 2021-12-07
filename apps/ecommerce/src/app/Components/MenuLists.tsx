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
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';
import styled from '@emotion/styled';

// const CategoryLists = styled(ListItemButton)`

//     &:hover {
//             backgroundColor: '#688d31',
//           }

// `;

function MenuLists() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
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
          sx={{ display: 'flex', marginTop: '10px' }}
        >
          <ListItemButton>
            <ListItemIcon>
              <Headphones />
            </ListItemIcon>
            <ListItemText primary="Electronics" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <AttachMoney />
            </ListItemIcon>
            <ListItemText primary="Jewelery" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Male />
            </ListItemIcon>
            <ListItemText primary="Men's Clothing" sx={{ width: '120px' }} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Female />
            </ListItemIcon>
            <ListItemText primary="Women's Clothing" sx={{ width: '160px' }} />
          </ListItemButton>
        </List>
      </Collapse>
    </div>
  );
}

export default MenuLists;
