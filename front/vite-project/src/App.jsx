import image from './assets/barbershop-tijera.svg'
import './App.module.css'
import Home from './views/Home/Home'
import styles from './App.module.css'
import MyAppointments from './views/MyAppointments/MyAppointments'


function App() {
  return(
    <>
      <header>
        <Home/>
        <h1 className={styles.title}>
          <img src={image} alt="tijera" className={styles.logoImage} />
          Peluquería Unisex
          <img src={image} alt="tijera" className={styles.logoImage} />
        </h1>
      </header>
      <MyAppointments/>

    </>
  )  
}

export default App
