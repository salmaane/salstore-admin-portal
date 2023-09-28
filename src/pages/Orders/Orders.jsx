import { Box, Grid } from '@mui/material';
import Header from '../../components/Header/Header';
import OrdersTable from './OrdersTable';

function Orders() {

  return (
    <Box>
      <Grid container gap={3}>
        <Grid item xs={12}>
          <Header title='Orders'/>
        </Grid>
        <Grid item xs={12}>
          <OrdersTable />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Orders