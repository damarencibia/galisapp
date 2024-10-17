// Importa la librería Axios, que nos permite realizar solicitudes HTTP desde el navegador
import axios from 'axios';

// Crea una nueva instancia de Axios con una configuración predeterminada específica para tu aplicación
const instance = axios.create ({
  baseURL: 'https://laravel-railway-production-20f4.up.railway.app/api', // Define la URL base para todas las solicitudes HTTP que uses con esta instancia
});

// Agrega un interceptor de solicitud a la instancia de Axios
// Los interceptores permiten manipular las solicitudes o respuestas antes de que sean procesadas o enviadas
instance.interceptors.request.use (
  config => {
    // Obtiene el token de autenticación del almacenamiento local del navegador
    const token = localStorage.getItem ('authToken');

    // Si no hay un token, lanza un error. Esto previene el envío de solicitudes sin autenticación
    if (!token) {
      throw new Error ('No hay token de autenticación disponible.');
    }

    // Si hay un token, lo añade a los headers de la solicitud para autenticarla en el servidor
    config.headers.Authorization = `Bearer ${token}`;

    // Retorna la configuración de la solicitud modificada para que Axios pueda enviarla
    return config;
  },
  error => {
    // En caso de error al preparar la solicitud, lo rechaza para manejarlo adecuadamente más adelante
    return Promise.reject (error);
  }
);

// Agrega un interceptor de respuesta a la instancia de Axios
// Este interceptor se ejecuta después de que una respuesta es recibida pero antes de que tu código la procese
instance.interceptors.response.use (
  response => {
    // Si la respuesta es exitosa (cualquier código de estado fuera del rango de errores), simplemente la retorna
    return response;
  },
  async error => {
    // Verifica si el error es debido a un token vencido o inválido (401 Unauthorized)
    if (error.response && error.response.status === 401) {
      // Comprueba si hay una respuesta y su estado es 401
      console.log ('Respuesta 401 detectada'); // Informa en consola para depuración

      // Elimina el token antiguo del almacenamiento local para evitar reintentos con credenciales inválidas
      localStorage.removeItem ('authToken');

      // Redirige al usuario a la página de login para que pueda ingresar nuevas credenciales
      window.location.href = '/login';

      // Rechaza la promesa para propagar el error y manejarlo adecuadamente en otras partes de la aplicación
      return Promise.reject (error);
    }

    // Para cualquier otro tipo de error, también lo rechaza para manejo posterior
    return Promise.reject (error);
  }
);

// Exporta la instancia personalizada de Axios para usarla en toda la aplicación
export default instance;
