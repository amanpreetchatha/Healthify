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
                    <NavLink to="/" className={({isActive})=>isActive ? "activeNavLink" : "navLink"}>Home</NavLink>
                    <NavLink to="/" className={({isActive})=>isActive ? "activeNavLink" : "navLink"} onClick={()=>supabase.auth.signOut()}>Logout</NavLink>
                </>
                
            }
        </nav>
    )
}