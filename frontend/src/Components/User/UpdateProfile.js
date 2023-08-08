import React, { Fragment, useState ,useEffect} from 'react'
import "./updateprofile.css"
import Loading from "../layout/Loader/Loading"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Person2Icon from '@mui/icons-material/Person2';
import { useDispatch,useSelector } from 'react-redux';
import {clearErrors,loadUser,updateProfile} from "../../actions/userAction"
import {useAlert} from "react-alert"
import { useNavigate } from 'react-router-dom';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';

const UpdateProfile = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate();
    const {user} = useSelector(state => state.user)
    const {error,isUpdated,loading} = useSelector(state => state.profile)


    const [name,setName] = useState() 
    const [email,setEmail] = useState()

    const [avatar,setAvatar] = useState()
    const [avatarPreview,setAvatarPreview] = useState()

    const updateProfileSubmit = (e) =>{
        e.preventDefault()

        const myForm = new FormData()
        myForm.append("name", name);
        myForm.append("email", email);
        myForm.append("avatar", avatar);

        dispatch(updateProfile(myForm))
}

const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };


useEffect(()=>{
    if(user){
        setName(user.name)
        setEmail(user.email)
        setAvatarPreview(user.avatar.url)
    }
    if(error){
        alert.error(error)
        dispatch(clearErrors)
    }
    if(isUpdated){
        alert.success("Profile Updated Successfully")
        dispatch(loadUser())
        navigate("/account")

        dispatch({type:UPDATE_PROFILE_RESET})
    }

},[dispatch,error,alert,navigate,user,isUpdated])

  return (
    <>
       {loading ? <Loading/> : 
        <Fragment>
            <div className='updateProfileContainer' >
                <div className='updateProfileBox'>

                <h2 className="updateProfileHeading">UPDATE PROFILE</h2>

                <form className='updateProfileForm'
                    encType='multipart/from-data'
                    onSubmit={updateProfileSubmit}
                    >
             <div className='updateProfileName'>
                <Person2Icon/>
                   <input type="text"
                     placeholder='Enter Your Name..'
                     required
                     name='name'
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     />
             </div>
             <div className='updateProfileEmail'>
                    <MailOutlineIcon/>
                    <input type="email"
                     placeholder='Email'
                     required
                     name='email'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     />
             </div>
     

             <div id='updateProfileImage'>
                <img src={avatarPreview} alt="avatarPreview" />
                <input type="file"
                name='avatar'
                accept='images/'
                onChange={updateProfileDataChange}
                 />
             </div>
             <input type="submit" 
                value="updateProfile"
                className='updateProfileBtn'
                
             />
            </form>

                </div>
            </div>
        </Fragment> }
    </>
  )
}

export default UpdateProfile