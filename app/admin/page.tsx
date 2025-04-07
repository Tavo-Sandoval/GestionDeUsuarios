'use client'

import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string | null
    }
  }
}         
export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (session?.user?.role !== 'admin') {
      router.push('/') // redirige si no es admin
    }
  }, [session, status])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Zona de Administrador</h1>
      {session?.user?.role === 'admin' && <p>Bienvenido, Admin ✨</p>}
    </div>
  )
}
