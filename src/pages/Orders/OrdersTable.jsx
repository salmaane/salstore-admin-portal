import { useState, useEffect} from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { Box, Paper, Typography, ToggleButton, ToggleButtonGroup, Chip, useTheme} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import DataTable from '../../components/DataTable/DataTable';
import { tokens } from '../../styles/theme';
// axios
import axiosInstance from './../../services/orders';
import useAxiosFunction from './../../hooks/useAxiosFunction';


function OrdersTable() {
  const auth_token = useAuthHeader();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [status, setStatus] = useState('pending');
  const handleChange = (event, nextStatus) => {
    if(nextStatus !== null) {   
        setStatus(nextStatus);
    }
  };

  const {data: orders, loading, error,  axiosFetch} = useAxiosFunction(axiosInstance);
  useEffect(()=> {
    axiosFetch({
      url:`/?page=${paginationModel.page+1}&limit=${paginationModel.pageSize}&status=${status}`,
      method: 'get',
      headers: {
        'Authorization': auth_token(),
      },
    });
  }, [paginationModel, status]);

  function handleStatusChange(e, id, newStatus) {
    axiosFetch({
        url:'/' + id,
        method:'patch',
        headers: {
            'Authorization': auth_token(),
        },
        data: {
            'status': newStatus,
        },
        handleResponse: () => {
            axiosFetch({
                url:`/?page=${paginationModel.page+1}&limit=${paginationModel.pageSize}&status=${status}`,
                method: 'get',
                headers: {
                    'Authorization': auth_token(),
            },
    });
        },
    });
  }

  const productsColumns = [
    {
      field: 'id',
      headerName: 'Id',
      width: 80,
      headerAlign: 'center',
      align:'center',
    },
    {
      field: 'user.name',
      headerName: 'Customer',
      width: 200,
      sortable: true,
      renderCell: (params)=> {
        if(!params.row?.user) {
            return(
                <Box>
                    <Typography sx={{ cursor:'pointer', color:'red', fontSize:'10px' }}>
                        Not registred
                    </Typography>
                </Box>
            );
        }
        return (
          <Box>
            <Typography sx={{ cursor:'pointer'}}>
              {params.row.user.name}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'user.email',
      headerName: 'Email',
      width: 230,
      sortable: true,
      renderCell: (params)=> {
        if(!params.row?.user) {
            return(
                <Box>
                    <Typography sx={{ cursor:'pointer', color:'red', fontSize:'10px' }}>
                        Not registred
                    </Typography>
                </Box>
            );
        }
        return (
          <Box>
            <Typography sx={{ cursor:'pointer'}}>
              {params.row.user.email}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'total_amount',
      headerName: 'Total',
      width: 90,
      sortable: true,
      type:'number',
      headerAlign: 'left',
      align:'left',
      valueFormatter: (params) => {
        return `$${params.value.toLocaleString()}`;
      },
    },
    {
      field: 'order_date',
      headerName: ' Order Time',
      sortable:false,
      width: 100,
      valueGetter: (params) => {
        if(params.value === null) return '';
        const date= new Date(params.value);
        let month = (date.getMonth()+1);
        month = month < 10 ? '0'+month : month;
        let day = date.getDate();
        day = day < 10 ? '0'+day : day;
        let hour = date.getHours();
        hour = hour < 10 ? '0'+hour : hour;
        let minutes = date.getMinutes();
        minutes = minutes < 10 ? '0'+minutes : minutes;
        return day +'/'+ month + ' - ' + hour+':'+minutes;
      }
    },
    {
      field: 'status',
      headerName: 'status',
      width: 100,
      sortable:false,
      headerAlign:'center',
      align:'center',
      renderCell: (params) => {
        return (
        <Chip label={params.value} sx={{ fontWeight:'bold', color:'white' }}
            style={{ backgroundColor: params.value == 'pending' ? colors.red[500] :
                 (params.value == 'shipped' ? colors.lightBlue[600] : colors.primary[500]) 
            }}
        />
        );
      },
    },
    {
      field: 'action',
      type:'actions',
      headerName:'Edit status',
      headerAlign:'center',
      minWidth:240,
      sortable: false,
      getActions: (params) => {
        const pendingButton = <LoadingButton 
            variant='outlined' color='error' size='small' loading={loading}
            onClick={(e) => {handleStatusChange(e,params.row.id,'pending')}}    
        >
            set pending
        </LoadingButton>;
        const shippedButton = <LoadingButton 
            variant='outlined' size='small' loading={loading}
            sx={{ color:colors.lightBlue[600], borderColor:colors.lightBlue[600] }}
            onClick={(e) => {handleStatusChange(e,params.row.id,'shipped')}}
            >
            set shipped
        </LoadingButton>;
        const deliveredButton = <LoadingButton 
            variant='outlined' size='small' loading={loading}
            onClick={(e) => {handleStatusChange(e,params.row.id,'delivered')}}
        >
            set delivered
        </LoadingButton>;
        const actions = [];
        if(params.row.status == 'pending') {
            actions.push(shippedButton, deliveredButton);
        } else if (params.row.status == 'shipped') {
            actions.push(pendingButton, deliveredButton);
        } else {
            actions.push(pendingButton, shippedButton);
        }
        return actions;
      }
    },
  ];

  return (
    <Paper elevation={0} sx={{ p:2, borderRadius:3, display:'flex', gap:2, flexDirection:'column' }}>
        <ToggleButtonGroup
            orientation="horizontal"
            value={status}
            exclusive
            onChange={handleChange}
            fullWidth
            color='primary'
        >
            <ToggleButton value="pending" aria-label="pending" sx={{ fontWeight:'bold' }}>
                Pending
            </ToggleButton>
            <ToggleButton value="shipped" aria-label="shipped" sx={{ fontWeight:'bold' }}>
                Shipped
            </ToggleButton>
            <ToggleButton value="delivered" aria-label="delivered" sx={{ fontWeight:'bold' }}>
                Delivered
            </ToggleButton>
        </ToggleButtonGroup>
        <DataTable 
            rows={orders?.data || []}
            columns={productsColumns}
            loading={loading}
            rowCount={orders?.total}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            pageSize={paginationModel.pageSize}
        />
    </Paper>
  )
}

export default OrdersTable