import React, { useEffect, useState } from 'react';
import LoginGoogle from './LoginGoogle';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


export default function Login({ toggleIsRegister, loginInfo, handleChange,onLogin,SocialSignup }) {

  


  return (
    <div className='login'>
      <h2>Login</h2>
      <div>
      </div>
      <p onClick={() => toggleIsRegister()} >Don't have an account? <span>Signup</span></p>
      <form>
        <label>
        <AccountCircleIcon/>
        <input onChange={handleChange} name="username" type="text" autoComplete="off" placeholder='User Name' value={loginInfo.username} />
        </label>
        <label>
          <VpnKeyIcon/>
        <input onChange={handleChange} name="password" type="password" autoComplete="off" placeholder='Password' value={loginInfo.password} />
        </label>
        <button className='submit' type="submit" onClick={onLogin}>Login</button>
      </form>
    </div>
  )
}

