import { Box, Grid } from '@mui/material';
import Header from '../../components/Header/Header';


function Orders() {

  return (
    <Box>
      <Grid container gap={3}>
        <Grid item xs={12}>
          <Header title='Orders'/>
        </Grid>
        <Grid item xs={12}>

        </Grid>
      </Grid>
    </Box>
  )
}

export default Orders