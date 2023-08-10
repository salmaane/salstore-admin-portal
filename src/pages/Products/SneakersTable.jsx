import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DataTable from '../../components/DataTable/DataTable';
import { useState, useEffect} from 'react';
// axios
import axiosInstance from './../../services/sneakers';
import useAxiosFunction from './../../hooks/useAxiosFunction';
import { useGridApiRef } from '@mui/x-data-grid';


function SneakersTable() {
  const apiRef = useGridApiRef();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const {data: sneakers ,loading, axiosFetch} = useAxiosFunction(axiosInstance);

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
      width: 60,
    },
    {
      field: 'media',
      headerName:'Image',
      width:100,
      renderCell: (params) => {
        return (
          <Box>
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
      field: 'delete',
      type:'actions',
      headerName:'',
      with:'50',
      sortable: false,
      editable:false,
      getActions: (params) => [
          <IconButton onClick={()=> handleDelete(params.id)}>
            <DeleteIcon color='error' />
          </IconButton>
      ],
    },
  ];

  function handleDelete(id) {
    // axiosFetch({
    //     url:'/' + id,
    //     method: 'delete'
    // });
    apiRef.current.updateRows([{ id: id, _action: 'delete' }]);
    console.log('delete called on item '+ id)
  }

  return (
    <>
        <DataTable 
            rows={sneakers?.data || []}
            columns={productsColumns}
            loading={loading}
            rowCount={sneakers?.total}
            paginationModel={paginationModel}
            setPaginationMode={setPaginationModel}
            apiRef={apiRef}
        />
    </>
  )
}

export default SneakersTable