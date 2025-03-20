
export interface Cotizacion {
    id_cotizacion: number;
    nombre_evento: string;
    detalles: string;
    estado: "pendiente" | "aprobado" | "rechazado";
    id_usuario: number;
}