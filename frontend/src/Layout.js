import { NavBar } from "./components/navigationBar";
import { Outlet } from "react-router-dom";

function Layout(){
    return(
        <>
            <NavBar/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}

export default Layout