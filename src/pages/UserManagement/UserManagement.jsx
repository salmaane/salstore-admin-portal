import { Box, Grid } from "@mui/material";
import Header from "../../components/Header/Header";
import UsersTable from "./UsersTable";

function UserManagement() {
  return (
    <Box>
      <Grid container gap={3}>
        <Grid item xs={12}>
          <Header title='User Management'/>
        </Grid>
        <Grid item xs={12}>
          <UsersTable title='Users' role='user'/>
        </Grid>
        <Grid item xs={12}>
          <UsersTable title='Admins' role='admin'/>
        </Grid>
      </Grid>
    </Box>
  )
}

export default UserManagement