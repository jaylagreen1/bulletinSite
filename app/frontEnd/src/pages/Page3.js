
import {useState} from 'react';
import Axios from 'axios';

// import './App.css';
 /* option+shift+down arrow will duplicate something for you!!! */ 
/* after doing that, if you highlight the word you want to change then command+d you can change the word */ 
function Page3() {
    console.log('page3 component loaded')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [username, setUsername] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [hostOrMember, setHostOrMember] = useState('')
  const [hostID, setHostID] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userDate = { firstName, lastName, email, phoneNumber, username, userPassword, hostOrMember, hostID}

    try{
        const response = await Axios.post('http://localhost:8800/Page3',userDate)
        console.log('User added:', response.data);
        alert('User added successfully!');

        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setUsername('');
        setUserPassword('');
        setHostOrMember('');
        setHostID('');

      } catch (error) {
        console.error('Error adding user:', error);

        if (error.response) {
            console.error('Response Data:', error.response.data);
            console.error('Response Status:', error.response.status);
            console.error('Response Headers:', error.response.headers);
            alert(`Error: ${error.response.data.message || 'Failed to add user'}`);
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
    <div>
        <h3>signUp</h3>
        <p>what up </p>
        <form onSubmit={handleSubmit}>
        <br>

        <label htmlFor='firstName'> firstName</label>
        <input id='firstName' type='text' onChange={(e) => setFirstName(e.target.value)} />
        </br>
        <br>

        <label htmlFor='lastName'> lastName</label>
        <input id='lastName' type='text' onChange={(e) => setLastName(e.target.value)} />
        </br>
        <br>

        <label htmlFor='email'> email</label>
        <input id='email' type='email' onChange={(e) => setEmail(e.target.value)} />
        </br>
        <br>

        <label htmlFor='phoneNumber'> phoneNumber</label>
        <input id='phoneNumber' type='tel' onChange={(e) => setPhoneNumber(e.target.value)} />
        </br>
        <br>

        <label htmlFor='username'> Username</label>
        <input id='username' type='text' onChange={(e) => setUsername(e.target.value)} />
        </br>
        <br>

        <label htmlFor='userPassword'> userPassword</label>
        <input id='userPassword' type='password' onChange={(e) => setUserPassword(e.target.value)} />
        </br>
        <br>

        <label htmlFor='hostOrMember'> hostOrMember</label>
        <input id='hostOrMember' type='text' onChange={(e) => setHostOrMember(e.target.value)} />
        </br>
        <br>

        <label htmlFor='hostID'> hostID</label>
        <input id='hostID' type='text' onChange={(e) => setHostID(e.target.value)} />
        </br>
        
        <div>
          <button type='button' onClick={()=> alert('Cancelled')}> Cancel</button>
          <button type='submit'> Submit</button>
        </div>
    </form>
    </div> 
    
    
  )
}

export default Page3;
