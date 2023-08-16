import { Box, Grid } from '@mui/material';
import Header from '../../components/Header/Header';
import SneakerForm from './SneakerForm';

function AddProduct() {
  return (
    <Box>
      <Grid container gap={3}>
        <Grid item xs={12}>
          <Header title='Add Product'/>
        </Grid>
        <Grid item xs={12}>
          <SneakerForm />
        </Grid>
      </Grid>
    </Box>
  )
}

export default AddProduct