# 📚 CRUD React + Vite - Proyecto Educativo

Este es un proyecto educativo que demuestra cómo crear una aplicación CRUD (Create, Read, Update, Delete) completa usando **React**, **Vite**, **Material-UI** y **JSON Server**.

## 🎯 **Objetivos del Proyecto**

- Aprender a crear operaciones CRUD en React
- Implementar un sistema de autenticación básico
- Organizar código con patrones de queries centralizadas
- Manejar variables de entorno de forma segura
- Crear una arquitectura escalable y mantenible

## 🛠️ **Tecnologías Utilizadas**

- **Frontend**: React 18 + Vite
- **Styling**: Material-UI (MUI) + CSS personalizado
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Backend**: JSON Server (simulación de API REST)
- **Variables de Entorno**: Vite Environment Variables

## 📁 **Estructura del Proyecto**

```
src/
├── components/          # Componentes reutilizables
│   ├── Footer.jsx
│   ├── Header.jsx
│   └── ProtectedRoute.jsx
├── config/             # Configuración
│   ├── api.js         # Configuración de endpoints
│   └── constants.js   # Constantes de la aplicación
├── crud/              # Componentes CRUD específicos
│   ├── products/      # CRUD de productos
│   └── users/         # CRUD de usuarios
├── helpers/           # 🎯 Queries centralizadas (PATRÓN CLAVE)
│   ├── queriesUsuarios.js    # Operaciones de usuarios
│   └── queriesProductos.js   # Operaciones de productos
├── hooks/             # Custom hooks
├── pages/             # Páginas principales
│   ├── AdminPage.jsx
│   ├── HomePage.jsx
│   ├── Login.jsx
│   ├── Products.jsx
│   └── Users.jsx
└── utils/             # Utilidades
    ├── apiClient.js
    └── scrollToTop.js
```

## 🚀 **Guía Paso a Paso para Replicar**

### **Paso 1: Configuración Inicial**

```bash
# 1. Crear proyecto con Vite
npm create vite@latest mi-crud-app -- --template react
cd mi-crud-app

# 2. Instalar dependencias
npm install

# 3. Instalar dependencias adicionales
npm install axios react-router-dom @mui/material @emotion/react @emotion/styled

# 4. Instalar JSON Server para simular backend
npm install -g json-server
```

### **Paso 2: Configurar Variables de Entorno**

Crear archivo `.env` en la raíz:

```env
VITE_API_BASE=http://localhost:3001
VITE_API_USUARIOS=http://localhost:3001/users
VITE_API_PRODUCTOS=http://localhost:3001/products
```

### **Paso 3: Crear Base de Datos JSON**

Crear archivo `db.json`:

```json
{
  "users": [
    {
      "id": 1,
      "name": "Admin",
      "email": "admin@test.com",
      "password": "123456",
      "role": "admin"
    },
    {
      "id": 2,
      "name": "Usuario",
      "email": "user@test.com",
      "password": "123456",
      "role": "user"
    }
  ],
  "products": [
    {
      "id": 1,
      "name": "Laptop",
      "code": "LAP001",
      "price": 999.99,
      "imgUrl": "https://via.placeholder.com/300x200"
    }
  ]
}
```

### **Paso 4: 🎯 Patrón de Queries Centralizadas**

#### **A. Crear `src/helpers/queriesUsuarios.js`**

```javascript
import axios from 'axios';

const URL_USUARIOS = import.meta.env.VITE_API_USUARIOS;

// Obtener todos los usuarios
export const getAllUsers = async () => {
  try {
    const response = await axios.get(URL_USUARIOS);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

// Crear nuevo usuario
export const createUser = async (userData) => {
  try {
    const response = await axios.post(URL_USUARIOS, userData);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

// Actualizar usuario
export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${URL_USUARIOS}/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error;
  }
};

// Eliminar usuario
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${URL_USUARIOS}/${id}`);
    return true;
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw error;
  }
};
```

#### **B. Crear `src/helpers/queriesProductos.js`**

```javascript
import axios from 'axios';

const URL_PRODUCTOS = import.meta.env.VITE_API_PRODUCTOS;

// Obtener todos los productos
export const getAllProducts = async () => {
  try {
    const response = await axios.get(URL_PRODUCTOS);
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

// Obtener producto por ID
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${URL_PRODUCTOS}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener producto:', error);
    throw error;
  }
};

// Crear nuevo producto
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(URL_PRODUCTOS, productData);
    return response.data;
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};

// Actualizar producto
export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${URL_PRODUCTOS}/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
};

