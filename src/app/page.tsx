"use client";

import { redirect } from "next/navigation";

export default function Home() {
  redirect('/search?q=')
  return (
    <h1 className="text-8xl font-bold text-center mt-20">Redirecting...</h1>
  )
}
