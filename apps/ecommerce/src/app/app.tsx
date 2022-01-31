import { CircularProgress, Container, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Navbar from './Components/Navbar';
import Category from './Pages/Category';
import Home, { IProducts } from './Pages/Home';
import Login from './Pages/Login';
import MainContent from './Pages/MainContent';
import Register from './Pages/Register';
import SingleProduct from './Pages/SingleProduct';
import PrivateRoute from './Routes/PrivateRoute';
import { useAuthentication } from './UseAuthentication/UseAuthentication';

export function App() {
  const [cartItems, setCartItems] = useState([] as IProducts[]);
  //add to cart
  const handleAddToCart = (clickedItem: IProducts) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id ? { ...item, price: item.price + 1 } : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, price: 1 }];
    });
  };
  //recoil fetch
  const { authState, fetchAuthState } = useAuthentication();

  //check for refreshtoken
  useEffect(() => {
    fetchAuthState();
  }, [fetchAuthState]);
  // console.log(authState);

  if (authState === 'uncertain')
    return (
      <CircularProgress
        color="secondary"
        sx={{ marginTop: '200px', marginRight: '200px' }}
      />
    );
  else
    return (
      // <ThemeProvider theme={font}>
      <Routes>
        <Route
          path="/"
          element={
            <Container maxWidth="lg">
              <PrivateRoute>
                <MainContent />
              </PrivateRoute>
            </Container>
          }
        >
          <Route index element={<Home handleAddToCart={handleAddToCart} />} />
          <Route path="/products/categories/:category" element={<Category />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/shop" />
          <Route path="/shopdetails"></Route>
          <Route path="/blog"></Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      // </ThemeProvider>
    );
}

export default App;
