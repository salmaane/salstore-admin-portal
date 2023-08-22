import { useEffect, useState } from 'react';
import DataTable from '../../components/DataTable/DataTable';
// Mui
import {  Paper, Typography } from '@mui/material';

// Axios
import { useAuthHeader } from 'react-auth-kit';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import usersInstance from '../../services/users';

function UsersTable({title, role, columns, pageSize, tableMinHeight}) {
    const auth_token = useAuthHeader();
    const {data: users, error, loading, axiosFetch} = useAxiosFunction(usersInstance);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: pageSize,
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
    

  return (
    <Paper elevation={0} sx={{ p:2, borderRadius:3, display:'flex', gap:2, flexDirection:'column' }} >
        <Typography variant='h4' >{title}</Typography>
        <DataTable
            rows={users?.data || []}
            columns={columns}
            loading={loading}
            rowCount={users?.total}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            minHeight={tableMinHeight}
            pageSize={pageSize}
        />
    </Paper>
  )
}

export default UsersTable;