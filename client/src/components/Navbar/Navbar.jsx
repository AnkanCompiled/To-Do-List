import { useState, useEffect } from 'react'
import './Navbar.css'
import Login from '../Login/Login'


function Navebar({name = '',logininfo = 'false'}){
    const [loginstate, isLogin] = useState()
    const [signupBox, updateBox] = useState()

    useEffect(() => {
        if(logininfo == 'false'){
            isLogin(notLoggedIn())
        }else{
            isLogin(loggedIn())
        }     
    }, [logininfo]);
    function notLoggedIn(){
        return(
            <>
                <button className="login-btn" onClick={showLoginBox}>Login</button>
                <button className="signup-btn" onClick={showRegisterBox}>Signup</button>
            </>
        )
    }
    function loggedIn(){
        return(
            <button className="logout-btn" onClick={userLogout}>Log Out</button>
        )
    }
    function showRegisterBox(){
        updateBox(<Login choice="Register"/>)
    }
    function showLoginBox(){
        updateBox(<Login choice="Login"/>)
    }
    function userLogout(){
        localStorage.removeItem('userinfo')
        window.location.reload()
    }

    return(
        <>
            <div className='navbar'>
                <div className="navbar-left">
                    <h1 className="navbar-title">{name}</h1>
                </div>
                <div className="navbar-right">{loginstate}</div>
            </div>
            {signupBox}
        </>
    )
}

export default Navebar