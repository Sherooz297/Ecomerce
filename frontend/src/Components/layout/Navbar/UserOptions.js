import React, { useState } from 'react'
import {SpeedDial , SpeedDialAction} from "@mui/material"
import Backdrop from '@mui/material/Backdrop';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListIcon from '@mui/icons-material/List';
import profile  from "../../../images/Profile.png"
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';
import { useDispatch } from 'react-redux';

const UserOptions = ({user}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate(); 
    const alert = useAlert()
    const [open,setOpen] = useState()

    const options = [
        {icon : <ListIcon/> , name:"Orders", func:orders},
        {icon : <PersonIcon/> , name:"Profile", func:account},
        {icon : <ExitToAppIcon/> , name:"Logout", func:LogoutUser}
    ]

    if(user.role === "admin"){
        
        options.unshift({icon : <DashboardIcon/> , name:"DashBoard", func:dashboard})
    }

    function dashboard(){
        navigate("/dashboard")
    }
    function orders(){
        navigate("/orders")
    }
    function account(){
        navigate("/account")
    }
    function LogoutUser(){
        dispatch(logout())
        alert.success("Logout Successfully")
    }


  return (
    <>
        <Backdrop open={open} style={{zIndex:"10"}}/>
        <SpeedDial
            className='speedDial'
            ariaLabel='SpeedDial tooltrip example'
            style={{zIndex:"11"}}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            direction='down'
            icon={<img className='speedDialIcon'
            src={user.avatar.url ? user.avatar.url : {profile}}
            alt='profiile'
            ></img> }
        >
            {options.map((item) => (
           <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func}></SpeedDialAction>
            ))}     
         </SpeedDial>
    </>
  )
}

export default UserOptions