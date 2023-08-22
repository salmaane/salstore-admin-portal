import { Box, Grid, IconButton, Avatar } from "@mui/material";
import Header from "../../components/Header/Header";
import UsersTable from "./UsersTable";
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

function UserManagement() {
  

  const USERS_COLUMNS = [
    {
        field: 'id',
        headerName: 'Id',
        width: 50,
    },
    {
        field: 'profile',
        headerName: '',
        width: 70,
        sortable:false,
        editable:false,
        renderCell: (params) => {
            return (
                <Avatar alt='profile' src={params.value} sx={{width:35, height:35}}/>
            );
        }
    },
    {
        field: 'name',
        headerName: 'Full Name',
        width: 160,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 185,
    },
    {
        field: 'created_at',
        headerName: 'Account Created At',
        width: 130,
        align:'center',
        headerAlign:'center',
        valueGetter: (params) => {
                const date = new Date(params.value);
                const month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth() ;
                const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() ;
                return date.getFullYear() + '-'
                      + month + '-'
                      + day;
        }
    },
    {
        field: 'email_verified_at',
        headerName: 'Email Verified Date',
        width: 150,
        align:'center',
        headerAlign:'center',
        valueGetter: (params) => {
            if(params.value) {
                const date = new Date(params.value);
                const month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth() ;
                const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() ;
                return date.getFullYear() + '-'
                      + month + '-'
                      + day;
            }
            return 'Not verified';
        }
    },
    {
        field: 'action',
        type:'actions',
        headerName:'Action',
        with:90,
        sortable: false,
        editable:false,
        getActions: (params) => [
            <IconButton onClick={()=> console.log('implement delete')}>
                <DeleteIcon color='error'/>
            </IconButton>,
            <IconButton onClick={()=> console.log('add navigate() to update')}>
                <EditOutlinedIcon />
            </IconButton>
        ],
    },
  ];
  const ADMINS_COLUMNS = [
      {
          field: 'id',
          headerName: 'Id',
          width: 50,
      },
      {
          field: 'profile',
          headerName: '',
          width: 70,
          renderCell: (params) => {
              return (
                  <Avatar alt='profile' src={params.value} sx={{width:35, height:35}}/>
              );
          }
      },
      {
          field: 'name',
          headerName: 'Full Name',
          width: 160,
      },
      {
          field: 'email',
          headerName: 'Email',
          width: 185,
      },
      {
          field: 'created_at',
          headerName: 'Account Created At',
          width: 130,
          align:'center',
          headerAlign:'center',
          valueGetter: (params) => {
                  const date = new Date(params.value);
                  const month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth() ;
                  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() ;
                  return date.getFullYear() + '-'
                        + month + '-'
                        + day;
          }
      },
      {
          field: 'email_verified_at',
          headerName: 'Email Verified Date',
          width: 130,
          align:'center',
          headerAlign:'center',
          valueGetter: (params) => {
              if(params.value) {
                  const date = new Date(params.value);
                  const month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth() ;
                  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() ;
                  return date.getFullYear() + '-'
                        + month + '-'
                        + day;
              }
              return 'Not verified';
          }
      },
  ];

  return (
    <Box>
      <Grid container gap={3}>
        <Grid item xs={12}>
          <Header title='User Management'/>
        </Grid>
        <Grid item xs={12}>
          <UsersTable 
            title='Admins' 
            role='admin' 
            columns={ADMINS_COLUMNS} 
            pageSize={5}
            tableMinHeight='323px'  
          />
        </Grid>
        <Grid item xs={12}>
          <UsersTable title='Users' role='user' columns={USERS_COLUMNS} pageSize={10}/>
        </Grid>
      </Grid>
    </Box>
  )
}

export default UserManagement