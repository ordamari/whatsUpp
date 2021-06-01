import React, { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import { FcGoogle } from 'react-icons/all';


export default function LoginGoogle({ SocialSignup }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function responseGoogle(response) {
    console.log("🚀 ~ file: LoginGoogle.jsx ~ line 13 ~ responseGoogle ~ response", response)
    if(!response.profileObj) return;
    const user = {
      signupBy: 'google',
      username: response.profileObj.name,
      password: response.googleId,
      imgUrl: response.profileObj.imageUrl
    }

    SocialSignup(user);
  }


  let googleContent = null;

  if (!isLoggedIn) {
    googleContent = (
      <GoogleLogin
    clientId="1079228497092-gpfmppt5ikmcps5830n6q553pfjfj84q.apps.googleusercontent.com"
    render={renderProps => (
      <button className='google' onClick={renderProps.onClick} disabled={renderProps.disabled}><FcGoogle/>Login with Google</button>
    )}
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
    )

  }



  return (
    <div className='Login-google'>
      {googleContent}
    </div>
  )
}
