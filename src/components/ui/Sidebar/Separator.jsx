import { Divider, Typography } from "@mui/material";

const Separator = ({ title, collapsed, color }) => {

    return (
        collapsed ? <Divider variant="middle"/> : <Divider textAlign="left"><Typography variant='h6' sx={{ py: 1.5, color: color }} >{title}</Typography></Divider>
    );
}

export default Separator