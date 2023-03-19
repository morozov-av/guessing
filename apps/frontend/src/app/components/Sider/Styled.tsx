import SpeedIcon from '@mui/icons-material/Speed';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const SliderWrapper = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}));

export const LabelContainer = styled(Box)(() => ({
  display: 'flex'
}));

export const StyledSpeedIcon =    styled(SpeedIcon)(({ theme }) => ({
  paddingRight: theme.spacing(1)
}));
