import React, { useContext } from 'react'

import Kitten from "../images/kitten.jpeg"
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

// full blog site: https://www.youtube.com/watch?v=0aPLk2e2Z3g

// https://www.youtube.com/watch?v=A8k4A7TuhDY
//https://github.com/ksekwamote/password_recovery/blob/master/client/src/components/Login.jsx

function NavigationBar (){

    const {currentUser, logout} = useContext(AuthContext)


    return(
        <div className='navbar'>
            <div className='container'>
                <div className='logo'>
                    <Link to='/'> 
                    <img src={Kitten} alt="" />
                    </Link>
                </div>
            <div className='links'>
                <Link className='link' to="/?cat=Settings">
                <h6> Settings </h6>
                </Link>
                <Link className='link' to="/?cat=Accessibility">
                <h6> Accessibility </h6>
                </Link>
                <span>{currentUser?.username}</span>
                {currentUser ? (<span onClick={logout}>Logout</span> ): (<Link className='link' to='/Login'>Login </Link>)}
                <span className = "write"> 
                    <Link to="/Write">Write</Link>
                </span>
            </div>

            </div>
        </div>
    )
}

export default NavigationBar
{/* 
export function NavBar(){
    return (
        <div className={styles.topnav}>
        
            <Link to= "/"> 
                <button>Home</button> 
            </Link>
            <Link to= "/Login"> 
                <button> Login </button> 
            </Link>
            <Link to= "/Signup">n
                <button > Signup</button> 
            </Link>
        
        </div>
    )
} */}