import { Box, Tooltip, Typography, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from '../../styles/theme';

function Card({title, value, Icon, subtitle = null, subvalue = null, tooltip=''}) {
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
                height:'100%'
             }}
        >   
            <Tooltip title={tooltip}>
                <Icon sx={{ fontSize: '2rem', mx:1, color: colors.primary[500], cursor:'pointer' }}/>
            </Tooltip>
            <Box sx={{
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                gap:0,
                width:'100%',
            }}>
                <Box sx={{
                    display:'flex',
                    alignItems:'center',
                    gap:3,
                    width:'100%',
                }}>
                    <Typography variant='h5' sx={{ color: colors.gray[500] }}>{title}</Typography>
                    <Typography variant='h3'>{value}</Typography>
                </Box>
                <Box sx={{
                    display:'flex',
                    alignItems:'center',
                    gap:2,
                    width:'100%',
                }}>
                    <Typography variant='body2' sx={{ color: colors.gray[400] }}>{subtitle}</Typography>
                    <Typography variant='body2' sx={{ color: colors.gray[400] }}>{subvalue}</Typography>
                </Box>
                
            </Box>
        </Box>
    
  )
}

export default Card