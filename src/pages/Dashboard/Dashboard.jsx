import { Box, Grid } from '@mui/material';
import Header from '../../components/Header/Header';
import Card from './Card';
// icons
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
// axios
import useAxiosFunciton from '../../hooks/useAxiosFunction';
import analyticsInstance from '../../services/analytics';
import { useEffect } from 'react';
import { useAuthHeader } from 'react-auth-kit';
// components
import TopSellingProducts from './TopSellingProducts';
import VisitsByCountryTable from './VisitsByCountryTable';
import LowStockProductsTable from './LowStockProductsTable';
import NewUsersRegistraionTable from './NewUsersRegistrationTable'
import OrdersPerDayChart from './OrdersPerDayChart';
import SalesPerDayChart from './SalesPerDayChart';

function Dashboard() {

  const {data: analytics, error, loading, axiosFetch} = useAxiosFunciton(analyticsInstance);
  const token = useAuthHeader();

  useEffect(() => {
    axiosFetch({
      url:'/',
      method:'get',
      headers: {
        'Authorization': token(),
      },
    });
  }, []);

  console.log(analytics?.salesPerDay);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Header title='Dashboard'/>
        </Grid>
        <Grid item xs={12}  md={4} >
          <Card 
            title={'Sales'}
            value={formatNumber(analytics?.monthTotalSales)}
            Icon={SellOutlinedIcon}
            tooltip='monthly sales'
            subtitle={'total sales'}
            subvalue={formatNumber(analytics?.totalSales)}
          />
        </Grid>
        <Grid item xs={12}  md={4} >
          <Card 
            title={'Revenue'}
            value={formatNumber(analytics?.monthRevenue)}
            Icon={MonetizationOnOutlinedIcon}
            tooltip='monthly revenue'
            subtitle={'total revenue'}
            subvalue={formatNumber(analytics?.revenue)}
            addDolarSign
          />
        </Grid>
        <Grid item xs={12}  md={4} >
          <Card 
            title={'Average Order'}
            value={formatNumber(analytics?.dailyAverageOrder)}
            Icon={InventoryOutlinedIcon}
            tooltip='daily average order for this month'
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <TopSellingProducts rows={analytics?.topSellingProducts}/>
        </Grid>
        <Grid item xs={12} md={4}>
          <VisitsByCountryTable rows={analytics?.usersVisits.countries}/>
        </Grid>
        <Grid item xs={12} md={5}>
          <NewUsersRegistraionTable rows={analytics?.newUsers}/>
        </Grid>
        <Grid item xs={12} md={7}>
          <LowStockProductsTable rows={analytics?.lowStockProducts}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <OrdersPerDayChart data={analytics?.ordersPerDay} />
        </Grid>
        <Grid item xs={12} md={6}>
          <SalesPerDayChart data={analytics?.salesPerDay} />
        </Grid>
      </Grid>
    </Box>
  )
}

function formatNumber(number) {
  if(number >= 1e6) {
    return (number / 1e6).toFixed(1).replace('.0','') + 'M';
  }
  if(number >= 1e3) {
    return (number/ 1e3).toFixed(1).replace('.0','') + 'K';
  }
  return number;
}

export default Dashboard