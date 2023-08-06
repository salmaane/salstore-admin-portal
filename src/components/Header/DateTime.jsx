import { Typography } from "@mui/material";
import { useState, useEffect } from "react"

function DateTime() {
    const [date, setDate] = useState(new Date());

    useEffect(()=> {
        const timer = setInterval(() => setDate(new Date()), 1000);
    
        return function cleanup() {
            clearInterval(timer);   
        };
    }, []);
    
    const months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];

  return (
    <Typography variant='body2'>
        {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
    </Typography>
  )
}

export default DateTime