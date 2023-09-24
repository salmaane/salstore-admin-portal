import { Box, Tooltip, Typography, Skeleton, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from '../../styles/theme';

function Card({title, value, Icon, subtitle = null, subvalue = null, tooltip='', addDolarSign = false}) {
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
                height:'100%',
                justifyContent:'center',
             }}
        >   
            <Tooltip title={tooltip}    >
                <Icon sx={{ fontSize: '2rem', mx:0, color: colors.primary[500], cursor:'pointer' }}/>
            </Tooltip>
            <Box sx={{
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                gap:0,
            }}>
                <Box sx={{
                    display:'flex',
                    alignItems:'center',
                    gap:3,
                    width:'100%',
                }}>
                    {value ? 
                    <>
                        <Typography variant='h5' sx={{ color: colors.gray[500] }}>{title}</Typography>
                        <Typography variant='h3'>{addDolarSign ? '$' + value : value}</Typography>
                    </> :
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width:'6rem' }} animation='wave' />}
                </Box>
                <Box sx={{
                    display:'flex',
                    alignItems:'center',
                    gap:2,
                    width:'100%',
                }}>
                    {value ? 
                    <>
                        <Typography variant='body2' sx={{ color: colors.gray[400] }}>{subtitle}</Typography>
                        <Typography variant='body2' sx={{ color: colors.gray[400] }}>{addDolarSign ? '$' + subvalue : subvalue}</Typography>
                    </> :
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width:'3rem' }} animation='wave' />}
                </Box>
                
            </Box>
        </Box>
    
  )
}

export default Card