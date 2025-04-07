import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, password } = body

  if (!name || !email || !password) {
    return NextResponse.json({ message: 'Todos los campos son obligatorios' }, { status: 400 })
  }

  const userExists = await prisma.user.findUnique({
    where: { email },
  })

  if (userExists) {
    return NextResponse.json({ message: 'El usuario ya existe' }, { status: 409 })
  }

  const hashedPassword = await hash(password, 10)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: 'USER', //asignar rol por defecto
    },
  })
  

  return NextResponse.json({ message: 'Usuario registrado con éxito' })
}
