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
            title={'Total Sales'}
            value={1200}
            Icon={SellOutlinedIcon}
          />
        </Grid>
        <Grid item xs={12}  md={4} >
          <Card 
            title={'Average Order'}
            value={300}
            Icon={InventoryOutlinedIcon}
          />
        </Grid>
        <Grid item xs={12}  md={4} >
          <Card 
            title={'Revenue'}
            value={'$' + 1200}
            Icon={MonetizationOnOutlinedIcon}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard