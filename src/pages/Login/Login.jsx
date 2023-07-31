import { Box, Typography, useTheme, Container, TextField, Button } from '@mui/material';
import { tokens } from '../../styles/theme';
import { Link } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';

function Login() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box sx={{ 
      p:2,
      display:'flex',
      width:'100%',
      height:'100%',
      justifyContent: 'center',
      alignItems: 'center'
     }}>
      <Container sx={{ 
        overflow: 'hidden',
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: tokens().boxShadow,
       }} disableGutters={true} maxWidth="xs">
        <Box sx={{ 
          backgroundColor: colors.primary[400],
          display: 'flex',
          justifyContent: 'center',
          alignItems:'center',
          py: 2,
         }}>
          <Typography variant='h4' color='white' fontWeight='bold'>
            Log in
          </Typography>
        </Box>
        <Box sx={{ 
          p:4,
          display: 'flex',
          flexDirection:'column',
          gap:5,
         }}>
            <TextField type="email" variant='outlined' label="Email" />
            <TextField type="password" variant='outlined' label="Password"/>
            <Button variant="contained">
              Log in
            </Button>
            <MuiLink sx={{
               '&:hover': {
                color:'#333',
              } 
              }} underline='none'>
              <Link style={{ color:'#888'}}>Forget password ?</Link>
            </MuiLink>
        </Box>
      </Container>
    </Box>
  )
}

export default Login