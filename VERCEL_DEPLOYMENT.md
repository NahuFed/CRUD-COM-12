# 🚀 Guía de Despliegue en Vercel

## Pasos para desplegar tu proyecto en Vercel:

### 1. Preparación del Backend
Antes de desplegar el frontend, asegúrate de que tu backend esté desplegado y accesible en línea. Puedes usar:
- **Render** (recomendado para Node.js/Express)
- **Railway**
- **Heroku**
- Cualquier otro servicio de hosting para backends

### 2. Configuración del Proyecto

#### Archivos creados:
- ✅ `vercel.json` - Configuración de Vercel para SPA con Vite
- ✅ `.env.example` - Plantilla de variables de entorno
- ✅ `.gitignore` - Actualizado para excluir archivos sensibles

### 3. Despliegue en Vercel

#### Opción A: Desde GitHub (Recomendado)

1. **Sube tu código a GitHub:**
   ```bash
   git add .
   git commit -m "Configuración para Vercel"
   git push origin main
   ```

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta de GitHub
   - Click en "Add New Project"
   - Importa tu repositorio `CRUD-COM-12`

3. **Configura las variables de entorno:**
   - En la sección "Environment Variables" agrega:
     - Name: `VITE_API_BASE_URL`
     - Value: `https://tu-backend-url.com/api` (reemplaza con la URL real de tu backend)
   - Aplica a: Production, Preview, Development

4. **Deploy:**
   - Click en "Deploy"
   - Espera a que termine el build (1-2 minutos)

#### Opción B: Desde la CLI de Vercel

1. **Instala Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Despliega:**
   ```bash
   vercel
   ```

4. **Configura la variable de entorno:**
   ```bash
   vercel env add VITE_API_BASE_URL
   ```
   Ingresa la URL de tu backend cuando te lo pida.

5. **Deploy a producción:**
   ```bash
   vercel --prod
   ```

### 4. Variables de Entorno Importantes

Asegúrate de configurar en Vercel:

```
VITE_API_BASE_URL=https://tu-backend-desplegado.com/api
```

### 5. Verificación Post-Despliegue

Después del despliegue, verifica:
- ✅ La página carga correctamente
- ✅ Las rutas funcionan (navegación entre páginas)
- ✅ La conexión con el backend funciona
- ✅ El login/registro funciona
- ✅ Las operaciones CRUD funcionan

### 6. Actualizar el Despliegue

Cada vez que hagas `git push` a tu rama principal, Vercel automáticamente:
- Detectará los cambios
- Hará el build
- Desplegará la nueva versión

### 7. Problemas Comunes

#### Error 404 al refrescar
✅ Ya solucionado con `vercel.json` (configuración de rewrites)

#### CORS Errors
Asegúrate de que tu backend tenga configurado CORS para aceptar requests desde tu dominio de Vercel:
```javascript
app.use(cors({
  origin: ['https://tu-app.vercel.app'],
  credentials: true
}));
```

#### Variables de entorno no funcionan
- Verifica que empiecen con `VITE_`
- Reinicia el deployment después de agregar variables
- Usa `import.meta.env.VITE_API_BASE_URL` en el código

### 8. Dominios Personalizados

Vercel te da un dominio gratuito: `tu-proyecto.vercel.app`

Para usar un dominio personalizado:
1. Ve a Settings > Domains en tu proyecto de Vercel
2. Agrega tu dominio
3. Sigue las instrucciones de configuración DNS

## 📝 Notas Importantes

- El archivo `db.json` y `json-server` son solo para desarrollo local
- En producción necesitas un backend real desplegado
- Vercel solo despliega el frontend (archivos estáticos)
- Tu backend debe estar desplegado en otro servicio

## 🔗 Enlaces Útiles

- [Documentación de Vercel](https://vercel.com/docs)
- [Vite en Vercel](https://vercel.com/docs/frameworks/vite)
- [Variables de entorno en Vite](https://vitejs.dev/guide/env-and-mode.html)
