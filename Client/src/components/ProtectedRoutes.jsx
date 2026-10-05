import {useAuth} from '../context/authContext';
import {Navigate} from 'react-router-dom';

function ProtectedRoutes({children}){
    const {customer, loading} = useAuth();
    if(loading){
        return (
            <h2>Hang On for a minute...</h2>
        )
    }
    if(!customer){
        return (
            <Navigate to="/login"/>
        )
    }

    return (
        children
    )
}

export default ProtectedRoutes;