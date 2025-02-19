import { Link } from "react-router-dom"
import styles from '../cssStyles/styles.module.css'

export function NavBar(){
    return (
        <div className={styles.topnav}>
        
            <Link to= "/"> 
                <button>Home</button> 
            </Link>
            <Link to= "/Login"> 
                <button> Login </button> 
            </Link>
            <Link to= "/Signup">
                <button > Signup</button> 
            </Link>
            <Link to="/MyProfile">
                <button>My Profile</button>
            </Link>
            <Link to="/Settings">
                <button>Settings</button>
            </Link>
            <Link to="/Search">
                <button>Search</button>
            </Link>
        
        </div>
    )
}