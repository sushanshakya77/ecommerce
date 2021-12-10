import { CircularProgress, Container, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/system';
import axios from 'axios';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import MainContent from './Pages/MainContent';
import Register from './Pages/Register';
import SingleProduct from './Pages/SingleProduct';
import PrivateRoute from './Routes/PrivateRoute';
import { useAuthentication } from './UseAuthentication/UseAuthentication';

export function App() {
  const { authState, fetchAuthState } = useAuthentication();
  useEffect(() => {
    fetchAuthState();
  }, [fetchAuthState]);
  // console.log(authState);

  if (authState === 'uncertain') return <CircularProgress color="secondary" />;
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
          <Route index element={<Home />} />
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
