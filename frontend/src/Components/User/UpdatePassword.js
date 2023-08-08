import React, { Fragment, useState ,useEffect} from 'react'
import "./updatepassword.css"
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Loading from "../layout/Loader/Loading"
import { useDispatch,useSelector } from 'react-redux';
import {clearErrors,updatePassword} from "../../actions/userAction"
import {useAlert} from "react-alert"
import { useNavigate } from 'react-router-dom';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';


const UpdatePassword = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate();

    const {error,isUpdated,loading} = useSelector(state => state.profile)

    const [oldPassword,setOldPassword] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")



    const updatePasswordSubmit = (e) =>{
        e.preventDefault()

        const myForm = new FormData()
        myForm.append("oldPassword", oldPassword);
        myForm.append("newPassword", newPassword);
        myForm.append("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm))
}


useEffect(()=>{
    if(error){
        alert.error(error)
        dispatch(clearErrors)
    }
    if(isUpdated){
        alert.success("Profile Updated Successfully")
        navigate("/account")

        dispatch({type:UPDATE_PASSWORD_RESET})
    }

},[dispatch,error,alert,navigate,isUpdated])

  return (
    <>
        {loading ? <Loading/> :
        <Fragment>
            <MetaData title="Change Password"/>
            <div className='updatePasswordContainer' >
                <div className='updatePasswordBox'>

                <h2 className="updatePasswordHeading">UPDATE PASSWORD</h2>

                <form className='updatePasswordForm'
                    encType='multipart/from-data'
                    onSubmit={updatePasswordSubmit}
                    >
         <div className='signUpPassword'>
                    <VpnKeyIcon/>
                    <input type="password"
                     placeholder='Old Password'
                     required
                     name='password'
                     value={oldPassword}
                     onChange={(e) =>setOldPassword(e.target.value)}
                     />
             </div>

             <div className='signUpPassword'>
                    <LockOpenIcon/>
                    <input type="password"
                     placeholder='New Password'
                     required
                     name='password'
                     value={newPassword}
                     onChange={(e) =>setNewPassword(e.target.value)}
                     />
             </div>

             <div className='signUpPassword'>
                    <LockIcon/>
                    <input type="password"
                     placeholder='Confirm New Password'
                     required
                     name='password'
                     value={confirmPassword}
                     onChange={(e) =>setConfirmPassword(e.target.value)}
                     />
             </div>
      
             <input type="submit" 
                value="Change"
                className='updatePasswordBtn'
                
             />
            </form>

                </div>
            </div>
        </Fragment>
        }

    </>
  )
}

export default UpdatePassword