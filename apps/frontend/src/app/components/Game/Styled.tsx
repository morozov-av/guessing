import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ChartWrapper = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));
