export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  // Función para guardar el token en localStorage
  export const saveToken = (token) => {
    localStorage.setItem('token', token);
  };
  export const removeToken = () => {
    localStorage.removeItem('token');
  };