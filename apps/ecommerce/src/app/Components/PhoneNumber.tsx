import { LocalPhone } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React from 'react';

function PhoneNumber() {
  return (
    <div style={{ display: 'flex' }}>
      <LocalPhone
        sx={{ color: '#7fad39', marginLeft: '60px', marginTop: '15px' }}
      />
      <Typography sx={{ marginTop: '15px', marginLeft: '25px' }}>
        +977 9841667589
      </Typography>
    </div>
  );
}

export default PhoneNumber;
