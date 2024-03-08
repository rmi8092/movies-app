import type { Metadata } from "next";
import { redirect } from "next/navigation";

import MovieComponent from "@/app/components/Movie/Movie";
import { useAuthStore } from "@/store";
import { LOGIN_PATH } from "@/app/constants";
import { MoviesClient } from "@/app/api/client";

export const metadata: Metadata = {
  title: "Movie details",
  description: "Application to browse within a movies catalog"
}; 

export default async function Movie() {
  /* const isAuthenticated = useAuthStore.getState().isAuthenticated
  if(!isAuthenticated) {
    redirect(LOGIN_PATH)
  } */
  
  return (
    <MovieComponent />
  )
};