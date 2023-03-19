import { Typography } from '@mui/material';
import  React, { useState , useEffect } from 'react';
import { InfoLabel } from '../InfoLabel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export const Time = () => {
  const [ date,setDate ] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(()=>setDate(new Date()), 1000 );
    return () => clearInterval(timer);
  });

  return(
    <InfoLabel>
      <AccessTimeIcon />
      <Typography>{date.toLocaleTimeString()}</Typography>
    </InfoLabel>
  );
};
