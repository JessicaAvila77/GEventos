"use client";
import { useEventosContext } from "@/app/Provider/providerEventos";
import React, { useState } from "react";

export default function page() {
  
  const {eventos, agregarEvento, actualizarEvento, eliminarEvento, restaurarEvento} = useEventosContext();
  const [nombre, setNombre] = useState("");
  const [fecha_hora, setFechaHora] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [idEventoEditar, setIdEventoEditar] = useState<number | null>(null);

  function agregar() {
    if (!nombre || !fecha_hora || !ubicacion) return;

    const fechaFormateada = new Date(fecha_hora)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    agregarEvento({
      id_evento: 0,
      nombre,
      fecha_hora: fechaFormateada,
      ubicacion,
      estado: "activo",
    });

    setNombre("");
    setFechaHora("");
    setUbicacion("");
  }

  function actualizar() {
    if (idEventoEditar !== null) {
      
      const fechaFormateada = new Date(fecha_hora).toISOString().slice(0, 19).replace("T", " ");


      actualizarEvento(idEventoEditar, {
        id_evento: idEventoEditar,
        nombre,
        fecha_hora: fechaFormateada,
        ubicacion,
        estado: "activo",
      });

      setIdEventoEditar(null);
      setNombre("");
      setFechaHora("");
      setUbicacion("");
    }
  }

  function eliminar(id: number) {
    eliminarEvento(id);
  }

  function cargarDatos(evento: any) {
    setIdEventoEditar(evento.id_evento);
    setNombre(evento.nombre);
    //setFechaHora(evento.fecha_hora);
    setUbicacion(evento.ubicacion);

    const fechaFormateada = new Date(evento.fecha_hora).toISOString().slice(0, 16);

    setFechaHora(fechaFormateada);
  }

  function formatearFecha(fechaISO: string) {
    const fecha = new Date(fechaISO);
    const opciones: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    };
    return fecha.toLocaleString("es-ES", opciones).replace(",", "");
}

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Gestión de Eventos</h1>

      <div className="mb-4 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border p-2"
        />
        <input
          type="datetime-local"
          value={fecha_hora}
          onChange={(e) => setFechaHora(e.target.value)}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Ubicación"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          className="border p-2"
        />
        {idEventoEditar ? (
          <button
            onClick={actualizar}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Actualizar Evento
          </button>
        ) : (
          <button
            onClick={agregar}
            className="bg-green-500 text-white p-2 rounded"
          >
            Agregar Evento
          </button>
        )}
      </div>

      <ul>
        {eventos
          .filter((evento) => evento.estado === "activo")
          .map((evento) => (
            <li
              key={evento.id_evento}
              className="border p-2 flex justify-between items-center"
            >
              <span>
                {evento.nombre} - {formatearFecha(evento.fecha_hora)} - {evento.ubicacion}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => cargarDatos(evento)}
                  className="bg-yellow-500 text-white p-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminar(evento.id_evento)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
