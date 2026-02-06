import { Navigate, Outlet } from "react-router-dom"
import DashboardLayout from "../layout/DashboardLayout"

const ProtectedRoute = ({children}) => {
    const isAuthenticated = true
    const isLoading = false

    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }
    if(isLoading){
        return<div>LOADING...</div>
    }

    return (
    <DashboardLayout>{children ? children : <Outlet/>}</DashboardLayout>
  )
}

export default ProtectedRoute