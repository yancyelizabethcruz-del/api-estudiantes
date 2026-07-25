const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para poder leer JSON en el body de las peticiones (req.body)
app.use(express.json());

// ----- Datos "quemados" (hardcoded), sin base de datos -----
let estudiantes = [
  { id: 1, nombre: 'Ana Torres', curso: 'Backend con Node.js', edad: 22 },
  { id: 2, nombre: 'Luis Ramírez', curso: 'Frontend con React', edad: 24 },
  { id: 3, nombre: 'Carla Mendoza', curso: 'Base de Datos', edad: 21 },
];

// id autoincremental: siguiente id disponible
let siguienteId = 4;

// ----- GET /api/estudiantes -> listar todos -----
app.get('/api/estudiantes', (req, res) => {
  res.status(200).json({
    total: estudiantes.length,
    estudiantes,
  });
});

// ----- GET /api/estudiantes/:id -> obtener uno -----
app.get('/api/estudiantes/:id', (req, res) => {
  const id = Number(req.params.id);
  const estudiante = estudiantes.find((e) => e.id === id);

  if (!estudiante) {
    return res.status(404).json({ mensaje: `No existe un estudiante con id ${id}` });
  }

  res.status(200).json(estudiante);
});

// ----- POST /api/estudiantes -> crear -----
app.post('/api/estudiantes', (req, res) => {
  const { nombre, curso, edad } = req.body;

  // Validación de campos obligatorios
  if (!nombre || !curso || !edad) {
    return res.status(400).json({
      mensaje: 'Los campos nombre, curso y edad son obligatorios',
    });
  }

  const nuevoEstudiante = {
    id: siguienteId++,
    nombre,
    curso,
    edad,
  };

  estudiantes.push(nuevoEstudiante);
  res.status(201).json(nuevoEstudiante);
});

// ----- PUT /api/estudiantes/:id -> actualizar -----
app.put('/api/estudiantes/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = estudiantes.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ mensaje: `No existe un estudiante con id ${id}` });
  }

  const { nombre, curso, edad } = req.body;

  estudiantes[index] = {
    ...estudiantes[index],
    ...(nombre && { nombre }),
    ...(curso && { curso }),
    ...(edad && { edad }),
  };

  res.status(200).json(estudiantes[index]);
});

// ----- DELETE /api/estudiantes/:id -> eliminar -----
app.delete('/api/estudiantes/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = estudiantes.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ mensaje: `No existe un estudiante con id ${id}` });
  }

  const eliminado = estudiantes.splice(index, 1)[0];
  res.status(200).json({ mensaje: 'Estudiante eliminado', estudiante: eliminado });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
