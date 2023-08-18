import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { Grid, Box, Skeleton, Button } from "@mui/material";
import axiosInstance from '../../services/sneakers'
import useAxiosFunction from "../../hooks/useAxiosFunction";
import { useEffect, useState } from "react";
import DetailsTable from "./DetailsTable";
import DeleteDialog from "../../components/Dialog/DeleteDialog";
import { useAuthHeader } from "react-auth-kit";

function ProductDetails() {
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const {data, axiosFetch} = useAxiosFunction(axiosInstance);
    
    const auth_token = useAuthHeader();
    const [open, setOpen] = useState({isOpen: false, item: null});
    function handleDelete(id) {
        axiosFetch({
            url:'/' + id,
            method: 'delete',
            headers: {
            'Authorization': auth_token(),
            },
            handleResponse: () => navigate('/products'),
        });
    }

    useEffect(() => {
        axiosFetch({
            url:'/' + id,
            method:'get',
            handleResponse: () => setLoading(false),
        });
    }, []);

    const navigate = useNavigate();
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header title={
            loading ?
             <Box display='flex' flexDirection='column'>
                <Skeleton animation='wave' variant="text" sx={{ fontSize: '2rem', width:350 }}/>
                <Skeleton animation='wave' variant="text" sx={{ fontSize: '1rem', width:250}}/>
             </Box> 
            : data?.title
          }/>
        </Grid>
        <Grid item xs={12}>
          <Box display='flex' justifyContent='center' sx={{ background:'white', border:'1px solid green' }}>
            <img src={data?.media.smallImageUrl} 
                style={{width:'auto',
                    height:'auto',
                    maxHeight:'20rem'
                }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
            <DetailsTable data={data} />
        </Grid>
        <Grid item xs={12} sm={4}>
            <Button variant="outlined" fullWidth
                onClick={()=> navigate('/products/add-product')}
            >Add new product</Button>
        </Grid>
        <Grid item xs={12} sm={4}>
            <Button variant="outlined" color="warning" fullWidth
                onClick={()=> navigate('/products/update-product/'+id, {state: data?.row})}
            >Update</Button>
        </Grid>
        <Grid item xs={12} sm={4} >
            <Button variant="outlined" color="error" fullWidth
                onClick={()=> setOpen({isOpen: true, item: data})}
            >Delete</Button>
        </Grid>
      </Grid>
      <DeleteDialog
          isOpen={open.isOpen}
          handleClose={()=> setOpen({...open, isOpen:false})}
          onConfirm={handleDelete}
          state={open.item}
      />
    </Box>
  )
}

export default ProductDetails