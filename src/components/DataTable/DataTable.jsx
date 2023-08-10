import {Box, Paper, useTheme, LinearProgress} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { tokens } from '../../styles/theme';
// Custom Pagination
import Pagination from './Pagination';

export default function DataTable({rows, columns, loading, rowCount, paginationModel, setPaginationMode, apiRef}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rowCountState, setRowCountState] = useState(rowCount || 0);
  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      rowCount !== undefined ? rowCount : prevRowCountState,
    );
  }, [rowCount, setRowCountState])

  return (
    <Paper elevation={0} sx={{ p:2, borderRadius:3 }}>
      <Box sx={{ width: '100%' }}>
        <DataGrid
          autoHeight
          loading={loading}
          rows={rows}
          columns={columns}
          filterMode='client'
          checkboxSelection
          disableRowSelectionOnClick

          keepNonExistentRowsSelected
          pageSizeOptions={[10]}
          rowCount={rowCountState}
          paginationMode='server'
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationMode}

          slots={{
            loadingOverlay: LinearProgress,
            pagination: Pagination,
          }}
          sx={{ 
            minHeight: '646px',
            '& .MuiDataGrid-row:hover': {
              color: colors.indigo[500],
              backgroundColor: colors.darkWhite[500]
            },
            '& .MuiDataGrid-row': {
              color: colors.gray[900],
            },
          }}
          apiRef={apiRef}
        />
      </Box>
    </Paper>
  );
}

