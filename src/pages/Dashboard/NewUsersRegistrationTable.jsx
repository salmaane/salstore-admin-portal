import { Box, Typography, useTheme, Skeleton, Avatar } from "@mui/material"
import { styled } from '@mui/material/styles';
import { tokens } from '../../styles/theme';
import createdTimeFormat from '../../utils/createdTimeFormat'
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

function NewUsersRegistrationTable({rows}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const skeletons = [];
    for(let i=0; i<5; i++) {
        skeletons.push(
            <TableRow 
                key={i}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&.MuiTableRow-root:hover':{
                    backgroundColor: 'transparent',
                  },
                }}
            >
                <TableCell>
                    <Box sx={{ display: 'flex', alignItems:'center', gap:2 }}>
                        <Skeleton variant="circular" width={40} height={40}/>
                        <Skeleton variant="text" width='50%'/>
                    </Box>
                </TableCell>
                <TableCell>
                    <Skeleton variant="text" />
                </TableCell>
                <TableCell >
                    <Skeleton variant="text" />
                </TableCell>
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
          <Typography variant="h4" sx={{ fontWeight:'bold' }}>New Users</Typography>
          <Typography variant="body1">New registred users   </Typography>
        </Box>
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell >Name</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Reg time</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows ? rows.map((row) => (
              <TableRow
                key={row.country}
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
                <StyledTableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', alignItems:'center', gap:2 }}>
                    <Avatar src={row?.profile} />
                    <Typography>{row.name}</Typography>
                  </Box>
                </StyledTableCell>
                <StyledTableCell >{row.role}</StyledTableCell>
                <StyledTableCell >{createdTimeFormat(row.created_at)}</StyledTableCell>
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

export default NewUsersRegistrationTable;