import styles from "./Home.module.css";
import haircutImage from "../../assets/corte-hombre.jpg"; 
import haircutWomenImage from "../../assets/corte-mujer.jpg";
import unisexImage from "../../assets/salon.jpg";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <h1 className={styles.title}>¡Bienvenidos a Peluquería Unisex!</h1>
                <p className={styles.description}>
                    Brindamos los mejores cortes y estilos para todas las edades y géneros. 
                    ¡Déjanos resaltar tu estilo!
                </p>
            </div>
            <div className={styles.services}>
                <div className={styles.card}>
                    <img src={haircutImage} alt="Corte de hombre" className={styles.image} />
                    <img src={haircutWomenImage} alt="Corte de mujer" className={styles.image} />
                    <h2 className={styles.cardTitle}>Cortes modernos</h2>
                    <p className={styles.cardText}>
                        Descubre nuestro catálogo de estilos y tendencias de moda.
                        ¡Tu nuevo look te está esperando!
                    </p>
                </div>
                <div className={styles.card}>
                    <img src={unisexImage} alt="Peluquería unisex" className={styles.image} />
                    <h2 className={styles.cardTitle}>Servicio unisex</h2>
                    <p className={styles.cardText}>
                        Atención personalizada para hombres, mujeres y niños. 
                        ¡Todos son bienvenidos!
                    </p><br />
                    <h2>Horario de atención:</h2><br />
                    <ul>
                    <h3>🔹Lunes: 9:00a.m - 9:00p.m.</h3>
                    <h3>🔹Martes: 9:00a.m - 9:00p.m</h3>
                    <h3>🔹Miércoles: 9:00a.m - 9:00p.m</h3>
                    <h3>🔹Jueves: 9:00a.m - 9:00p.m</h3>
                    <h3>🔹Viernes: 9:00a.m - 9:00p.m</h3>
                    </ul><br />
                    <h2>¿Quieres agregar un turno?</h2>
                    <p>
                        <Link to={"/register"}>Regístrate </Link>
                         y agenda los turnos que necesites.😎
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
