"use client";
import { useEventosContext } from "@/app/Provider/providerEventos";
import React, { useEffect, useState } from "react";

export default function page() {
  const {
    eventos,
    confirmaciones,
    cotizaciones,
    cargarConfirmacionesEvento,
    cargarCotizacionesAdmin,
    aprobarCotizacion,
  } = useEventosContext();

  const [idEventoSeleccionado, setIdEventoSeleccionado] = useState<number | null>(null);

  useEffect(() => {
    cargarCotizacionesAdmin();
  }, []);

  function cargarAsistentes(id_evento: number) {
    setIdEventoSeleccionado(id_evento);
    cargarConfirmacionesEvento(id_evento);
  }

  function gestionarCotizacion(
    id_cotizacion: number,
    estado: "aprobado" | "rechazado") {

    aprobarCotizacion(id_cotizacion, estado);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Gestión de Asistencias y Cotizaciones
      </h1>

      {/*Selección de evento para ver asistentes */}
      <div className="mb-4">
        <h2 className="text-xl font-bold">Asistentes por Evento</h2>
        <select
          onChange={(e) => cargarAsistentes(Number(e.target.value))}
          className="border p-2"
        >
          <option value="">Selecciona un evento</option>
          {eventos.map((evento) => (
            <option key={evento.id_evento} value={evento.id_evento}>
              {evento.nombre}
            </option>
          ))}
        </select>
      </div>

      {/*Lista de asistentes confirmados */}
      {idEventoSeleccionado && (
        <>
          <h3 className="text-lg font-bold mt-4">Asistentes Confirmados</h3>
          <ul>
            {confirmaciones.length > 0 ? (
              confirmaciones.map((confirmacion) => (
                <li key={confirmacion.id_confirmacion} className="border p-2">
                  Usuario ID: {confirmacion.id_usuario} - Evento ID:{" "}
                  {confirmacion.id_evento}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No hay asistentes confirmados.</p>
            )}
          </ul>
        </>
      )}

      {/*Lista de cotizaciones */}
      <div className="mt-6">
        <h2 className="text-xl font-bold">Cotizaciones Recibidas</h2>
        <ul>
          {cotizaciones.length > 0 ? (
            cotizaciones.map((cotizacion) => (
              <li
                key={cotizacion.id_cotizacion}
                className="border p-2 flex justify-between items-center"
              >
                <span>
                  {cotizacion.nombre_evento} - {cotizacion.detalles} (
                  {cotizacion.estado})
                </span>
                {cotizacion.estado === "pendiente" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        gestionarCotizacion(
                          cotizacion.id_cotizacion,
                          "aprobado"
                        )
                      }
                      className="bg-green-500 text-white p-1 rounded"
                    >
                      Aprobar
                    </button>
                    <button
                      onClick={() =>
                        gestionarCotizacion(
                          cotizacion.id_cotizacion,
                          "rechazado"
                        )
                      }
                      className="bg-red-500 text-white p-1 rounded"
                    >
                      Rechazar
                    </button>
                  </div>
                )}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No hay cotizaciones pendientes.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
