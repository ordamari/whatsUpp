import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { onLogin, onLogout, onSignup } from '../actions/userActions'
import Signup from '../cmps/Signup';
import { useForm } from '../services/customHooks';
import Login from '../cmps/Login';
import { cloudinaryService } from '../services/cloudinaryService';
import { Helmet } from 'react-helmet';

function _LoginSignup(props) {
    const [loginInfo, handleChangeLogin] = useForm({ username: '', password: '' });
    const [registerInfo, handleChangeSignup] = useForm({ username: '', password: '' })
    const [imgUrl, setImgUrl] = useState("https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg");
    const [isLoader, setIsLoader] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    useEffect(() => {
       if(props.loggedInUser) props.history.push('/')
    }, [])


    async function onLogin(ev) {
        ev.preventDefault()
        if (!loginInfo.username || !loginInfo.password) alert('please enter username and pasword') // change the alert
        else {
            await props.onLogin(loginInfo);
            props.history.push('');
        }
    }

    async function onSignup(ev, signupBy) {
        if (ev) ev.preventDefault()
        if (!registerInfo.username || !registerInfo.password) alert('please enter username and pasword') // change the alert
        else {
            await props.onSignup({ ...registerInfo, imgUrl: imgUrl, signupBy });
            props.history.push('');
        }
    }

    async function SocialSignup(user) {
        await props.onSignup(user);
        props.history.push('');
    }

    async function uploadImg(ev) {
        setIsLoader(true);
        try {
            const newImg = await cloudinaryService.uploadImg(ev);
            setIsLoader(false)
            setImgUrl(newImg.url)
        } catch (err) {
        }
    }

    function toggleIsRegister() {
        setIsRegister(!isRegister);
    }

    return (
        
        <div className='login-signup'>
            <div className="container">

                {!props.loggedInUser && isRegister && (
                    <Signup
                        SocialSignup={SocialSignup}
                        toggleIsRegister={toggleIsRegister}
                        registerInfo={registerInfo}
                        handleChange={handleChangeSignup}
                        imgUrl={imgUrl}
                        uploadImg={uploadImg}
                        onSignup={onSignup}
                    />
                )}
                {!props.loggedInUser && !isRegister && (
                    <Login
                        SocialSignup={SocialSignup}
                        toggleIsRegister={toggleIsRegister}
                        loginInfo={loginInfo}
                        handleChange={handleChangeLogin}
                        onLogin={onLogin}
                    />
                )}
               
            </div>
        </div>
    )

}

const mapStateToProps = state => {
    return {
        loggedInUser: state.user.loggedinUser
    }
}
const mapDispatchToProps = {
    onLogin,
    onLogout,
    onSignup,

}
export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(_LoginSignup)


