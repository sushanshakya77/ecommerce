import { Grid } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Banner from '../Components/Banner';
import MenuLists from '../Components/MenuLists';
import Navbar from '../Components/Navbar';
import PhoneNumber from '../Components/PhoneNumber';
import Search from '../Components/Search';
import Home from './Home';
import SingleProduct from './SingleProduct';

function MainContent() {
  return (
    <div>
      <Navbar />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <MenuLists />
        </Grid>
        <Grid item xs={6}>
          <Search />
        </Grid>
        <Grid item xs={3}>
          <PhoneNumber />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
}

export default MainContent;
