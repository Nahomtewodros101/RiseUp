'use client'

import { useEffect, useState } from 'react'

// Define the UserJwtPayload type
type UserJwtPayload = {
  role: string;
  [key: string]: ; 
};
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'

export default function LoginCheck() {
  const [user, setUser] = useState<UserJwtPayload | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser()
      setUser(currentUser)

      // If user is logged in
      if (currentUser) {
        if (currentUser.role === 'admin') {
          router.push('/console')
        } else {
          router.push('/')
        }
      }
    }

    fetchUser()
  }, [router])

  return <></> 
}
