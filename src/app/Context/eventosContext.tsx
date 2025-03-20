import { createContext } from "react";
import { Usuarios} from "../Models/Usuarios"
import { Eventos } from "../Models/Eventos";
import { Tareas } from "../Models/Tareas";
import { Presupuesto } from "../Models/Presupuesto";
import { Cotizacion } from "../Models/Cotizacion";
import { Confirmaciones } from "../Models/Confirmaciones";


export const eventosContext = createContext({

    // LOGIN
    //para guardar al usuario 
    usuario: null as Usuarios | null,

    setUsuario: (usuario: Usuarios | null) => {},

    cerrarSesion: () => {},

    //EVENTOS

    eventos: [] as Eventos[],
    setEventos: (eventos: Eventos[]) => {},

    agregarEvento: (evento: Eventos) => {},
    actualizarEvento: (id: number, evento: Eventos) => {},
    eliminarEvento: (id: number) => {},
    restaurarEvento: (id: number) => {},
    cargarEventos: () => {},

    //TAREAS

    tareas: [] as Tareas[],
    setTareas: (tareas: Tareas[]) => {},


    agregarTarea: (tarea: Tareas) => {},
    actualizarTarea: (id: number, tarea: Tareas) => {},
    eliminarTarea: (id: number, eventoId: number) => {},
    cargarTareas: (eventoId: number) => {},

    // Atributos del formulario de tareas
    idTarea: 0,
    setIdTarea: (id: number) => {},
    nombreTarea: "",
    setNombreTarea: (nombre: string) => {},
    responsable: "",
    setResponsable: (responsable: string) => {},
    estadoTarea: "pendiente" as "pendiente" | "completada",
    setEstadoTarea: (estado: "pendiente" | "completada") => {},
    idEvento: 0,
    setIdEvento: (id: number) => {},

    //PRESUPUESTO

    presupuestos: [] as Presupuesto[],
    setPresupuestos: (presupuestos: Presupuesto[]) => {},

    agregarPresupuesto: (presupuesto: Presupuesto) => {},
    actualizarPresupuesto: (id: number, presupuesto: Presupuesto) => {},
    eliminarPresupuesto: (id: number, eventoId: number) => {},
    cargarPresupuestos: (eventoId: number) => {},

    idPresupuesto: 0,
    setIdPresupuesto: (id: number) => {},
    partida: "",
    setPartida: (partida: string) => {},
    estimado: 0,
    setEstimado: (estimado: number) => {},

    //funciones de USUARIO

    guardarUsuario: (usuario: Usuarios) => {},

    confirmaciones: [] as Confirmaciones[],
    setConfirmaciones: (confirmaciones: Confirmaciones[]) => {},
    cargarConfirmaciones: (id_usuario: number) => {},
    confirmarAsistencia: (id_evento: number, id_usuario: number) => {},
    
    cotizaciones: [] as Cotizacion[],
    setCotizaciones: (cotizaciones: Cotizacion[]) => {},
    cargarCotizaciones: (id_usuario: number) => {},
    solicitarCotizacion: (cotizacion: Cotizacion) => {},
    nombreEvento: "",
    setNombreEvento: (nombre: string) => {},
    detalles: "",
    setDetalles: (detalles: string) => {},

    //roll administrador

    aprobarCotizacion: (id_cotizacion: number, estado: "aprobado" | "rechazado") => {},
    cargarConfirmacionesEvento: (id_evento: number) => {}, 
    cargarCotizacionesAdmin: () => {},



})