import { Box, Breadcrumbs, Typography, useTheme } from "@mui/material"
import { useLocation, Link } from "react-router-dom"
import { tokens } from "../../styles/theme";
import DateTime from "./DateTime";
// Icons
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';


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
        flexWrap:'wrap',
        gap:2,
     }}>
        <Box display='flex' justifyContent='center' alignItems='baseline' gap={3} flexWrap={'wrap'}>
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
        <Box display='flex' justifyContent='space-between' gap={1} alignItems='center'>
            <CalendarMonthOutlinedIcon sx={{ color: colors.gray[700] }}/>
            <DateTime/>
        </Box>
    </Box>
  )
}

export default Header