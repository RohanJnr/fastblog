// import { use } from "react"

import { cookies } from 'next/headers';
import LandingPage from './LandingPage';

async function getData(value: string) {
  const res = await fetch('http://localhost:8000/api/auth/me', {
      headers: {
          // @ts-ignore
          "Authorization": `Bearer ${value}`
      }
  })
  return await res.json()

}

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  let data = null
  if (token) {
    data = await getData(token.value)
  }

  return (
    <LandingPage data={data} />
  )
}
