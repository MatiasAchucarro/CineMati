import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = ({
    canActivate,
    redirectPath =  '/'
}) =>{
    const authToken = localStorage.getItem('authToken');
    if (!canActivate || !authToken)
        {
            return <Navigate to={redirectPath} replace/>

    }
    return <Outlet/>
}

export default ProtectedRoute;