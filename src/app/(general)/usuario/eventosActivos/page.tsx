"use client";

import { useEventosContext } from "@/app/Provider/providerEventos";
import React, { useEffect, useState } from "react";

export default function page() {
  const {
    usuario,
    eventos,
    confirmarAsistencia,
    confirmaciones,
    cargarEventos,
  } = useEventosContext();

  // console.log("Usuario en eventosActivos:", usuario);

  useEffect(() => {
    cargarEventos();
  }, []);

  function ConfirmarAsistencia(id_evento: number) {
    if (!usuario) {
      alert("Debe iniciar sesión para confirmar asistencia.");
      return;
    }

    confirmarAsistencia(id_evento, usuario.id_usuario);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Bienvenido, {usuario?.nombre || "Usuario"}
      </h1>
      <p className="mb-4">Confirma tu asistencia a los eventos disponibles.</p>

      {usuario ? (
        <>
          {/*Eventos Activos */}
          <h2 className="text-xl font-bold mt-6">Eventos Disponibles</h2>
          <ul>
            {eventos
              .filter(
                (evento) =>
                  evento.estado === "activo" &&
                  !confirmaciones.some((c) => c.id_evento === evento.id_evento)
              )
              .map((evento) => (
                <li
                  key={evento.id_evento}
                  className="border p-2 flex justify-between items-center"
                >
                  <span>
                    {evento.nombre} -{" "}
                    {new Date(evento.fecha_hora).toLocaleString()}
                  </span>
                  <button
                    onClick={() => ConfirmarAsistencia(evento.id_evento)}
                    className="bg-green-500 text-white p-1 rounded hover:bg-green-600 transition"
                  >
                    Confirmar Asistencia
                  </button>
                </li>
              ))}
          </ul>

          {/*Eventos Confirmados */}
          <h2 className="text-xl font-bold mt-6">Eventos Confirmados</h2>
          <ul>
            {eventos
              .filter((evento) =>
                confirmaciones.some((c) => c.id_evento === evento.id_evento)
              )
              .map((evento) => (
                <li
                  key={evento.id_evento}
                  className="border p-2 flex justify-between items-center bg-gray-100"
                >
                  <span>
                    {evento.nombre} -{" "}
                    {new Date(evento.fecha_hora).toLocaleString()} 
                  </span>
                </li>
              ))}
          </ul>
        </>
      ) : (
        <p className="text-red-500 font-semibold">
          Debe iniciar sesión para ver eventos y confirmar asistencia.
        </p>
      )}
    </div>
  );
}
