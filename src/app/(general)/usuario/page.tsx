'use client'
import { useEventosContext } from '@/app/Provider/providerEventos';
import React from 'react'
import Image from "next/image";

export default function Usuarios() {

  const { usuario } = useEventosContext();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
         {/* Logo */}
         <Image src="/logo4.png" alt="EventFlow Logo" width={180} height={180} className="mb-4" />
      
     <h1 className="text-4xl font-bold text-blue-600 mb-2 text-center">Bienvenido, {usuario?.nombre }<br></br>a EventFlow</h1>
     <br />
    <p className="text-lg text-gray-700 text-center">Soluciones inteligentes, para Eventos Inteligentes</p>

      
    </div>
  )
}
