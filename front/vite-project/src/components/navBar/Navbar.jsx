import logo from '../../assets/pngwing.com.png';
import profileIcon from '../../assets/user-image-with-black-background-svgrepo-com.svg';
import styles from './Navbar.module.css';

const Navbar = () => {
    return(
        <div className={styles.navbarContainer}>
            <a href="/" className={styles.navbarLogo}>
                <img src={logo} alt="Logo" className={styles.logoImage} />
            </a>
            <div className={styles.navbarButtons}>
                <button className={styles.navButton} href="./">Inicio</button>
                <button className={styles.navButton} href="./">Agendar un Turno</button>
                <button className={styles.navButton} href="./">Sobre Nosotros</button>
            </div>
            <a href="./perfil" className={styles.navPerfil}>
                <img src={profileIcon} alt="Perfil" className={styles.profileImage} />
            </a>
            
        </div>

    )
}

export default Navbar;