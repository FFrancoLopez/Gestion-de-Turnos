import { useContext } from 'react';
import logo from '../../assets/pngwing.com.png';
import calendar from '../../assets/calendar.svg';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { UsersContext } from '../../context/UsersContext';
import Swal from 'sweetalert2';

const Navbar = () => {
    const navigate = useNavigate();

    const { logOut } = useContext(UsersContext);

    const handleLogOut = () => {
        logOut()
        Swal.fire({
            icon: 'warning',
            title: 'Sesión Cerrada con éxito',
        })
        navigate('/')
    }

    return(
        <div className={styles.navbarContainer}>
            <Link to="/" className={styles.navbarLogo}>
                <img src={logo} alt="Logo" className={styles.logoImage} />
            </Link>
            <div className={styles.navbarButtons}>
                <Link className={styles.navButton} to="./">Inicio</Link>
                <Link className={styles.navButton} to="./about">Sobre Nosotros</Link>
                <Link className={styles.navButton} to="./appointments/schedule">Agendar un Turno</Link>
                <Link className={styles.navButton} to="./login" onClick={handleLogOut}>Cerrar Sesión</Link>
            </div>

            <div className={styles.navAppoint}>
                <Link 
                    className={styles.navAppoint}
                    to="./myAppointments"
                    
                >
                    <img src={calendar} alt="turnos" className={styles.imgAppoint} />
                    <h4>Mis Turnos</h4>
                </Link>
            </div>
            
        </div>

    )
}

export default Navbar;