import styles from "./AboutUs.module.css";
import salonTeamImage from "../../assets/team.jpg";
import teamImage from "../../assets/equipo.jpg";

const AboutUs = () => {
    return (
        <div className={styles.aboutContainer}>
            <h2 className={styles.title}>Conócenos</h2>
            <div className={styles.content}>
                <div className={styles.contentTextSection}>

                    <div className={styles.textSection}>
                        <p>
                            En <strong>Peluquería Unisex</strong>, creemos que cada persona merece
                            un look que resalte su estilo único. Ofrecemos cortes modernos,
                            coloraciones de alta calidad y tratamientos exclusivos, todo en un ambiente
                            cómodo y profesional.
                        </p>
                        <p>
                            Nuestro equipo de estilistas altamente capacitados está aquí para brindarte
                            una experiencia inolvidable. ¡Tu satisfacción es nuestra prioridad!
                        </p>
                    </div>
                </div>
                <div className={styles.imagesSection}>
                    <img
                        src={salonTeamImage}
                        alt="Equipo de estilistas"
                        className={styles.image}
                    />
                    <img
                        src={teamImage}
                        alt="Equipo de estilistas"
                        className={styles.image}
                    />
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
