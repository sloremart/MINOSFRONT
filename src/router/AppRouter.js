
import { Routes, Route } from 'react-router-dom';
import LoginForm from '../commons/Login/Login.jsx';
import RegisterForm from '../commons/Register/Register.jsx';
import VentaProductos from '../commons/Ventas/ventas.jsx';



const AppRouter = () => {
  return (
    <Routes>
       <Route path="/login" element={<LoginForm />} />
       
       <Route path="/register" element={<RegisterForm />} />
       <Route path="/ventas" element={<VentaProductos />} />
      
   </Routes>
  );
};

export default AppRouter;
