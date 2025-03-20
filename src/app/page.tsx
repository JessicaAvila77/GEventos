"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { eventosContext } from "./Context/eventosContext";
import { useEventosContext } from "./Provider/providerEventos";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {usuario, setUsuario, guardarUsuario } = useEventosContext();

  const [error, setError] = useState("");
  const router = useRouter();

  async function iniciarSesion() {
    setError("");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || data.mensaje) {
        setError("Credenciales incorrectas");
        return;
      }

      console.log("Usuario autenticado:", data);
/*
     // setUsuario(data);
     guardarUsuario({
      id_usuario: data.id_usuario,
      nombre: data.nombre,
      email: data.email,
      rol: data.rol,
      });

      setUsuario({
        id_usuario: data.id_usuario,
        nombre: data.nombre,
        email: data.email,
        rol: data.rol,
      }); */
      
      localStorage.setItem("usuario", JSON.stringify(data));

      router.push(data.rol === "admin" ? "/administrador" : "/usuario");

    } catch (error) {
      setError("Error al conectar con el servidor");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
           <Image src="/logo4.png" alt="EventFlow Logo" width={180} height={180} className="mb-4" />

        <main className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">

            <h2 className="text-center text-2xl font-bold mb-4">Inicio de Sesión</h2>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            
            <input
                type="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded mb-3"
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded mb-3"
            />
            <button 
                onClick={iniciarSesion} 
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                Iniciar Sesión
            </button>
        </main>
    </div>
  );
}