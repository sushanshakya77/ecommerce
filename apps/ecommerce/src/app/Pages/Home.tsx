import { AddShoppingCart, FavoriteBorder, MoreVert } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import React from 'react';
import useSWR from 'swr';
import Banner from '../Components/Banner';
import { Link } from 'react-router-dom';

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((response) => response.json());

interface IProducts {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: any;
}

function Home() {
  const { data, error } = useSWR('https://fakestoreapi.com/products', fetcher);
  console.log(data);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <Banner />
      <div style={{ display: 'flex' }}>
        <Typography variant="h3" sx={{ margin: 'auto', marginTop: '20px' }}>
          Featured Products
        </Typography>
      </div>
      <div>
        <Grid container spacing={4} sx={{ maxWidth: '120%', margin: 'auto' }}>
          {data.map((products: IProducts) => (
            <Grid item key={products.id}>
              <Card
                sx={{
                  width: '350px',
                  height: '580px',
                  overflow: 'hidden',
                  transition: 'transform 0.6s',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <Link
                  to={`/products/${products.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <CardMedia
                    component="img"
                    image={products.image}
                    alt="green iguana"
                    sx={{
                      // paddingLeft: '40px',
                      // paddingRight: '-40px',
                      height: '320px',
                      width: '90%',
                      // backgroundPosition: '50% 50%',
                      // borderRadius: '5px',
                      // paddingTop: "56.25%",
                      // transition: 'transform 0.6s',
                      objectFit: 'cover',
                      boxShadow: 'none',
                      // '&:hover': { transform: 'scale(1.1)' },
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      color="text.primary"
                      sx={{
                        height: '100px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {products.title}
                    </Typography>
                    {/* <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {products.description}
                  </Typography> */}
                    <Typography variant="h6" color="text.secondary">
                      Price: ${products.price}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Rating: {products.rating.rate}
                    </Typography>
                  </CardContent>
                </Link>
                <CardActions>
                  <IconButton size="small">
                    <FavoriteBorder />
                  </IconButton>
                  <IconButton size="small">
                    <AddShoppingCart />
                  </IconButton>
                  <div style={{ flexGrow: 1 }} />
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Home;
