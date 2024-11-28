import './App.module.css';
import Home from './views/Home/Home';
import MyAppointments from './views/MyAppointments/MyAppointments';
import Register from './views/Register/Register';
import Login from './views/Login/Login';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/navBar/Navbar';
import Footer from './components/Footer/Footer';
import AboutUs from './views/AboutUs/AboutUs';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { UsersContext } from './context/UsersContext';
import ScheduleAppointment from './views/ScheduleAppointment/ScheduleAppointment';

function App() {
  const { user } = useContext(UsersContext); // Usuario autenticado
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Si el usuario no está autenticado, mostrar el modal de login tras 5 segundos
    if (!user) {
      const timer = setTimeout(() => {
        setShowLoginModal(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleLoginSuccess = () => {
    setShowLoginModal(false); // Cerrar modal de login
    navigate('/'); // Redirigir al home
  };

  const handleShowRegister = () => {
    setShowLoginModal(false); // Cerrar modal de login
    setShowRegisterModal(true); // Mostrar modal de registro
  };

  const handleRegisterSuccess = () => {
    setShowRegisterModal(false); // Cerrar modal de registro
    Swal.fire({
      icon: 'success',
      title: 'Usuario registrado con éxito. Ahora puedes iniciar sesión.',
    });
    navigate('/login'); // Redirigir al login
    setShowLoginModal(true); // Mostrar modal de login
  };

  return (
    <>
       {/* Modales */}
      {!user && showLoginModal && (
        <div className="modalContent">
          <Login onLoginSuccess={handleLoginSuccess} onShowRegister={handleShowRegister} />
        </div>
      )}

      {!user && showRegisterModal && (
        <div className="modalContent">
          <Register onRegisterSuccess={handleRegisterSuccess} />
        </div>
      )}

      
      {user && <Navbar />}
      <div className={!user ? 'blurBackground' : ''}>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register onRegisterSuccess={handleRegisterSuccess} />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />

          {/* Rutas protegidas */}
          {user ? (
            <>
              <Route path="/appointments/schedule" element={<ScheduleAppointment />} />
              <Route path="/myAppointments" element={<MyAppointments />} />
            </>
          ) : (
            // Redirigir a login si no hay usuario autenticado
            <Route path="/appointments/*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </div>
      {user && <Footer />}
    </>
  );
}

export default App;
