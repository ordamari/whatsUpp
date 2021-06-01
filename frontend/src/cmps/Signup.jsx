import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoginGoogle from './LoginGoogle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


export default function Signup({ toggleIsRegister, registerInfo, handleChange, imgUrl, uploadImg, onSignup, SocialSignup }) {
  return (
    <div className='signup login main-container' >
      <h2>Signup</h2>
      <div className='social-login'>
      </div>
      <p onClick={() => toggleIsRegister()} >You have an account? <span>Login</span></p>
      <form>
        <label>
          <AccountCircleIcon />
          <input onChange={handleChange} name="username" type="text" autoComplete="off" placeholder='User Name' value={registerInfo.username} />
        </label>
        <label>
          <VpnKeyIcon />
          <input onChange={handleChange} name="password" type="password" autoComplete="off" placeholder='Password' value={registerInfo.password} />
        </label>
        <label htmlFor="img-upload">
          <div className='profile-img'>
            <p>Click to select Profile Image</p>
            <img src={imgUrl} alt="" />
          </div>
        </label>
        <input hidden type="file" className="file-input" name="img-upload" id="img-upload"
          onChange={uploadImg} />

        <button className='submit' type="submit" onClick={(ev) => { onSignup(ev, 'wixer') }}>Signup</button>

      </form>

    </div>
  )
}

