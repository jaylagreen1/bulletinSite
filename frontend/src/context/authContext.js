import {createContext, useEffect, useState} from 'react';
import Axios from 'axios';

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user') || null))

    const login = async(inputs)=>{ 
        const res = await Axios.post('http://localhost:8800/Login', inputs)
        setCurrentUser(res.data)
    }
    const logout = async(inputs)=>{ 
        await Axios.post('http://localhost:8800/Logout')
        setCurrentUser(null)
    }

    useEffect(()=>{
        localStorage.setItem('user',JSON.stringify(currentUser))
    }, [currentUser])

    return(
        <AuthContextProvider value={{currentUser,login,logout}}>
            {children}
        </AuthContextProvider>
    )
}