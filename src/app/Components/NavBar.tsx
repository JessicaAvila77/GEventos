'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useEventosContext } from '../Provider/providerEventos';
import Link from 'next/link';

export default function NavBar() {

    const { usuario, cerrarSesion } = useEventosContext();
    const router = useRouter();

    function Logout() {
        cerrarSesion();
        router.push("/");
    }


    return (
        <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
            <div className="flex gap-4">
                <Link href="/administrador/eventos" className="hover:text-gray-300">Eventos</Link>
                <Link href="/administrador/tareas" className="hover:text-gray-300">Tareas</Link>
                <Link href="/administrador/presupuesto" className="hover:text-gray-300">Presupuesto</Link>
                <Link href="/administrador/infoUsuarios" className="hover:text-gray-300">Informacion usuarios</Link>
            </div>
            <div className="flex gap-4 items-center">
                <span>{usuario?.nombre}</span>
                <button onClick={Logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                    Cerrar Sesión
                </button>
            </div>
        </nav>
    );
}
