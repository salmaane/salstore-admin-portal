import { useState, useEffect} from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
// components
import DeleteDialog from '../../components/Dialog/DeleteDialog';
import DataTable from '../../components/DataTable/DataTable';
import { Box, IconButton, Button, Paper, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// axios
import axiosInstance from './../../services/sneakers';
import useAxiosFunction from './../../hooks/useAxiosFunction';


function SneakersTable() {
  const auth_token = useAuthHeader();
  const [open, setOpen] = useState({isOpen: false, item: null});
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const {data: sneakers, loading,  axiosFetch} = useAxiosFunction(axiosInstance);

  useEffect(()=> {
    axiosFetch({
      url:`/?page=${paginationModel.page+1}&limit=${paginationModel.pageSize}`,
      method: 'get',
    });
  }, [paginationModel]);
  
  const productsColumns = [
    {
      field: 'id',
      headerName: 'Id',
      width: 80,
      headerAlign: 'center',
      align:'center',
    },
    {
      field: 'media',
      headerName:'Image',
      width:100,
      renderCell: (params) => {
        return (
          <Box sx={{ cursor:'pointer' }} onClick={()=> navigate('/products/'+params.id, {state: params.row})}>
            <img alt='thumb' src={params.value.thumbUrl} 
                style={{
                    width:'auto',
                    height:'auto',
                    maxWidth:'90%',
                    maxHeight:'90%'
                }}
            />
          </Box>
        );
      },
      sortable: false
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 300,
      sortable: true,
      renderCell: (params)=> {
        return (
          <Box>
            <Typography sx={{ cursor:'pointer', '&:hover': {textDecoration:'underline'} }} onClick={()=> navigate('/products/'+params.id, {state: params.row})}>
              {params.value}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'brand',
      headerName: 'Brand',
      width: 100,
      sortable: true
    },
    {
      field: 'retailPrice',
      headerName: 'Price',
      width: 100,
      sortable: true,
      type:'number',
      headerAlign: 'left',
      align:'left',
      valueFormatter: (params) => {
        return `$${params.value.toLocaleString()}`;
      },
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 100,
    },
    {
      field: 'releaseDate',
      headerName: 'Year',
      width: 60,
      valueGetter: (params) => {
        if(params.value === null) return '';
        return new Date(params.value).getFullYear();
      }
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 100,
      sortable: true,
      type:'number',
      headerAlign:'center',
      align:'center',
    },
    {
      field: 'action',
      type:'actions',
      headerName:'Action',
      with:50,
      sortable: false,
      editable:false,
      getActions: (params) => [
          <IconButton onClick={()=> setOpen({isOpen: true, item: params.row})}>
            <DeleteIcon color='error'/>
          </IconButton>,
          <IconButton onClick={()=> navigate('/products/update-product/'+params.id, {state: params.row})}>
            <EditOutlinedIcon />
          </IconButton>
      ],
    },
  ];

  function handleDelete(id) {
    axiosFetch({
        url:'/' + id,
        method: 'delete',
        headers: {
          'Authorization': auth_token(),
        },
        handleResponse: () => axiosFetch({
          url:`/?page=${paginationModel.page+1}&limit=${paginationModel.pageSize}`,
          method: 'get',
        })
    });
  }
  
  const navigate = useNavigate();
  return (
    <Paper elevation={0} sx={{ p:2, borderRadius:3, display:'flex', gap:2, flexDirection:'column' }}>

        <DataTable 
            rows={sneakers?.data || []}
            columns={productsColumns}
            loading={loading}
            rowCount={sneakers?.total}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            pageSize={paginationModel.pageSize}
        />
        <DeleteDialog 
          id={open?.item?.id}
          isOpen={open.isOpen}
          handleClose={()=> setOpen({...open, isOpen:false})}
          onConfirm={handleDelete}
          title='Are you sure to delete this item ?'
          bodyContent={
            <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', gap:2, my:3}}>
              <img alt='product' src={open.item?.media.thumbUrl} style={{ width:'auto', height:'auto', maxWidth:'90px' }}/>
              <Typography variant='h5'>{open.item?.title}</Typography>
            </Box>
          }
        />
        <Button variant="contained" onClick={() => navigate('/products/add-product')}>
          Add Product
        </Button>
    </Paper>
  )
}

export default SneakersTable