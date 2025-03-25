import Axios from 'axios';
import {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';


function Login(){

    const [username, setUsername] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const{login} = useContext(AuthContext)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const userData = {username, userPassword}
    
        try{
            const response = Axios.post('http://localhost:8800/Login', userData)
            await login(userData)
            console.log('User logged in!:', response.data);
            alert('User logged in successfully!');

            setUsername('');
            setUserPassword('');

        } catch (error){
            console.error('Error logging in user:', error);

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
    
return (
    <div className='auth'>
        <h1> Login </h1>
        <form onSubmit={handleSubmit}>
        
        <br /><label htmlFor='username'> Username </label>
        <input id='username' type='text' onChange={(e) => setUsername(e.target.value)} /> <br /> <br />
        

        <label htmlFor='userPassword'> Password </label>
        <input id='userPassword' type='password' onChange={(e) => setUserPassword(e.target.value)} /> <br />
        <div><button type='button' onClick={()=> alert('Logged In')}> Login  </button></div> 
        
        <p>
            <Link to='/ForgotPassword'>Forgot Password</Link>
        </p>
        <p>
            <Link to='/Reset Password'>Reset Password</Link>
        </p>
        {/* <span> Don't have an account? <Link to='/Register> Register </Link></span>} */}
        </form>

    </div>
)
}

export default Login;