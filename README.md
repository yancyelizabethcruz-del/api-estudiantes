# API REST - Administración de Estudiantes

Primer API REST construida con **Node.js** y **Express.js**. Gestiona una lista de estudiantes almacenada en un arreglo de JavaScript (datos "quemados" en memoria, sin base de datos). Cada vez que el servidor se reinicia, los datos vuelven a su estado inicial.

## Requisitos

- Node.js (v16 o superior)
- npm

## Instalación y ejecución

```bash
# 1. Clonar el repositorio
git clone <URL_DE_ESTE_REPOSITORIO>
cd api-estudiantes

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor
node index.js
```

El servidor quedará disponible en `http://localhost:3000`.

## Endpoints disponibles

| Método | Endpoint                  | Descripción                              | Respuesta exitosa | Errores |
|--------|----------------------------|-------------------------------------------|--------------------|---------|
| GET    | `/api/estudiantes`         | Lista todos los estudiantes               | 200 OK             | -       |
| GET    | `/api/estudiantes/:id`     | Obtiene un estudiante por su id           | 200 OK             | 404 si no existe |
| POST   | `/api/estudiantes`         | Crea un nuevo estudiante                  | 201 Created        | 400 si faltan campos obligatorios |
| PUT    | `/api/estudiantes/:id`     | Actualiza un estudiante existente         | 200 OK             | 404 si no existe |
| DELETE | `/api/estudiantes/:id`     | Elimina un estudiante                     | 200 OK             | 404 si no existe |

### Estructura de un estudiante

```json
{
  "id": 1,
  "nombre": "Ana Torres",
  "curso": "Backend con Node.js",
  "edad": 22
}
```

### Ejemplos de uso (curl)

```bash
# Listar todos
curl http://localhost:3000/api/estudiantes

# Obtener uno
curl http://localhost:3000/api/estudiantes/1

# Crear
curl -X POST http://localhost:3000/api/estudiantes \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Pedro Ruiz","curso":"DevOps","edad":26}'

# Actualizar
curl -X PUT http://localhost:3000/api/estudiantes/1 \
  -H "Content-Type: application/json" \
  -d '{"edad":23}'

# Eliminar
curl -X DELETE http://localhost:3000/api/estudiantes/1
```

## Notas

- Los datos no persisten: al reiniciar el servidor (`node index.js`), la lista de estudiantes vuelve a su estado inicial.
- El campo `id` se asigna automáticamente (autoincremental) al crear un estudiante.
- `nombre`, `curso` y `edad` son campos obligatorios para crear un estudiante (POST).
