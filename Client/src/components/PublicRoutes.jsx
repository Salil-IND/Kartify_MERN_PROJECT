import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
1
function PublicRoutes({children}){
    const {customer, loading} = useAuth();

    if(loading){
        return (
            <h2>Loading...</h2>
        )
    }

    if (customer){
        return (
            <Navigate to="/home"/>
        )
    }

    return (
        children
    )
}

export default PublicRoutes;