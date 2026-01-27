import { NavLink } from "react-router";
import supabase from "../supabase-client";
import useUserContext from "~/context";

export default function NavBar(){
    const user=useUserContext();
    return (
        <nav>            
            {
                user===undefined ?
                <NavLink to="/login" className={({isActive})=>isActive ? "activeNavLink" : "navLink"}>Login</NavLink> :
                <>
                    
                    <NavLink to="/" className={({isActive})=>isActive ? "activeNavLink" : "navLink"}>Bio Metrics</NavLink>
                    <NavLink to="/repcounter" className={({isActive})=>isActive ? "activeNavLink" : "navLink"}>Exercise</NavLink>
                    <NavLink to="/login" className={({isActive})=>isActive ? "navLink" : "navLink"} onClick={()=>supabase.auth.signOut()}>Logout</NavLink> 
                </>
            }
        </nav>
    )
}