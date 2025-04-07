"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useSession } from 'next-auth/react'

const { data: session } = useSession()

console.log(session?.user?.role) //  aquí tienes el rol

export default function Auth() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
          <p>Bienvenido, {session.user.email}</p>
          <button onClick={() => signOut()}>Cerrar sesión</button>
        </>
      ) : (
        <button onClick={() => signIn()}>Iniciar sesión</button>
      )}
    </div>
  );
}
