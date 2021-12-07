import { LocalPhone } from '@mui/icons-material';
import { Button, TextField, Typography } from '@mui/material';
import React from 'react';

function Search() {
  return (
    <div>
      <TextField
        id="outlined-basic"
        placeholder="Search"
        variant="outlined"
        sx={{ width: '520px' }}
      >
        <Button>Search</Button>
      </TextField>
      {/* <div style={{ flexGrow: '1' }} /> */}
    </div>
  );
}

export default Search;
