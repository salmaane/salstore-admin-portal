import { Box, Breadcrumbs, Typography, useTheme } from "@mui/material"
import { useLocation, Link } from "react-router-dom"
import { tokens } from "../styles/theme";

function Header({title}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const location = useLocation();
    const paths = location.pathname.split('/').filter(item => item !== '');

  return (
    <Box sx={{ 
        width:'100%',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
     }}>
        <Box display='flex' justifyContent='center' alignItems='baseline' gap={3}>
            <Typography variant="h2">{title}</Typography>
            <Breadcrumbs separator='/'>
                {paths.map((path, index) => {
                    const name = path.slice(0,1).toUpperCase() + path.split('-').join(' ').slice(1);
                    const link = paths.slice(0, index+1).join('/');

                    return (
                    <Link 
                        key={path} 
                        to={'/' + link}  
                        style={{ color: colors.gray[600] }}

                    >{name}</Link>);
                })}
            </Breadcrumbs>
        </Box>
        <Box>
            For Date and time
        </Box>
    </Box>
  )
}

export default Header