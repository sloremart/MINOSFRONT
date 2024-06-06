
import { Routes, Route } from 'react-router-dom';
import LoginForm from '../commons/Login/Login.jsx';
import RegisterForm from '../commons/Register/Register.jsx';
import VentaProductos from '../commons/components/Ventas/ventas.jsx';



const AppRouter = () => {
  const token = localStorage.getItem('token');
  return (
    <Routes>
       <Route path="/login" element={<LoginForm />} />
       
       <Route path="/register" element={<RegisterForm />} />
       <Route path="/ventas" element={<VentaProductos token={token}/>} />
      
   </Routes>
  );
};

export default AppRouter;
