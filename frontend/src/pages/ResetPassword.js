import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Axios from 'axios';

function ResetPassword(){
    const [email,setEmail] = useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
   

    

    const handleSubmit= async (e)=>{
        e.preventDefault()
        
        const response = Axios.post('http://localhost:8800/ResetPassword', {confirmPassword, email})
        console.log('success!:', response.data);
        alert('User logged in successfully!');
 
    }
    return(
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Resest Password</h2>
                <div className="form-group"> 

                <br /><label htmlFor='email'> Email </label>
                <input id='email' type='email' onChange={(e) => setEmail(e.target.value)} /> <br /> <br />
        
                    <label>New Password</label>
                    <input type="password" placeholder="Enter your new password" value ={password} onChange={e=> setPassword(e.target.value)}required />
            
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" placeholder="Confirm your new password" value ={confirmPassword} onChange={e=> setConfirmPassword(e.target.value)}required />
                </div>
                <button type="submit" className="login-btn">
                    Reset Password
                </button>
            </form>
        </div>
    )
}

export default ResetPassword;