// Eliminar producto
export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${URL_PRODUCTOS}/${id}`);
    return true;
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
};
```

### **Paso 5: Usar Queries en Componentes**

#### **Ejemplo: Componente Users**

```javascript
import { useEffect, useState } from "react";
import { getAllUsers, createUser, updateUser, deleteUser } from "../helpers/queriesUsuarios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const usersData = await getAllUsers();
      setUsers(usersData);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      const newUser = await createUser(userData);
      setUsers([...users, newUser]);
      alert("Usuario creado correctamente");
    } catch (err) {
      alert("Error al crear usuario");
    }
  };

  // Resto de la lógica...
};
```

## 🏃‍♂️ **Cómo Ejecutar el Proyecto**

### **1. Clonar y configurar**
```bash
git clone <tu-repositorio>
cd <tu-proyecto>
npm install
```

### **2. Iniciar JSON Server**
```bash
# Terminal 1
json-server --watch db.json --port 3001
```

### **3. Iniciar aplicación React**
```bash
# Terminal 2
npm run dev
```

### **4. Acceder a la aplicación**
- **Frontend**: http://localhost:5173
- **API**: http://localhost:3001
- **Usuarios de prueba**:
  - Admin: admin@test.com / 123456
  - User: user@test.com / 123456

## 🎨 **Características Implementadas**

### **✅ Autenticación**
- Login con roles (admin/user)
- Protección de rutas
- Almacenamiento en localStorage

### **✅ CRUD Usuarios**
- Listar usuarios
- Crear nuevo usuario
- Editar usuario existente
- Eliminar usuario

### **✅ CRUD Productos**
- Listar productos
- Crear nuevo producto
- Editar producto existente
- Eliminar producto
- Vista de cards para mostrar productos

### **✅ Arquitectura**
- Queries centralizadas
- Variables de entorno
- Manejo de errores
- Componentes reutilizables

## 🎓 **Conceptos Aprendidos**

### **1. Patrón de Queries Centralizadas**
- **Problema**: Código duplicado en componentes
- **Solución**: Centralizar operaciones API en archivos helpers
- **Beneficio**: Mantenibilidad y reutilización

### **2. Variables de Entorno**
- **Problema**: URLs hardcodeadas
- **Solución**: Usar `import.meta.env.VITE_*`
- **Beneficio**: Configuración flexible por entorno

### **3. Manejo de Estados Async**
- **Problema**: Loading states y error handling
- **Solución**: Async/await con try-catch
- **Beneficio**: Mejor UX y debugging

### **4. Separación de Responsabilidades**
- **Problema**: Componentes con demasiada lógica
- **Solución**: Separar queries, components y utils
- **Beneficio**: Código más limpio y testeable

## 🔧 **Personalizaciones Posibles**

### **Para tu Propio Proyecto**

1. **Cambiar Entidades**:
   - Reemplazar `users` y `products` por tus entidades
   - Crear nuevos archivos de queries siguiendo el patrón

2. **Agregar Validaciones**:
   - Implementar validación de formularios
   - Agregar schemas de validación

3. **Mejorar UI**:
   - Personalizar estilos CSS
   - Agregar más componentes de Material-UI

4. **Funcionalidades Extra**:
   - Paginación
   - Filtros y búsqueda
   - Upload de imágenes
   - Notificaciones toast

## 🐛 **Solución de Problemas Comunes**

### **Error: Cannot connect to API**
```bash
# Verificar que JSON Server esté corriendo
json-server --watch db.json --port 3001
```

### **Error: Environment variables undefined**
```bash
# Verificar que el archivo .env exista y las variables empiecen con VITE_
VITE_API_BASE=http://localhost:3001
```

### **Error: CORS**
```bash
# JSON Server incluye CORS por defecto, verificar puerto
```

## 📚 **Recursos Adicionales**

- [React Docs](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Material-UI](https://mui.com/)
- [Axios Documentation](https://axios-http.com/)
- [JSON Server](https://github.com/typicode/json-server)

## 🤝 **Contribuir**

Este es un proyecto educativo. Si encuentras mejoras o tienes sugerencias:

1. Fork el repositorio
2. Crea una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

## 🎯 **¿Qué Aprendiste?**

Al completar este proyecto, habrás dominado:

- ✅ Arquitectura de aplicaciones React modernas
- ✅ Patrones de queries centralizadas
- ✅ Manejo de variables de entorno
- ✅ Operaciones CRUD completas
- ✅ Autenticación y autorización básica
- ✅ Organización de código escalable

**¡Felicidades por completar este proyecto educativo!** 🎉
