
const express= require('express')
const cors= require('cors')


const Evento= require('./Models/Evento');
const Usuario= require('./Models/Usuario');
const Confirmacion= require('./Models/Confirmacion');
const Cotizacion= require('./Models/Cotizacion');
const Presupuesto= require('./Models/Presupuesto');
const Tarea= require('./Models/Tarea');


const app =express()

app.use(express.json())
app.use(cors())

//Login

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario en la base de datos por el correo
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario || usuario.password !== password) {
            return res.status(400).json({ mensaje: 'Credenciales incorrectas' });
        }

        // devuelve el usuario (sin la contraseña por seguridad)
        res.status(200).json({
            id_usuario: usuario.id_usuario,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
        });

    } catch (error) {
        res.status(500).json({ mensaje: 'Ocurrió un error en el servidor' });
    }
});


//RUTAS USUARIOS, aunque no los gestionamos en frontend, es necesario crearlos?

app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ 'mensaje': 'Ocurrió un error' });
    }
});

app.post('/usuarios', async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ 'mensaje': 'Ocurrió un error' });
    }
});


//RUTAS EVENTOS, no construiremos el metodo delete por que lo manejamos con activo/inactivo

app.get('/eventos', async (req, res) => {
    try {
        const eventos = await Evento.findAll();
        res.status(200).json(eventos);
    } catch (error) {
        res.status(500).json({ 'mensaje': 'Ocurrió un error' });
    }
});

app.post('/eventos', async (req, res) => {
    try {
        const evento = await Evento.create(req.body);
        res.status(200).json(evento);
    } catch (error) {
        res.status(500).json({ 'mensaje': 'Ocurrió un error' });
    }
});

app.put('/eventos/:id', async (req, res) => {
    try {
        const { nombre, fecha_hora, ubicacion } = req.body;
        const { id } = req.params;

        const [updated] = await Evento.update(
            { nombre, fecha_hora, ubicacion },
            { where: { id_evento: id } }
        );

        updated
            ? res.status(200).json({ mensaje: 'Evento actualizado correctamente' })
            : res.status(400).json({ mensaje: 'Evento no encontrado' });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error en la actualización', error });
    }
});

//no llega el id dle frontend
app.put('/eventos/eliminar/:id', async (req, res) => {
    try {
        const { id } = req.params;

        console.log("ID recibido en el backend para inactivar:", id);

        const [updated] = await Evento.update(
            { estado: "inactivo" },
            { where: { id_evento: id } }
        );

        updated
            ? res.status(200).json({ mensaje: 'Evento inactivado correctamente' })
            : res.status(400).json({ mensaje: 'Evento no encontrado' });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al inactivar el evento', error });
    }
});

//RUTAS TAREAS, falta revisar

//lista tareas de acuerdo al evento
app.get('/tareas/:eventoId', async (req, res) => {
    try {
        const tareas = await Tarea.findAll({ 
            where: { id_evento: req.params.eventoId } });

        res.status(200).json(tareas);

    } catch (error) {
        res.status(500).json({ 'mensaje': 'Ocurrió un error' });
    }
});

app.post('/tareas', async (req, res) => {
    try {
        const tarea = await Tarea.create(req.body);
        res.status(201).json(tarea);
    } catch (error) {
        res.status(500).json({ 'mensaje': 'Ocurrió un error' });
    }
});

app.put('/tareas/:id', async (req, res) => {
    try {
        const [updated] = await Tarea.update(req.body, { 
            where: { id_tarea: req.params.id } });
        updated ? res.status(200).json({ 'mensaje': 'Tarea actualizada' }) :
            res.status(400).json({ 'mensaje': 'Tarea no encontrada' });
    } catch (error) {
        res.status(500).json({ 'mensaje': 'Ocurrió un error' });
    }
});


app.delete('/tareas/:id', async (req, res) => {
    try {
        await Tarea.destroy({ 
            where: { id_tarea: req.params.id } });
        res.status(200).json({ 'mensaje': 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ 'mensaje': 'Ocurrió un error' });
    }
});

// RUTAS PRESUPUESTO

app.get('/presupuesto/:eventoId', async (req, res) => {
    try {
        const presupuesto = await Presupuesto.findAll({ 
            where: { id_evento: req.params.eventoId } });
        res.status(200).json(presupuesto);
    } catch (error) {
        res.status(500).json({ 'mensaje': 'Ocurrió un error' });
    }
});

app.post('/presupuesto', async (req, res) => {
    try {
        const presupuesto = await Presupuesto.create(req.body);
        res.status(201).json(presupuesto);
    } catch (error) {
        res.status(500).json({ 'mensaje': 'Ocurrió un error' });
    }
});

app.put('/presupuesto/:id', async (req, res) => {
    try {
        const [updated] = await Presupuesto.update(req.body, { 
            where: { id_presupuesto: req.params.id } });

        updated ? res.status(200).json({ 'mensaje': 'Presupuesto actualizado' }) :
            res.status(400).json({ 'mensaje': 'Presupuesto no encontrado' });
    } catch (error) {
        res.status(500).json({ 'mensaje': 'Ocurrió un error' });
    }
});

