import { Box, TextField} from "@mui/material";

function SearchBar() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', mb:1 }}>
            <TextField 
                variant="standard" label="Search Products"
                sx={{ width:200 }} size="small"
            />     
    </Box>
  )
}

export default SearchBar