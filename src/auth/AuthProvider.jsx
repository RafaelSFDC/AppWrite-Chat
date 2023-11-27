import { Outlet, Navigate } from 'react-router-dom'
import { useSnapshot } from 'valtio';
import state from '../store';
import { useEffect } from 'react';
import { checkUser } from '../api/appWrite/api';
import Spinner from '../components/Spinner';
const AuthProvider = () => {
    const auth = useSnapshot(state)
    useEffect(() => {
        checkUser()
    }, []);
    if (state.loading) {
        return <div className='Loader'>
            <Spinner />
        </div>
    }
    return (
        <>
            {auth.logged ? <>
                <Outlet />
            </>
                : <Navigate to="/login" />}
        </>
    )
};

export default AuthProvider;
