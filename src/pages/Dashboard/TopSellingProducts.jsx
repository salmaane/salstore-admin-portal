import { Box, Typography, useTheme } from "@mui/material"
import { styled } from '@mui/material/styles';
import { tokens } from '../../styles/theme';
// Mui Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'white',
    color: theme.palette.grey[900],
    fontWeight:'bold',
  },
  [`&.${tableCellClasses.body}:hover`]: {
  },
}));

function DataTable({rows}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <Box
    >
      <TableContainer
        sx={{ 
          backgroundColor: colors.gray[100],
          boxShadow: '0 6px 3px -2px rgba(0,0,0,0.035)',
          borderRadius: 2,
          height:'100%',
          maxHeight:'430px'
        }}
      >
        <Box sx={{ px:2.5, pt:1.5, border:0 }}>
          <Typography variant="h4" sx={{ fontWeight:'bold' }}>Top Selling Products</Typography>
        </Box>
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell colSpan={2}></StyledTableCell>
              <StyledTableCell align="right" >Quantity</StyledTableCell>
              <StyledTableCell align="right" >Price</StyledTableCell>
              <StyledTableCell align="right" >Revenue</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
                hover={true}
              >
                <StyledTableCell align="center">
                  <img src={row.thumbUrl} width={60}/>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" sx={{ color:'black !important' }}>
                  {row.title}
                </StyledTableCell>
                <StyledTableCell align="right">{row.soldQuantity}</StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
                <StyledTableCell align="right">{row.revenue}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default DataTable