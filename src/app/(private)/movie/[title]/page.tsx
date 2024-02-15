import type { Metadata } from "next";
import { redirect } from "next/navigation";

import MovieComponent from "@/app/components/Movie/Movie";
import { useAuthStore } from "@/store";
import { LOGIN_PATH } from "@/app/constants";

export const metadata: Metadata = {
  title: "Movie details",
  description: "Application to browse within a movies catalog"
}; 

async function Movie() {
  const isAuthenticated = useAuthStore.getState().isAuthenticated
  if(!isAuthenticated) {
    redirect(LOGIN_PATH)
  }
  
  return (
    <MovieComponent/>
  )
}

export default Movie;