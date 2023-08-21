import { useEffect, useState } from 'react';
import DataTable from '../../components/DataTable/DataTable';
// Mui
import {  Paper, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// Axios
import { useAuthHeader } from 'react-auth-kit';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import usersInstance from '../../services/users';

function UsersTable({title, role}) {
    const auth_token = useAuthHeader();
    const {data: users, error, loading, axiosFetch} = useAxiosFunction(usersInstance);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    useEffect(() => {
        axiosFetch({
            url:`/?page=${paginationModel.page+1}&limit=${paginationModel.pageSize}&role=${role}`,
            method:'get',
            headers: {
                'Authorization': auth_token(),
            }
        });
    }, [paginationModel]);
    
    const USERS_COLUMNS = [
        {
            field: 'id',
            headerName: 'Id',
            width: 50,
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
        {
            field: 'delete',
            type:'actions',
            headerName:'Delete',
            with:50,
            sortable: false,
            editable:false,
            getActions: (params) => [
                <IconButton onClick={()=> console.log('implement delete')}>
                    <DeleteIcon color='error'/>
                </IconButton>
            ],
        },
        {
            field: 'update',
            type:'actions',
            headerName:'Edit',
            with:50,
            sortable: false,
            editable:false,
            getActions: (params) => [
                <IconButton onClick={()=> console.log('add navigate() to update')}>
                    <EditOutlinedIcon />
                </IconButton>
            ],
        },
    ];

  return (
    <Paper elevation={0} sx={{ p:2, borderRadius:3, display:'flex', gap:2, flexDirection:'column' }} >
        <Typography variant='h4' >{title}</Typography>
        <DataTable
            rows={users?.data || []}
            columns={USERS_COLUMNS}
            loading={loading}
            rowCount={users?.total}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
        />
    </Paper>
  )
}

export default UsersTable;