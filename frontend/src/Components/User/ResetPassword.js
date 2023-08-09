import React, { Fragment, useState ,useEffect} from 'react'
import "./resetpassword.css"
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Loading from "../layout/Loader/Loading"
import { useDispatch,useSelector } from 'react-redux';
import {clearErrors,resetPassword} from "../../actions/userAction"
import {useAlert} from "react-alert"
import { useNavigate ,useParams } from 'react-router-dom';
import MetaData from '../layout/MetaData';

const ResetPassword = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate();
    const {token} = useParams()

    const {error,success,loading} = useSelector(state => state.forgotPassword)

 
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")



    const resetPasswordSubmit = (e) =>{
        e.preventDefault()

        const myForm = new FormData()
        myForm.append("password", password);
        myForm.append("confirmPassword", confirmPassword);

        dispatch(resetPassword(token,myForm))
}


useEffect(()=>{
    if(error){
        alert.error(error)
        dispatch(clearErrors)
    }
    if(success){
        alert.success("Password Reset Successfully")
        navigate("/login")

       
    }

},[dispatch,error,alert,navigate,success])

  return (
    <>
        {loading ? <Loading/> :
        <Fragment>
            <MetaData title="RESET PASSWORD"/>
            <div className='resetPasswordContainer' >
                <div className='resetPasswordBox'>

                <h2 className="resetPasswordHeading">RESET PASSWORD</h2>

                <form className='resetPasswordForm'
                    encType='multipart/from-data'
                    onSubmit={resetPasswordSubmit}
                    >
       
             <div className='signUpPassword'>
                    <LockOpenIcon/>
                    <input type="password"
                     placeholder='New Password'
                     required
                     name='password'
                     value={password}
                     onChange={(e) =>setPassword(e.target.value)}
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
                value="RESET"
                className='resetPasswordBtn'
                
             />
            </form>

                </div>
            </div>
        </Fragment>
        }

    </>
  )
}

export default ResetPassword