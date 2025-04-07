'use client'

import { signOut } from "next-auth/react"
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
export default function UsuarioPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bienvenido Usuario</h1>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  )
}
