import {useState} from 'react';
import Axios from 'axios';


function ForgotPassword(){
    const [email, setEmail]=useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const userEmail = {email}
        try{
            const response = Axios.post('http://localhost:8800/ForgotPassword', userEmail)
            console.log('email accepted!:', response.data);
        
            setEmail('')
        } catch (error){
            console.error('Error with email:', error);

        if (error.response) {
            console.error('Response Data:', error.response.data);
            console.error('Response Status:', error.response.status);
            console.error('Response Headers:', error.response.headers);
            alert(`Error: ${error.response.data.message || 'Failed to login user'}`);
          } else if (error.request) {
            console.error('No response received:', error.request);
            alert('No response from server. Is the backend running?');
          } else {
            console.error('Axios error:', error.message);
            alert(`Request failed: ${error.message}`);
          }
        }
    }
    return(
        <div className='login-container'> 
            <form onSubmit={handleSubmit}>
            <h2>Forgot Password</h2>
        
        <div className='form-group'></div>
            <label>Email</label>
            <input id='email' type='email' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} /> <br />
        
        <div><button type='button' onClick={()=> alert('Email Submitted.')}> Submit</button></div> <br />
        </form>

        </div>
    )
}

export default ForgotPassword;