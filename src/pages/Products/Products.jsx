import { Box, Grid } from '@mui/material';
import Header from '../../components/Header/Header';
import SneakersTable from './SneakersTable';

function Products() {

  return (
    <Box>
      <Grid container gap={3}>
        <Grid item xs={12}>
          <Header title='Products'/>
        </Grid>
        <Grid item xs={12}>
          <SneakersTable />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Products