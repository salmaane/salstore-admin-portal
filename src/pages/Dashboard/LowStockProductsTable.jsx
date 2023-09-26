import { Box, Typography, useTheme, Skeleton, Chip } from "@mui/material"
import { styled } from '@mui/material/styles';
import { tokens } from '../../styles/theme';
import { useNavigate } from "react-router-dom";
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
    fontSize:13,
  },
  [`&.${tableCellClasses.body}`]: {
    fontWeight:'500',
  },
}));

function LowStockProductsTable({rows}) {
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const skeletons = [];
    for(let i=0; i< 5; i++) {
        skeletons.push(
            <TableRow 
                key={i}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
            >
                <StyledTableCell align="center" sx={{ py:2.79 }}>
                    <Skeleton variant="rectangular"/>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" sx={{ width:'100%' }}>
                    <Skeleton variant="text"/>
                </StyledTableCell>
                <StyledTableCell align="right">
                    <Skeleton variant="text" />
                </StyledTableCell>
                <StyledTableCell align="right">
                    <Skeleton variant="text" />
                </StyledTableCell>
                <StyledTableCell align="right">
                    <Skeleton variant="text" />
                </StyledTableCell>
            </TableRow>
        );
    }

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
          <Typography variant="h4" sx={{ fontWeight:'bold' }}>Low Stock Products</Typography>
          <Typography variant="body1">Sneakers with low stocks</Typography>
        </Box>
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align="right" >Brand</StyledTableCell>
              <StyledTableCell align="right" >Quantity</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows ? rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&.MuiTableRow-root:hover':{
                    backgroundColor: 'transparent',
                  },
                  '&.MuiTableRow-root:hover .MuiTableCell-root' :{
                    color: colors.indigo[500],
                    fontWeight:'bold',
                    cursor:'pointer',
                  }
                }}
                hover={true}
              >
                <StyledTableCell 
                  align="center" 
                  sx={{ cursor:'pointer', '&:hover' : {textDecoration:'underline'} }} 
                >
                  <Box display='flex' alignItems={'center'} gap={2} onClick={()=> navigate('/products/'+row.id)}>
                    <img src={row.media.thumbUrl} width={60}/>
                    <Typography variant="body1" >{row.title}</Typography>
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="right">{row.brand}</StyledTableCell>
                <StyledTableCell align="right">
                    {row.quantity >= 15 ? <Chip label={row.quantity} color="primary" sx={{ width:'3rem', color:'white', fontWeight:'bold' }}/> :
                        row.quantity >= 10 ? <Chip label={row.quantity} color="warning" sx={{ width:'3rem', fontWeight:'bold' }}/> 
                        : <Chip label={row.quantity} color="error" sx={{ width:'3rem', fontWeight:'bold' }}/>
                    }
                </StyledTableCell>
              </TableRow>
            )) :
                skeletons
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default LowStockProductsTable;