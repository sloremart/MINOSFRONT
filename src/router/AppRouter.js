
import { Routes, Route } from 'react-router-dom';
import LoginForm from '../commons/Login/Login.jsx';
import RegisterForm from '../commons/Register/Register.jsx';



const AppRouter = () => {
  return (
    <Routes>
       <Route path="/login" element={<LoginForm />} />
       
       <Route path="/register" element={<RegisterForm />} />
      
   </Routes>
  );
};

export default AppRouter;
