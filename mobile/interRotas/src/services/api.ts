import axios from 'axios';

export const api = axios.create({
  // Se for testar no Navegador (Web), use 'http://localhost:3000'
  baseURL: 'http://192.168.18.14:3000',//, de Janyelice
  //192.168.1.27 - IP Alice
  // Se for testar no Celular Físico (Expo Go), você deve usar o IP da sua máquina (Ex: 'http://192.168.1.15:3000')
  //baseURL: 'http://10.48.9.150:3000', 
  timeout: 10000, // Cancela a requisição se o back demorar mais de 10 segundos
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
