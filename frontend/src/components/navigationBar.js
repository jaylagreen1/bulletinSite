import { Link } from "react-router-dom"

export function NavBar(){
    return (
        <>
            <Link to= "/"> 
                <button>Home</button> 
            </Link>
            <Link to= "/Login"> 
                <button> Login </button> 
            </Link>
            <Link to= "/Signup">
                <button> Signup</button> 
            </Link>
        </>
    )
}