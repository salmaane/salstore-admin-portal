import {MenuItem} from 'react-pro-sidebar';
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Item = ({ title, to, icon, selected = '/'}) => {
  return (
    <MenuItem
        active={selected === to}
        icon={icon}
        component={<Link to={to} />}
    >
        <Typography variant='h6'>{title}</Typography>
    </MenuItem>
  );
}

export default Item