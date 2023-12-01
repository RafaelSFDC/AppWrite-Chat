import { Outlet, Navigate } from 'react-router-dom'
import { useSnapshot } from 'valtio';
import state from '../store';
import { useEffect } from 'react';
import { checkUser } from '../api/appWrite/api';
import Spinner from './../components/Spinner';
const IsLogged = () => {
    const auth = useSnapshot(state)
    useEffect(() => {
        checkUser()
    }, []);
    if (state.loading.start) {
        return <Spinner />
    }
    return (
        <>
            {!auth.logged ? <>
                <Outlet />
            </>
                : <Navigate to="/" />}
        </>
    )
};

export default IsLogged;
