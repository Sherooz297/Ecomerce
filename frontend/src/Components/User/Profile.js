import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../layout/Loader/Loading'
import { useNavigate } from 'react-router-dom';
import "./profile.css"

const Profile = () => {
    const navigate = useNavigate(); 
    const { user, loading, isAuthenticated } = useSelector(state => state.user)

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login")
        }
    }, [navigate, isAuthenticated])

    if (loading || !user || !user.avatar) {
        return <Loading />;
    }

    return (
        <Fragment>
            <MetaData title={`${user.name}'s Profile`} />
            <div className='profileContainer'>
                <div className=''>
                    <h1>My Profile</h1>
                    <img src={user.avatar.url} alt={user.name}></img>
                    <Link to="/me/update">EDIT PROFILE</Link>
                </div>
                <div>
                    <div>
                        <h4>Full Name</h4>
                        <p>{user.name}</p>
                    </div>
                    <div>
                        <h4>User Email</h4>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <h4>Joined On</h4>
                        <p>{String(user.createdAt).substr(0, 10)}</p>
                    </div>
                    <div>
                        <Link to="/orders"> My Orders</Link>
                        <Link to="/password/update">Change Password</Link>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Profile;
