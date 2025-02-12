import { Link } from "react-router-dom"

export function NavBar(){
    return (
        <>
            <Link to= "/"> 
                <button>Home</button> 
            </Link>
            <Link to= "/page1"> 
                <button> Page 1 </button> 
            </Link>
            <Link to= "/page3">
                <button> Page 3</button> 
            </Link>
        </>
    )
}