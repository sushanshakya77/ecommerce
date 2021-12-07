import { Card, Typography } from '@mui/material';
import styled from '@emotion/styled';
import React from 'react';

const StyledBanner = styled(Card)`
  background-color: #dddddd;
  height: 450px;
  width: 100%;
`;

function Banner() {
  return (
    <div style={{ marginTop: '30px' }}>
      <StyledBanner>
        <div style={{ marginTop: '150px', marginLeft: '70px' }}>
          <Typography sx={{ fontWeight: 'bold' }}>New Clothes</Typography>
          <Typography variant="h4">
            100% Authentic
            <br /> Clothes
          </Typography>
          <Typography variant="caption" gutterBottom>
            Free Pickup and Delivery
          </Typography>
        </div>
        <div style={{ position: 'absolute' }}>
          <img
            src="https://i.pinimg.com/564x/64/61/4a/64614aea35583d7eb9b12753f0817ab3.jpg"
            alt="logo"
            style={{
              position: 'relative',
              width: '120%',
              bottom: 250,
              left: 450,
            }}
          />
        </div>
      </StyledBanner>
    </div>
  );
}

export default Banner;
