import { Box, Grid } from '@mui/material';
import Header from '../../components/Header/Header';
import DataTable from '../../components/DataTable/DataTable';
import { useState} from 'react';
// axios
import useAxios from './../../hooks/useAxios';
import axiosInstance from './../../services/sneakers';

function Products() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const {data: sneakers, error, loading} = useAxios({
    axiosInstance,
    url:`/?page=${paginationModel.page+1}&limit=${paginationModel.pageSize}`,
    method:'get'
  });

  const productsColumns = [
    {
      field: 'id',
      headerName: 'Id',
      width: 60,
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 200,
      sortable: true
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
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 100,
    },
  ];
  const productsRows = sneakers.data ? sneakers.data?.map(row => {
    return {
      id: row.id,
      title: row.title,
      brand: row.brand,
      retailPrice: row.retailPrice,
      gender: row.gender
    };
  }) : [];

  return (
    <Box>
      <Grid container gap={3}>
        <Grid item xs={12}>
          <Header title='Products'/>
        </Grid>
        <Grid item xs={12}>
            <DataTable 
              rows={productsRows}
              columns={productsColumns}
              loading={loading}
              rowCount={sneakers.total}
              paginationModel={paginationModel}
              setPaginationMode={setPaginationModel}
            />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Products