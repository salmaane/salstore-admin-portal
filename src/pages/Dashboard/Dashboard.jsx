import { Box, Grid } from '@mui/material';
import Header from '../../components/Header/Header';
import Card from './Card';
// icons
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

function Dashboard() {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Header title='Dashboard'/>
        </Grid>
        <Grid item xs={12}  md={4} >
          <Card 
            title={'Sales'}
            value={1200}
            Icon={SellOutlinedIcon}
            tooltip='monthly sales'
            subtitle={'total sales'}
            subvalue={4005}
          />
        </Grid>
        <Grid item xs={12}  md={4} >
          <Card 
            title={'Revenue'}
            value={'$' + formatNumber(50_000)}
            Icon={MonetizationOnOutlinedIcon}
            tooltip='monthly revenue'
            subtitle={'total revenue'}
            subvalue={'$'+formatNumber(100_000)}
          />
        </Grid>
        <Grid item xs={12}  md={4} >
          <Card 
            title={'Average Order'}
            value={30}
            Icon={InventoryOutlinedIcon}
            tooltip='daily average order'
          />
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