import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate,Outlet } from 'react-router-dom'

const ProtectedRouter = ({isAuthenticated}) => {

    const {user}=useSelector(state=>state.user)

    
    if (isAuthenticated===false) {
        return <Navigate to={'/login'}/>
    }
  
    return <Outlet/>
}

export default ProtectedRouter;