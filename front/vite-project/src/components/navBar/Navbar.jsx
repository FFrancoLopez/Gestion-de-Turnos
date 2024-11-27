import logo from '../../assets/pngwing.com.png';
import profileIcon from '../../assets/user-image-with-black-background-svgrepo-com.svg';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <div className={styles.navbarContainer}>
            <Link to="/" className={styles.navbarLogo}>
                <img src={logo} alt="Logo" className={styles.logoImage} />
            </Link>
            <div className={styles.navbarButtons}>
                <Link className={styles.navButton} to="./">Inicio</Link>
                <Link className={styles.navButton} to="./appointments/schedule">Agendar un Turno</Link>
                <Link className={styles.navButton} to="./about">Sobre Nosotros</Link>
            </div>

            <div className={styles.navPerfil}>
                <Link className={styles.navPerfil} to="./perfil">
                    <img src={profileIcon} alt="Perfil" className={styles.profileImage} />
                    <h4>Mi Perfil</h4>
                </Link>
            </div>
            
        </div>

    )
}

export default Navbar;