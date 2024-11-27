import './App.module.css'
import Home from './views/Home/Home'
import MyAppointments from './views/MyAppointments/MyAppointments'
import Register from './views/Register/Register'
import Login from './views/Login/Login'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/navBar/Navbar'
import Footer from './components/Footer/Footer'
import AboutUs from './views/AboutUs/AboutUs'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'


function App() {

  const [isLogged, setIsLogged] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false); 

  // const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Si el usuario no esta logiado, inicara un teporizador de 5seg que mostrara el login
    if (!isLogged){
      const timer = setTimeout(() => {
        setShowLoginModal(true)
      }, 5000)

      return () => clearTimeout(timer);
    }
  }, [isLogged]);

  const handleLoginSuccess = () => {
    setIsLogged(true);
    setShowLoginModal(false);
    navigate('/'); // Redirige al usuario a la página de inicio
  };

  const handleShowRegister = () => {
    setShowLoginModal(false); // Cerramos el modal de login
    setShowRegisterModal(true); // Mostramos el modal de registro
  };

  const handleRegisterSuccess = () => {
    setShowRegisterModal(false); // Cerramos el modal de registro
    Swal.fire({
      icon: 'success',
      title: 'Usuario registrado con éxito. Ahora puedes iniciar sesión.',
    });
    navigate('/'); // Redirige al login
    setShowLoginModal(true); // Mostramos el modal de login
  }
  
  return (
    <>
      {!isLogged && showLoginModal &&  (
        <div className='modalContent'>
          <Login onLoginSuccess={handleLoginSuccess} onShowRegister={handleShowRegister}/>
        </div>
      )}

      {!isLogged && showRegisterModal &&  (
        <div className='modalContent'>
          
          <Register onRegisterSuccess={handleRegisterSuccess}/>
        </div>
      )}

      {isLogged ? (
        <>
          <Navbar/>
            <div className={!isLogged ? "blurBackground" : ""}>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/about' element={<AboutUs/>}/>
                <Route path='/myAppointments' element={<MyAppointments/>}/>
              {/* <Route path='/userProfile' element={<UserProfile/>}/> */}
            </Routes>
            </div>
          <Footer/>
        </>
      ) :(
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login onLoginSuccess={handleLoginSuccess}/>}/>
          <Route path='/register' element={<Register onRegisterSuccess={handleRegisterSuccess}/>}/>
        </Routes>
      )}

    </>
  );
}

export default App
