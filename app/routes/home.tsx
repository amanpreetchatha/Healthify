import useUserContext from "~/context";
import type { Route } from "./+types/home";
import Login from "./login";
import supabase from "../supabase-client";
import { useState } from "react";
import EnterWeight from "../components/bioMetrics";
import BioMetrics from "../components/bioMetrics";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Gym | Home" },
    { name: "description", content: "A web app to track your fitness journey." },
  ];
}

export default function Home() {
  const user = useUserContext();

  //issue: flash of login component before user home component.
  return user===undefined ? <Login/> : <BioMetrics/>
}
