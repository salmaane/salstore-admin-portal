import {Box, useTheme, LinearProgress} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { tokens } from '../../styles/theme';
// Custom Pagination
import Pagination from './Pagination';

export default function DataTable({rows, columns, loading, rowCount, paginationModel, setPaginationModel, apiRef, pageSize, minHeight = '646px'}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rowCountState, setRowCountState] = useState(rowCount || 0);
  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      rowCount !== undefined ? rowCount : prevRowCountState,
    );
  }, [rowCount, setRowCountState])

  return (
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
          pageSizeOptions={[pageSize]}
          rowCount={rowCountState}
          paginationMode='server'
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}

          slots={{
            loadingOverlay: LinearProgress,
            pagination: Pagination,
          }}
          sx={{ 
            minHeight: minHeight,
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
  );
}

