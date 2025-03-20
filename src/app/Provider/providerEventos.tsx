'use client'
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { Usuarios } from '../Models/Usuarios'
import { eventosContext } from '../Context/eventosContext';
import { Eventos } from '../Models/Eventos';
import { Tareas } from '../Models/Tareas';
import { Presupuesto } from '../Models/Presupuesto';
import { Cotizacion } from '../Models/Cotizacion';
import { Confirmaciones } from '../Models/Confirmaciones';

interface NodeReact{
    children : ReactNode
}

export default function providerEventos({children} : NodeReact) {

    const [usuario, setUsuario] = useState<Usuarios | null>(null);
    const [eventos, setEventos] = useState<Eventos[]>([]);

    const [tareas, setTareas] = useState<Tareas[]>([]);
    

    const [idTarea, setIdTarea] = useState(0);
    const [nombreTarea, setNombreTarea] = useState("");
    const [responsable, setResponsable] = useState("");
    const [estadoTarea, setEstadoTarea] = useState<"pendiente" | "completada">("pendiente");
    const [idEvento, setIdEvento] = useState(0);

    const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([]);
    const [idPresupuesto, setIdPresupuesto] = useState(0);
    const [partida, setPartida] = useState("");
    const [estimado, setEstimado] = useState(0);

    const [confirmaciones, setConfirmaciones] = useState<Confirmaciones[]>([]);

    const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([]);
    const [nombreEvento, setNombreEvento] = useState("");
    const [detalles, setDetalles] = useState("");




    useEffect(() => {

        const usuarioGuardado = localStorage.getItem("usuario");
        if (usuarioGuardado) {
            setUsuario(JSON.parse(usuarioGuardado));
        }


        cargarEventos();
        //cargarTareas();    

    }, []);

    useEffect(() => {
        if (usuario) {
            cargarConfirmaciones(usuario.id_usuario);
        }
    }, [usuario]);




    function guardarUsuario(user: Usuarios) {

    if (!user) return;

    console.log("Guardando usuario:", user);
    
    try {
        localStorage.setItem("usuario", JSON.stringify(user)); 
        setUsuario(user);
    } catch (error) {
        console.error("Error al guardar usuario:", error);
    }
}



    //CRUD EVENTOS
    async function cargarEventos() {
        try {
            const res = await fetch("http://localhost:5000/eventos");
            const data = await res.json();
            setEventos(data.filter((evento: Eventos) => evento.estado === "activo"));
        } catch (err) {
            console.error("Error al obtener eventos:", err);
        }
    }

    async function agregarEvento(nuevoEvento: Eventos) {
        try {
            await fetch("http://localhost:5000/eventos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoEvento),
            });
            cargarEventos();
        } catch (err) {
            console.error("Error al agregar evento:", err);
        }
    }

    async function actualizarEvento(id: number, eventoActualizado: Eventos) {
        try {
            await fetch(`http://localhost:5000/eventos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(eventoActualizado),
            });
            cargarEventos();
        } catch (err) {
            console.error("Error al actualizar evento:", err);
        }
    }

    async function eliminarEvento(id: number) {
        try {
            console.log("Inactivando evento con ID:", id);
    
            const res = await fetch(`http://localhost:5000/eventos/eliminar/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" }
            });
    
            if (!res.ok) {
                const errorData = await res.json();
                console.error("Error al inactivar evento:", errorData.mensaje);
                return;
            }
    
            cargarEventos(); 
            
        } catch (err) {
            console.error("Error al inactivar evento:", err);
        }
    }

    //no se ha implementado
    async function restaurarEvento(id: number) {
        try {
            await fetch(`http://localhost:5000/eventos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ estado: "activo" }),
            });
            cargarEventos();
        } catch (err) {
            console.error("Error al restaurar evento:", err);
        }
    }

    function cerrarSesion() {
        setUsuario(null);
        setConfirmaciones([]);
        localStorage.removeItem("usuario");
    }

    //CRUD TAREAS

    async function cargarTareas(eventoId: number) {
        try {
            const res = await fetch(`http://localhost:5000/tareas/${eventoId}`);
            const data = await res.json();
            setTareas(data);
        } catch (err) {
            console.error("Error al obtener tareas:", err);
        }
    }

    async function agregarTarea(nuevaTarea: Tareas) {
        try {
            await fetch("http://localhost:5000/tareas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevaTarea)
            });

            cargarTareas(nuevaTarea.id_evento);
        } catch (err) {
            console.error("Error al agregar tarea:", err);
        }
    }

    async function actualizarTarea(id: number, tareaActualizada: Tareas) {
        try {
            await fetch(`http://localhost:5000/tareas/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(tareaActualizada)
            });

            cargarTareas(tareaActualizada.id_evento);
        } catch (err) {
            console.error("Error al actualizar tarea:", err);
        }
    }

    async function eliminarTarea(id: number, eventoId: number) {
        try {
            await fetch(`http://localhost:5000/tareas/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });

            cargarTareas(eventoId);
        } catch (err) {
            console.error("Error al eliminar tarea:", err);
        }
    }

//PRESUPUESTO

async function cargarPresupuestos(eventoId: number) {
    try {
        const res = await fetch(`http://localhost:5000/presupuesto/${eventoId}`);
        const data = await res.json();
        setPresupuestos(data);
    } catch (err) {
        console.error("Error al obtener presupuestos:", err);
    }
}

async function agregarPresupuesto(nuevoPresupuesto: Presupuesto) {
    try {
        await fetch("http://localhost:5000/presupuesto", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoPresupuesto)
        });

        cargarPresupuestos(nuevoPresupuesto.id_evento);
    } catch (err) {
        console.error("Error al agregar presupuesto:", err);
    }
}

