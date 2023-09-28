import { useEffect, useState } from "react";
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from '../../styles/theme';
import LineChart from "../../components/LineChart/LineChart";


function OrdersPerDayChart({data}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [orders, setOrders] = useState({
        labels: data && Object.keys(data).reverse().map(date => {
            const currentDate = new Date(date);
            return currentDate.getDate() + '/' + (currentDate.getMonth() + 1); 
        }),
        datasets: [
          {
            label: 'Orders per day',
            data: data && Object.values(data).reverse(),
            fill: false,
            borderColor: colors.indigo[500],
            tension: 0.3,
            backgroundColor: colors.indigo[500],
          }
        ]
    });

    useEffect(() => {
        setOrders({
            labels: data && Object.keys(data).reverse().map(date => {
                const currentDate = new Date(date);
                return currentDate.getDate() + '/' + (currentDate.getMonth() + 1); 
            }),
            datasets: [
            {
                label: 'Orders per day',
                data: data && Object.values(data).reverse(),
                fill: false,
                borderColor: colors.indigo[500],
                tension: 0.3,
                backgroundColor: colors.indigo[500],
            }
            ]
        });
    }, [data]);

  return (
    <Box
        sx={{ 
            backgroundColor: colors.gray[100],
            boxShadow: '0 6px 3px -2px rgba(0,0,0,0.035)',
            borderRadius: 2,
            px:3,
            py:1.5,
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            height:'100%',
            justifyContent:'center',
            maxHeight:'400px',
        }}
    >   
        <Box sx={{py:1.5, border:0, alignSelf:'flex-start' }}>
          <Typography variant="h4" sx={{ fontWeight:'bold' }}>Orders Per Day</Typography>
          <Typography variant="body1">Orders of the last  {orders?.labels?.length} days</Typography>
        </Box>
        <LineChart chartData={orders} />
    </Box> 
  )
}

export default OrdersPerDayChart