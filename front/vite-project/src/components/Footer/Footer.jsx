import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <div className={styles.container}>
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerSection}>
                        <h3 className={styles.footerTitle}>Enlaces Rápidos</h3>
                        <ul className={styles.footerUlist}>
                            <Link className={styles.link} to="/">Inicio </Link>
                            <Link className={styles.link} to="/about">Sobre Nosotros </Link>
                            <Link className={styles.link} to="/appointments/schedule">Agendar un Turno</Link>
                        </ul>
                    </div>
                    <div className={styles.footerSection}>
                        <h3 className={styles.footerTitle}>Contáctanos</h3>
                        <p>📍 Calle Principal 123, Córdoba, Argentina</p>
                        <p>📞 +54 9 123 456 789</p>
                        <p>✉️ info@peluqueriaunisex.com</p>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    <p>&copy; 2024 Peluquería Unisex. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
