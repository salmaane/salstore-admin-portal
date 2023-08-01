import { Box } from '@mui/material';
import LoginForm from './LoginForm/LoginForm'


function Login() {
  return (
    <Box sx={{ 
      p:2,
      display:'flex',
      width:'100%',
      height:'100%',
      justifyContent: 'center',
      alignItems: 'center'
     }}>
      <LoginForm/>
    </Box>
  )
}

export default Login