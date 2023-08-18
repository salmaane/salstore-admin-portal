import { Box, Grid, Typography } from '@mui/material';
import Header from '../../components/Header/Header';
import UpdateForm from './UpdateForm';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import axiosInstance from '../../services/sneakers';
import { useEffect } from 'react';

function UpdateProduct() {
    const navigate = useNavigate();
    const {id} = useParams();
    const {data: productData, axiosFetch} = useAxiosFunction(axiosInstance);
    useEffect(() => {
        axiosFetch({
            url:'/'+ id,
            method:'get',
        });
    },[]);

  return (
    <Box>
      <Grid container gap={3}>
        <Grid item xs={12}>
          <Header title='Update Product'/>
        </Grid>
        <Grid item xs={12} 
            sx={{
                minHeight:'200px',
                display:'flex', 
                justifyContent:'center', 
                alignItems:'center', 
                gap:4,
                flexWrap: 'wrap'
            }}
        >
            <img src={productData?.media.thumbUrl}
                style={{ 
                    borderRadius:'6px', 
                    border: '1px solid green', 
                    padding:'5px', 
                    backgroundColor:'white' ,
                    marginTop:'10px',
                    width: '200px',
                    cursor:'pointer',
                }}
                onClick={()=> navigate('/products/'+id, {state: productData})}
            />
            <Typography 
              variant='h2' sx={{ cursor:'pointer', '&:hover':{ opacity:'0.6'}, transition:'all 0.3s' }} 
              onClick={()=> navigate('/products/'+id, {state: productData})}
            >{productData?.title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <UpdateForm productData={productData} id={id}/>
        </Grid>
      </Grid>
    </Box>
  )
}

export default UpdateProduct;