async function actualizarPresupuesto(id: number, presupuestoActualizado: Presupuesto) {
    try {
        await fetch(`http://localhost:5000/presupuesto/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(presupuestoActualizado)
        });

        cargarPresupuestos(presupuestoActualizado.id_evento);
    } catch (err) {
        console.error("Error al actualizar presupuesto:", err);
    }
}

async function eliminarPresupuesto(id: number, eventoId: number) {
    try {
        await fetch(`http://localhost:5000/presupuesto/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        cargarPresupuestos(eventoId);
    } catch (err) {
        console.error("Error al eliminar presupuesto:", err);
    }
}

//FUNCIONALIDADES USUARIO

async function cargarConfirmaciones(id_usuario: number) {
    try {
        const res = await fetch(`http://localhost:5000/confirmaciones/usuario/${id_usuario}`);
        const data = await res.json();
        if (res.ok) {
            setConfirmaciones(data);
        }
    } catch (err) {
        console.error("Error al obtener confirmaciones:", err);
    }
}

async function confirmarAsistencia(id_evento: number, id_usuario: number) {
    try {
        console.log(`Confirmando asistencia de usuario ${id_usuario} al evento ${id_evento}`);
        
        const res = await fetch("http://localhost:5000/confirmaciones", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_usuario, id_evento }),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("Error al confirmar asistencia:", data.mensaje);
            alert(data.mensaje);
            return;
        }

        console.log("Asistencia confirmada:", data);

        // Actualiza el estado de confirmaciones
        setConfirmaciones([...confirmaciones, data]);

    } catch (err) {
        console.error("Error al confirmar asistencia:", err);
    }
}
/*
async function cargarCotizaciones() {
    try {
        const res = await fetch("http://localhost:5000/cotizaciones");
        const data = await res.json();
        setCotizaciones(data);
    } catch (error) {
        console.error("Error al cargar cotizaciones:", error);
    }
}
*/

async function cargarCotizaciones(id_usuario: number) {
    try {
        const res = await fetch(`http://localhost:5000/cotizaciones`);
        const data = await res.json();
        setCotizaciones(data.filter((cotizacion: Cotizacion) => cotizacion.id_usuario === id_usuario));
    } catch (err) {
        console.error("Error al obtener cotizaciones:", err);
    }
} 

// Solicitar una cotización
async function solicitarCotizacion(nuevaCotizacion: Cotizacion) {
    try {
        console.log("Enviando cotización:", nuevaCotizacion);

        const res = await fetch("http://localhost:5000/cotizaciones", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaCotizacion),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("Error al solicitar cotización:", data.mensaje);
            alert("No se pudo solicitar la cotización.");
            return;
        }

        console.log("Cotización guardada:", data);

        cargarCotizaciones(nuevaCotizacion.id_usuario);

    } catch (err) {
        console.error("Error en la solicitud de cotización:", err);
    }
}

//funciones que requeire el amdinistrador con la info de usuarios

async function cargarConfirmacionesEvento(id_evento: number) {
    try {
        const res = await fetch(`http://localhost:5000/confirmaciones/evento/${id_evento}`);
        const data = await res.json();
        setConfirmaciones(data);
    } catch (err) {
        console.error("Error al cargar confirmaciones del evento:", err);
    }
}

// Cargar todas las cotizaciones (Administrador)
async function cargarCotizacionesAdmin() {
    try {
        const res = await fetch("http://localhost:5000/cotizaciones");
        const data = await res.json();
        setCotizaciones(data);
    } catch (err) {
        console.error("Error al cargar cotizaciones:", err);
    }
}

//Aprobar o rechazar una cotización (Administrador)
async function aprobarCotizacion(id_cotizacion: number, estado: "aprobado" | "rechazado") {
    try {
        const res = await fetch(`http://localhost:5000/cotizaciones/${id_cotizacion}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ estado }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error("Error al actualizar cotización:", errorData.mensaje);
            return;
        }

        cargarCotizacionesAdmin();
    } catch (err) {
        console.error("Error al actualizar cotización:", err);
    }
}



  return (
    <eventosContext.Provider value={{
                usuario,
                setUsuario,
                cerrarSesion,
                eventos,
                setEventos,
                agregarEvento,
                actualizarEvento,
                eliminarEvento,
                restaurarEvento,
                cargarEventos,
                tareas,
                setTareas,
                agregarTarea,
                actualizarTarea,
                eliminarTarea,
                cargarTareas,
                idTarea, setIdTarea,
                nombreTarea, setNombreTarea,
                responsable, setResponsable,
                estadoTarea, setEstadoTarea,
                idEvento, setIdEvento,
                presupuestos, setPresupuestos,
                agregarPresupuesto, actualizarPresupuesto, eliminarPresupuesto, cargarPresupuestos,
                idPresupuesto, setIdPresupuesto,
                partida, setPartida,
                estimado, setEstimado,
                confirmaciones, setConfirmaciones, cargarConfirmaciones,
                confirmarAsistencia,
                cotizaciones,
                setCotizaciones,
                cargarCotizaciones,
                solicitarCotizacion,guardarUsuario,
                nombreEvento,
                setNombreEvento,
                detalles,
                setDetalles,
                cargarConfirmacionesEvento,
                cargarCotizacionesAdmin,
                aprobarCotizacion,

                
    }}> 

        {children}
    </eventosContext.Provider>
    
  )
}

export function useEventosContext(){
    return useContext(eventosContext)
}
