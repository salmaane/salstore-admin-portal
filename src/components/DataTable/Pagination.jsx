import {
  gridPageSizeSelector,
  GridPagination,
  useGridApiContext,
  useGridSelector,
  useGridRootProps,
} from '@mui/x-data-grid';
import MuiPagination from '@mui/material/Pagination';

const CustomPagination = ({ page, onPageChange, className }) => {
  const apiRef = useGridApiContext();
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
  const rootProps = useGridRootProps();
  const pageCount = getPageCount(
    rootProps.rowCount ?? visibleTopLevelRowCount,
    pageSize
  );
  return (
    <MuiPagination page={page + 1} count={pageCount}       
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1);
      }}
      color="primary"
      className={className}
      boundaryCount={10}
      shape="rounded"
      sx={{ 
        '.Mui-selected': {
            color:'#ffffff !important',
            fontWeight:'bold'
        }
       }}
    />
  );
}

export default function Pagination(props) {
  return <GridPagination ActionsComponent={CustomPagination} {...props} />;
}

const getPageCount = (rowCount, pageSize) => {
  if (pageSize > 0 && rowCount > 0) {
    return Math.ceil(rowCount / pageSize);
  }

  return 0;
};