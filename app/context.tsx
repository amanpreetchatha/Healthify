import { User } from '@supabase/supabase-js';
import {createContext, ReactNode, useContext } from 'react';
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import supabase from "./supabase-client";


export const UserContext = createContext<User | undefined>(undefined);

//Provider
export const UserProvider = ({children}: {children: ReactNode})=>{
  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
      
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
  
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, [])
  return (
    <UserContext.Provider value={session?.user}>
      {children}
    </UserContext.Provider>
  );


}
export default function useUserContext(){
  const user = useContext(UserContext);
  
  if(user===undefined){
    return undefined;
    
  }
  
  return user;
} 