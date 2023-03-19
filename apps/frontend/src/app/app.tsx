import { createTheme, ThemeProvider } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import { FC } from 'react';
import { Footer } from './components/Footer/Footer';
import { Game } from './components/Game/Game';
import { Sider } from './components/Sider/Sider';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

const App: FC = () => (
  <ThemeProvider theme={darkTheme}>
  <Box sx={{ padding: '50px' }}>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 2 }}>
      <Game />
      <Sider />
      <Footer />
    </Grid>
  </Box>
  </ThemeProvider>
);

export default App;
