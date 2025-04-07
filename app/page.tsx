'use client'

import { useState, useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'authenticated') {
      if (session?.user?.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/user')
      }
    }
  }, [status, session, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    })

    if (res?.error) setError('❌ Credenciales incorrectas')
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 border p-6 rounded-xl shadow-lg"
      >
        <h1 className="text-xl font-bold text-center">Iniciar sesión</h1>

        <Input
          name="email"
          type="email"
          placeholder="Correo"
          onChange={handleChange}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" className="w-full">
          Iniciar sesión
        </Button>

        <p className="text-center text-sm">
          ¿No tienes cuenta?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Regístrate aquí
          </a>
        </p>
      </form>
    </main>
  )
}
