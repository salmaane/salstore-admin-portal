import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from '../../styles/theme';

function Card({title, value, Icon}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
        <Box
            sx={{ 
                backgroundColor: colors.gray[100],
                boxShadow: '0 6px 3px -2px rgba(0,0,0,0.035)',
                borderRadius: 2,
                p:3,
                display:'flex',
                alignItems:'center',
                gap:2,
             }}
        >   
            <Icon sx={{ fontSize: '2rem', mx:2, color: colors.primary[500] }}/>
            <Box sx={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                gap:1,
            }}>
                <Typography variant='h5' sx={{ color: colors.gray[500] }}>{title}</Typography>
                <Typography variant='h3'>{value}</Typography>
            </Box>
        </Box>
    
  )
}

export default Card