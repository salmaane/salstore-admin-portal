import { Typography } from "@mui/material";

const Separator = ({ title, collapsed, color }) => {

    return (
        collapsed ? null : <Typography variant='h6' sx={{ py: 1.5, px: 2.5, color: color }} >{title}</Typography>
    );
}

export default Separator