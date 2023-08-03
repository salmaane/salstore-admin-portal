import {MenuItem} from 'react-pro-sidebar';
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
        active={selected === title}
        icon={icon}
        component={<Link to={to} />}
        onClick={() => setSelected(title)}
    >
        <Typography variant='h6'>{title}</Typography>
    </MenuItem>
  );
}

export default Item