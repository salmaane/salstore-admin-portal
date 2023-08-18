import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

function DetailsTable({data}) {
  return (
    <TableContainer component={Paper}>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <Typography variant='h6'>Id</Typography>
                    </TableCell>
                    <TableCell>
                        {data?.id}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography variant='h6'>Title</Typography>
                    </TableCell>
                    <TableCell>
                        {data?.title}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography variant='h6'>Price</Typography>
                    </TableCell>
                    <TableCell>
                        {'$' +data?.retailPrice}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography variant='h6'>Brand</Typography>
                    </TableCell>
                    <TableCell>
                        {data?.brand}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography variant='h6'>Gender</Typography>
                    </TableCell>
                    <TableCell>
                        {data?.gender}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography variant='h6'>Color</Typography>
                    </TableCell>
                    <TableCell>
                        {data?.colorway}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography variant='h6'>Release Date</Typography>
                    </TableCell>
                    <TableCell>
                        {data?.releaseDate}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default DetailsTable