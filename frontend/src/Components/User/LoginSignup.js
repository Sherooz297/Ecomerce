import React, { Fragment, useRef, useState ,useEffect} from 'react'
import "./loginsignup.css"
import Loading from "../layout/Loader/Loading"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import Person2Icon from '@mui/icons-material/Person2';
import { Link } from 'react-router-dom';
import img from "../../images/Profile.png"
import { useDispatch,useSelector } from 'react-redux';
import {login,clearErrors,register} from "../../actions/userAction"
import {useAlert} from "react-alert"
import { useNavigate } from 'react-router-dom';


const LoginSignup = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate();

    const {error,loading,isAuthenticated} = useSelector(state => state.user)

    const loginTab = useRef(null)
    const registerTab = useRef(null)
    const switcherTab = useRef(null)


    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword,setLoginPassword] = useState("")


    const loginSubmit = (e) =>{
        e.preventDefault()
        dispatch(login(loginEmail,loginPassword))
    }

    const [user,setUser] = useState({
        name:"",
        email:"",
        password:""
    })

    const {name , email, password} = user

    const [avatar,setAvatar] = useState()
    const [avatarPreview,setAvatarPreview] = useState(img)

    const registerSubmit = (e) =>{
            e.preventDefault()

            const myForm = new FormData()
            myForm.append("name", name);
            myForm.append("email", email);
            myForm.append("password", password);
            myForm.append("avatar", avatar);

            dispatch(register(myForm))
    }

    const registerDataChange = (e) => {
        if(e.target.name === "avatar"){
            const reader = new FileReader();
            reader.onload = () =>{
                if(reader.readyState ===2){
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])
        }
        else{
            setUser({...user,[e.target.name]:e.target.value})
        }
    }

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors)
        }
        if(isAuthenticated){
            navigate("/account")
        }

    },[dispatch,error,alert,navigate,isAuthenticated])

    const switchTabs = (e, tab) => {
        if (tab === "login") {
          switcherTab.current.classList.add("shiftToNeutral");
          switcherTab.current.classList.remove("shiftToRight");
    
          registerTab.current.classList.remove("shiftToNeutralForm");
          loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
          switcherTab.current.classList.add("shiftToRight");
          switcherTab.current.classList.remove("shiftToNeutral");
    
          registerTab.current.classList.add("shiftToNeutralForm");
          loginTab.current.classList.add("shiftToLeft");
        }
      };


  return (
    <>
       {loading ? <Loading></Loading>:
       <Fragment>
       <div className='LoginSignupContainer'>
            <div className='LoginSignupBox'>
            <div>
                <div className='login_signup_toggle'>
                    <p onClick={(e) => switchTabs(e,"login")}>LOGIN</p>
                    <p onClick={(e) => switchTabs(e,"register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
            </div>
               <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                <div className='loginEmail'>
                    <MailOutlineIcon/>
                    <input type="email"
                     placeholder='Email'
                     required
                     value={loginEmail}
                     onChange={(e) => setLoginEmail(e.target.value)}
                     />
                </div>
                <div className='loginPassword'>
                    <LockIcon/>
                    <input type="password"
                     placeholder='Password'
                     required
                     value={loginPassword}
                     onChange={(e) => setLoginPassword(e.target.value)}
                     />
                </div>
                <Link to="/password/forgot">Forget Pasword ?</Link>
                <input type="submit" value="Login" className='loginBtn' />
            </form>

            {/* Registration form  */}

            <form className='signupForm'
                    ref={registerTab}
                    encType='multipart/from-data'
                    onSubmit={registerSubmit}
                    >
             <div className='signUpName'>
                <Person2Icon/>
                   <input type="text"
                     placeholder='Enter Your Name..'
                     required
                     name='name'
                     value={name}
                     onChange={registerDataChange}
                     />
             </div>
             <div className='signUpEmail'>
                    <MailOutlineIcon/>
                    <input type="email"
                     placeholder='Email'
                     required
                     name='email'
                     value={email}
                     onChange={registerDataChange}
                     />
             </div>
             <div className='signUpPassword'>
                    <LockIcon/>
                    <input type="password"
                     placeholder='password'
                     required
                     name='password'
                     value={password}
                     onChange={registerDataChange}
                     />
             </div>

             <div id='registerImage'>
                <img src={avatarPreview} alt="avatarPreview" />
                <input type="file"
                name='avatar'
                accept='images/'
                onChange={registerDataChange}
                 />
             </div>
             <input type="submit" 
                value="Register"
                className='signUpBtn'
                
             />


            </form>
            </div>
        </div>
       </Fragment>
       }
    </>
  )
}

export default LoginSignup