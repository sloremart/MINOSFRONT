
import { Routes, Route } from 'react-router-dom';
import LoginForm from '../commons/Login/Login.jsx';
import RegisterForm from '../commons/Register/Register.jsx';
import Product from '../commons/screen/Productos.jsx';

const AppRouter = () => {
  return (
    <Routes>
       <Route path="/login" element={<LoginForm />} />       
       <Route path="/register" element={<RegisterForm />} />
       <Route path="/productos" element={<Product />} />
      
   </Routes>
  );
};

export default AppRouter;
