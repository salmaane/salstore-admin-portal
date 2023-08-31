// Mui
import { Grid } from '@mui/material';
// components
import Header from '../../components/Header/Header'
import ProfileUpdateForm from './ProfileUpdateForm';
import UserDetails from './UserDetails/UserDetails';
// Hooks
import { useEffect, useState } from 'react';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import { useLocation } from 'react-router-dom';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import usersInstance from '../../services/users';

function Profile() {

    const token = useAuthHeader();
    const {data, error, loading, axiosFetch} = useAxiosFunction(usersInstance);
    const [loadedUser, setLoadedUser] = useState();
    const [dialogPicture, setDialogPicture] = useState();
    
    const location = useLocation();
    const auth_state = useAuthUser();
    let user = location.state;
    useEffect(() => {
        if(!user) {
            axiosFetch({
                url:'/' + auth_state().id,
                method:'get',
                headers:{
                    'Authorization' : token(),
                },
                handleResponse: (data) => {setLoadedUser(data); setDialogPicture(data.profile)},
            });
        } else {
            setLoadedUser(user);
        }
    },[]);

    return (
    <Grid container gap={2}>
        <Grid item xs={12}>
            <Header title='Profile' />
        </Grid>
        <Grid item xs={12} md={4} display='flex' gap={2} flexDirection='column'>
            <UserDetails 
              loadedUser={loadedUser}
              loading={loading} 
              picture={dialogPicture}
              setPicture={setDialogPicture}
            />
        </Grid>
        <Grid item xs={12} md={7.7} >
            <ProfileUpdateForm
                loadedUser={loadedUser}
                setLoadedUser={setLoadedUser}
                error={error}
                loading={loading}
                axiosFetch={axiosFetch}
            />
        </Grid>
    </Grid>
  )
}



export default Profile