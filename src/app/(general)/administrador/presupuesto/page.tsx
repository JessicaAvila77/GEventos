"use client";
import { useEventosContext } from "@/app/Provider/providerEventos";
import React, { useEffect } from "react";

export default function page() {
  const {
    eventos,
    presupuestos,
    agregarPresupuesto,
    actualizarPresupuesto,
    eliminarPresupuesto,
    partida,
    setPartida,
    estimado,
    setEstimado,
    idEvento,
    setIdEvento,
    idPresupuesto,
    setIdPresupuesto,
    cargarPresupuestos,
  } = useEventosContext();

  useEffect(() => {
    if (idEvento !== 0) {
      cargarPresupuestos(idEvento);
    }
  }, [idEvento]);

  function Guardar() {
    if (!partida || estimado <= 0 || idEvento === 0) {
      alert(
        "Todos los campos son obligatorios y el estimado debe ser mayor a 0."
      );
      return;
    }

    if (idPresupuesto === 0) {
      agregarPresupuesto({
        id_presupuesto: 0,
        partida,
        estimado,
        id_evento: idEvento,
      });
    } else {
      actualizarPresupuesto(idPresupuesto, {
        id_presupuesto: idPresupuesto,
        partida,
        estimado,
        id_evento: idEvento,
      });
    }

    limpiarFormulario();
  }

  function Eliminar(id: number) {
    eliminarPresupuesto(id, idEvento);
  }

  function cargarDatos(presupuesto: any) {
    setIdPresupuesto(presupuesto.id_presupuesto);
    setPartida(presupuesto.partida);
    setEstimado(presupuesto.estimado);
    setIdEvento(presupuesto.id_evento);
  }

  function limpiarFormulario() {
    setIdPresupuesto(0);
    setPartida("");
    setEstimado(0);
    setIdEvento(0);
  }

  let totalPresupuesto: number = 0;
  for (let i = 0; i < presupuestos.length; i++) {
    totalPresupuesto += Number(presupuestos[i].estimado); 
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Presupuesto</h1>

      {/* Selector de evento */}
      <select
        value={idEvento}
        onChange={(e) => setIdEvento(Number(e.target.value))}
        className="border p-2"
      >
        <option value="0" disabled>
          Selecciona un evento
        </option>
        {eventos
          .filter((evento) => evento.estado === "activo")
          .map((evento) => (
            <option key={evento.id_evento} value={evento.id_evento}>
              {evento.nombre}
            </option>
          ))}
      </select>

      {/* Formulario de presupuesto */}
      <div className="mb-4 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Partida"
          value={partida}
          onChange={(e) => setPartida(e.target.value)}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Estimado"
          value={estimado}
          onChange={(e) => setEstimado(Number(e.target.value))}
          className="border p-2"
        />
        <button
          onClick={Guardar}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {idPresupuesto === 0
            ? "Agregar Presupuesto"
            : "Actualizar Presupuesto"}
        </button>
      </div>

      {/* Lista de presupuestos */}
      <ul className="mt-4">
        {presupuestos.map((presupuesto) => (
          <li
            key={presupuesto.id_presupuesto}
            className="border p-2 flex justify-between items-center"
          >
            <span>
              {presupuesto.partida} - L.{presupuesto.estimado}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => cargarDatos(presupuesto)}
                className="bg-yellow-500 text-white p-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => Eliminar(presupuesto.id_presupuesto)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 p-2 bg-gray-200 text-lg font-bold">
        Total del Presupuesto: L.{totalPresupuesto ? totalPresupuesto.toFixed(2) : "0.00"}
      </div>

    </div>
  );
}
