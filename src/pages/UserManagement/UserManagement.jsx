import { Box, Grid, IconButton, Avatar, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// Axios
import useAxiosFunction from "../../hooks/useAxiosFunction";
import usersInstance from "../../services/users";
// components
import Header from "../../components/Header/Header";
import UsersTable from "./UsersTable";
import DeleteDialog from '../../components/Dialog/DeleteDialog';
import { useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

function UserManagement() {
  const [open, setOpen] = useState({isOpen:false, item: null});
  const {data: users, error, axiosFetch} = useAxiosFunction(usersInstance);
  const auth_token = useAuthHeader();
  const [deleteCount, setDeleteCount] = useState(0);
  const navigate = useNavigate();

  const USERS_COLUMNS = [
    {
        field: 'id',
        headerName: 'Id',
        width: 80,
        headerAlign: 'center',
        align:'center',
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
            <IconButton onClick={()=> setOpen({isOpen: true, item: params.row})}>
                <DeleteIcon color='error'/>
            </IconButton>,
            <IconButton onClick={()=> navigate('/profile', {state: params.row})}>
                <EditOutlinedIcon />
            </IconButton>
        ],
    },
  ];
  const ADMINS_COLUMNS = [
      {
          field: 'id',
          headerName: 'Id',
          width: 80,
          headerAlign: 'center',
          align:'center',
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

  const handleDeleteUser = (id) => {
    axiosFetch({
      url:'/' + id,
      method:'delete',
      headers: {
        'Authorization': auth_token(),
      },
      handleResponse: () => setDeleteCount(deleteCount+1)
    });
  };

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
          <UsersTable 
            title='Users' 
            role='user' 
            columns={USERS_COLUMNS} 
            pageSize={10}
            rerender={deleteCount}
          />
        </Grid>
      </Grid>
      <DeleteDialog
        title='Are you sure to delete this user ?'
        id={open?.item?.id}
        isOpen={open.isOpen}
        handleClose={()=> setOpen({...open, isOpen:false})}
        bodyContent={
          <Box display='flex' justifyContent='center' alignItems='center' gap={2}>
            <Avatar alt='profile' src={open?.item?.profile} />
            <Typography>{open?.item?.name}</Typography>
          </Box>
        }
        onConfirm={handleDeleteUser}
      />
    </Box>
  )
}

export default UserManagement