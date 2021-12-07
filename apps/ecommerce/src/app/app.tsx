import { Container, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/system';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import MainContent from './Pages/MainContent';
import Register from './Pages/Register';
import SingleProduct from './Pages/SingleProduct';

// const theme = createTheme({
//   palette: {
//     type: '#dddddd',
//   },
// });

export function App() {
  return (
    // <ThemeProvider theme={font}>
    <Routes>
      <Route
        path="/"
        element={
          <Container maxWidth="lg">
            <MainContent />
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
