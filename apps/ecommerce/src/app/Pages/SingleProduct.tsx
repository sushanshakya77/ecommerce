import { AddShoppingCartOutlined } from '@mui/icons-material';
import {
  Button,
  Card,
  CircularProgress,
  Container,
  IconButton,
  Rating,
  Typography,
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((response) => response.json());

const SingleProduct = () => {
  const { id } = useParams();
  const { data, error } = useSWR(
    `https://fakestoreapi.com/products/${id}`,
    fetcher
  );
  console.log('this is singleproduct', data);
  if (error) return <div>failed to load</div>;
  if (!data) return <CircularProgress color="secondary" />;

  return (
    <div>
      <Container sx={{ display: 'flex', padding: '80px' }}>
        <img
          src={data.image}
          alt="description"
          style={{ height: '30%', width: '30%', marginLeft: '25px' }}
        />
        <div style={{ flexGrow: 1 }} />
        <div>
          <Typography variant="h4" sx={{ width: '500px', marginTop: '20px' }}>
            {data.title}
          </Typography>
          <Rating
            name="read-only"
            defaultValue={data.rating.rate}
            precision={0.5}
            readOnly
          />

          <Typography variant="h6" sx={{ width: '500px', marginTop: '2px' }}>
            Rating: {data.rating.rate}
          </Typography>
          <Typography variant="h6" sx={{ width: '500px', marginTop: '20px' }}>
            Price: ${data.price}
          </Typography>
          <Typography
            variant="body1"
            sx={{ width: '500px', marginTop: '20px' }}
          >
            {data.description}
          </Typography>
          <Typography variant="h6" sx={{ width: '500px', marginTop: '20px' }}>
            Category: {data.category}
          </Typography>

          <Button>Add To Cart</Button>
        </div>
      </Container>
    </div>
  );
};

export default SingleProduct;