app.delete('/presupuesto/:id', async (req, res) => {
    try {
        await Presupuesto.destroy({ 
            where: { id_presupuesto: req.params.id } });
        res.status(200).json({ 'mensaje': 'Presupuesto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ 'mensaje': 'Ocurrió un error' });
    }
});

//METODOS CONFIRMACIONES
//Un usuario confirma asistencia a un evento
app.post('/confirmaciones', async (req, res) => {
    try {
        const { id_usuario, id_evento } = req.body;
        const existente = await Confirmacion.findOne({ 
            where: { id_usuario, id_evento } });
        if (existente) {
            return res.status(400).json({ 'mensaje': 'El usuario ya confirmó asistencia a este evento' });
        }
        const confirmacion = await Confirmacion.create({ id_usuario, id_evento, estado: 'confirmado' });
        res.status(200).json(confirmacion);
    } catch (error) {
        res.status(500).json({ 'mensaje': 'Ocurrió un error al confirmar asistencia' });
    }
});

//muestra listados de asistentes X evento
app.get('/confirmaciones/evento/:eventoId', async (req, res) => {
    try {
        const confirmaciones = await Confirmacion.findAll({
            where: { id_evento: req.params.eventoId }
        });

        if (confirmaciones.length === 0) {
            return res.status(404).json({ mensaje: "No hay asistentes confirmados para este evento." });
        }

        res.status(200).json(confirmaciones);
    } catch (error) {
        console.error("Error al obtener confirmaciones:", error);
        res.status(500).json({ mensaje: "Ocurrió un error al obtener los asistentes" });
    }
});

app.get('/confirmaciones/usuario/:id_usuario', async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const confirmaciones = await Confirmacion.findAll({
            where: { id_usuario }
        });

        if (confirmaciones.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(confirmaciones);
    } catch (error) {
        res.status(500).json({ mensaje: 'Ocurrió un error al obtener confirmaciones', error });
    }
});

//COTIZACIONES

//Un usuario solicita una cotización
app.post('/cotizaciones', async (req, res) => {
    try {
        const { nombre_evento, detalles, id_usuario } = req.body;

        console.log("Datos recibidos en la API de cotización:", req.body);

        if (!nombre_evento || !detalles || !id_usuario) {
            return res.status(400).json({ 'mensaje': 'Todos los campos son obligatorios' });
        }

        const cotizacion = await Cotizacion.create({ 
            nombre_evento, 
            detalles, 
            estado: "pendiente", 
            id_usuario 
        });

        res.status(201).json(cotizacion);
    } catch (error) {
        console.error("Error al crear cotización:", error);
        res.status(500).json({ 'mensaje': 'Ocurrió un error al guardar la cotización' });
    }
});

//cotizaciones recibidas por el administrador
app.get('/cotizaciones', async (req, res) => {
    try {
        const { id_usuario } = req.query;

        let whereClause = {};
        if (id_usuario) {
            whereClause = { id_usuario }; 
        }

        const cotizaciones = await Cotizacion.findAll({ where: whereClause });

        if (cotizaciones.length === 0) {
            return res.status(404).json({ mensaje: "No hay cotizaciones registradas." });
        }

        res.status(200).json(cotizaciones);
    } catch (error) {
        console.error("Error al obtener cotizaciones:", error);
        res.status(500).json({ mensaje: "Ocurrió un error al obtener las cotizaciones" });
    }
});

//el administrador aprueba o rechaza
app.put('/cotizaciones/:id', async (req, res) => {
    try {
        const { estado } = req.body;

        if (!['aprobado', 'rechazado'].includes(estado)) {
            return res.status(400).json({ mensaje: "Estado inválido. Debe ser 'aprobado' o 'rechazado'" });
        }

        const [updated] = await Cotizacion.update({ estado }, { where: { id_cotizacion: req.params.id } });

        if (updated === 0) {
            return res.status(404).json({ mensaje: "Cotización no encontrada" });
        }

        res.status(200).json({ mensaje: `Cotización ${estado} correctamente` });
    } catch (error) {
        console.error("Error al actualizar cotización:", error);
        res.status(500).json({ mensaje: "Ocurrió un error" });
    }
});



app.listen(5000, ()=>{
    console.log('Aplicacion ejecutando en puerto 5000')
})




/*
//posiblemente esta demás
app.put('/eventos/eliminar/:id', async (req, res) => {
    try {
        await Evento.update({ estado: 'inactivo' }, { 
            where: { id_evento: req.params.id } });
        res.status(200).json({ 'mensaje': 'Evento eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ 'mensaje': 'Ocurrió un error' });
    }
});
//posiblemente esta demás
app.put('/eventos/restaurar/:id', async (req, res) => {
    try {
        await Evento.update({ estado: 'activo' }, { 
            where: { id_evento: req.params.id } });
        res.status(200).json({ 'mensaje': 'Evento restaurado correctamente' });
    } catch (error) {
        res.status(500).json({ 'mensaje': 'Ocurrió un error' });
    }
});

//Modificar a un solo metodo que lleve de parametro el estado aprobado o rechazado
//aprobar una cotizacion, podemos mandar el estado como parametro y dejar uno solo
app.put('/cotizaciones/aprobar/:id', async (req, res) => {
    try {
        const [updated] = await Cotizacion.update({ estado: 'aprobado' }, { 
            where: { id_cotizacion: req.params.id } });
        updated ? res.status(200).json({ 'mensaje': 'Cotización aprobada' }) :
            res.status(400).json({ 'mensaje': 'Cotización no encontrada' });
    } catch (error) {
        res.status(500).json({ 'mensaje': 'Ocurrió un error' });
    }
});

//rechazar una cotizacion
app.put('/cotizaciones/rechazar/:id', async (req, res) => {
    try {
        const [updated] = await Cotizacion.update({ estado: 'rechazado' }, { 
            where: { id_cotizacion: req.params.id } });
        updated ? res.status(200).json({ 'mensaje': 'Cotización rechazada' }) :
            res.status(400).json({ 'mensaje': 'Cotización no encontrada' });
    } catch (error) {
        res.status(500).json({ 'mensaje': 'Ocurrió un error' });
    }
});



*/