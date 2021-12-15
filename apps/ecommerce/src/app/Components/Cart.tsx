import { Button, Drawer, SwipeableDrawer, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

const Cart = ({ open, toggleDrawer }: any) => {
  return (
    <div>
      <React.Fragment>
        <Drawer anchor="right" open={open} onClose={toggleDrawer}>
          <Typography variant="h3"> Cart Items </Typography>
          <Typography> You have no added item in cart. </Typography>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default Cart;
