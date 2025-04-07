'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation' // 👈 se necesita para redirigir
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message || 'Error al registrar')

      setMessage('✅ Usuario registrado exitosamente')
      setForm({ name: '', email: '', password: '' })
    } catch (err) {
      const error = err as Error
      setMessage('❌ ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">Registro de Usuario</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <Input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Registrando...' : 'Registrarse'}
        </Button>
      </form>

      {message && <p className="mt-4 text-sm">{message}</p>}

      {/* Agregado: mensaje + botón para volver al login */}
      <div className="mt-6 text-center">
        <p className="text-sm mb-2">¿Ya tienes cuenta?</p>
        <Button
          variant="outline"
          onClick={() => router.push('/')}
        >
          ⬅ Volver al Login
        </Button>
      </div>
    </main>
  )
}
