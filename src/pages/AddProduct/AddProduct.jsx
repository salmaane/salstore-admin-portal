import { Box, Grid } from '@mui/material';
import Header from '../../components/Header/Header';
import AddSneakerForm from './AddSneakerForm';

function AddProduct() {
  return (
    <Box>
      <Grid container gap={3}>
        <Grid item xs={12}>
          <Header title='Add Product'/>
        </Grid>
        <Grid item xs={12}>
          <AddSneakerForm />
        </Grid>
      </Grid>
    </Box>
  )
}

export default AddProduct