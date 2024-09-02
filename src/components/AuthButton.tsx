'use client'

import { useAuth } from './AuthProvider'
import { signIn, signOut } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const AuthButton = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return <Button variant="ghost" disabled>Loading...</Button>
  }

  if (user) {
    return (
      <>
        <Link href="/my-plans">
          <Button variant="ghost" className="text-white hover:bg-white/20 hover:text-purple-300">
            My Plans
          </Button>
        </Link>
        <Button variant="ghost" onClick={signOut} className="text-white hover:bg-white/20 hover:text-purple-300">
          Sign Out
        </Button>
      </>
    )
  }

  return (
    <Button variant="ghost" onClick={signIn} className="text-white hover:bg-white/20 hover:text-purple-300">
      Sign In
    </Button>
  )
}

export default AuthButton