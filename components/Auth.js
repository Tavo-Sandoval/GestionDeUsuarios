"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Auth() {
  const { data: session } = useSession();

  console.log(session?.user?.role); // Aquí tienes el rol

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
