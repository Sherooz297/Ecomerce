import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate,Outlet } from 'react-router-dom'

const ProtectedRouter = ({isAdmin,isAuthenticated}) => {

    const {user}=useSelector(state=>state.user)

    
    if (isAuthenticated===false) {
        return <Navigate to={'/login'}/>
    }
    if(isAuthenticated===false&&isAdmin===false && user.role !=="admin"){
        return <Navigate to={'/login'}/>
    }
  
    return <Outlet/>
}

export default ProtectedRouter;