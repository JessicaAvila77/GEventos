
export interface Eventos {
    id_evento: number;
    nombre: string;
    fecha_hora: string;  
    ubicacion: string;
    estado: "activo" | "inactivo";
}