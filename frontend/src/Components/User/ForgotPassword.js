import React, { Fragment, useState ,useEffect} from 'react'
import "./forgotpassword.css"
import Loading from "../layout/Loader/Loading"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useDispatch,useSelector } from 'react-redux';
import {clearErrors,forgotPassword} from "../../actions/userAction"
import {useAlert} from "react-alert"
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {

  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate();

  const {error,message,loading} = useSelector(state => state.forgotPassword)

  const [email, setEmail] = useState("")



  const forgotPasswordSubmit = (e) =>{
    e.preventDefault()

    const myForm = new FormData()
  
    myForm.append("email", email);
  

    dispatch(forgotPassword(myForm))
}

useEffect(()=>{

  if(error){
      alert.error(error)
      dispatch(clearErrors)
  }
  if(message){
      alert.success(message)
  }

},[dispatch,error,alert,message])



  return (
    <>
    {loading ? <Loading/> : 
     <Fragment>
  
         <div className='forgotPasswordContainer' >
             <div className='forgotPasswordBox'>

             <h2 className="forgotPasswordHeading">FORGOT PASSWORD</h2>

             <form className='forgotPasswordForm'
                 
                 onSubmit={forgotPasswordSubmit}
                 >
  
          <div className='forgotPasswordEmail'>
                 <MailOutlineIcon/>
                 <input type="email"
                  placeholder='Email'
                  required
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
          </div>
  

         
          <input type="submit" 
             value="Send"
             className='forgotPasswordBtn'
             
          />
         </form>

             </div>
         </div>
     </Fragment> }
 </>
  )
}

export default ForgotPassword