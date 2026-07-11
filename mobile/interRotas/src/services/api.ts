import axios from 'axios';

export const api = axios.create({
  // 🚀 Agora apontando para o servidor oficial na nuvem do Render!
  baseURL: 'https://interrotas-85vv.onrender.com',
  
  timeout: 60000, // Cancela a requisição se o back demorar mais de 10 segundos
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;