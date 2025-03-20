"use client";
import { useEventosContext } from "@/app/Provider/providerEventos";
import React, { useEffect } from "react";

export default function page() {
  const {eventos, tareas, agregarTarea, actualizarTarea, eliminarTarea, cargarTareas, nombreTarea,
    setNombreTarea,
    responsable,
    setResponsable,
    estadoTarea,
    setEstadoTarea,
    idEvento,
    setIdEvento,
    idTarea,
    setIdTarea,
  } = useEventosContext();

  useEffect(() => {
    if (idEvento !== 0) {
      cargarTareas(idEvento);
    }
  }, [idEvento]);

  function Guardar() {
    if (!nombreTarea || !responsable || idEvento === 0) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (idTarea === 0) {
      agregarTarea({
        id_tarea: 0,
        nombre: nombreTarea,
        responsable,
        estado: estadoTarea,
        id_evento: idEvento,
      });
    } else {
      actualizarTarea(idTarea, {
        id_tarea: idTarea,
        nombre: nombreTarea,
        responsable,
        estado: estadoTarea,
        id_evento: idEvento,
      });
    }

    limpiarFormulario();
  }

  function Eliminar(id: number) {
    eliminarTarea(id, idEvento);
  }

  function cargarDatos(tarea: any) {
    setIdTarea(tarea.id_tarea);
    setNombreTarea(tarea.nombre);
    setResponsable(tarea.responsable);
    setEstadoTarea(tarea.estado);
    setIdEvento(tarea.id_evento);
  }

  function limpiarFormulario() {
    setIdTarea(0);
    setNombreTarea("");
    setResponsable("");
    setEstadoTarea("pendiente");
    setIdEvento(0);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Tareas</h1>

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
        .filter(evento => evento.estado === "activo") 
        .map((evento) => (
          <option key={evento.id_evento} value={evento.id_evento}>
            {evento.nombre}
          </option>
        ))}
      </select>

      {/* Formulario de tareas */}
      <div className="mb-4 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Nombre de la tarea"
          value={nombreTarea}
          onChange={(e) => setNombreTarea(e.target.value)}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Responsable"
          value={responsable}
          onChange={(e) => setResponsable(e.target.value)}
          className="border p-2"
        />
        <select
          value={estadoTarea}
          onChange={(e) =>
            setEstadoTarea(e.target.value as "pendiente" | "completada")
          }
          className="border p-2"
        >
          <option value="pendiente">Pendiente</option>
          <option value="completada">Completada</option>
        </select>

        <button
          onClick={Guardar}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {idTarea === 0 ? "Agregar Tarea" : "Actualizar Tarea"}
        </button>
      </div>

      {/* Lista de tareas */}
      <ul className="mt-4">
        {tareas.map((tarea) => (
          <li
            key={tarea.id_tarea}
            className="border p-2 flex justify-between items-center"
          >
            <span>
              {tarea.nombre} - {tarea.responsable} - {tarea.estado}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => cargarDatos(tarea)}
                className="bg-yellow-500 text-white p-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => Eliminar(tarea.id_tarea)}
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
