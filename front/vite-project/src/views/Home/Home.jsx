import styles from "../../App.module.css";
import Navbar from "../../components/navBar/Navbar.jsx";


const Home = () => {
    return (
        <>
            <Navbar/>
            <h3 className={styles.subtitle}>este es mi home</h3>
        </>
    )
}

export default Home;
