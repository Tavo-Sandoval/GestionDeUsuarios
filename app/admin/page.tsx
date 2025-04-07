'use client'

import { signOut } from "next-auth/react"
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
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bienvenido Admin</h1>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  )
}
