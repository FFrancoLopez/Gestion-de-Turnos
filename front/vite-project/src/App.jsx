import './App.module.css'
import Home from './views/Home/Home'
import styles from './App.module.css'
import MyAppointments from './views/MyAppointments/MyAppointments'


function App() {
  return(
    <>
      <header>
        <Home/>
        <h1 className={styles.title}>Peluquería Unisex</h1>
      </header>
      <MyAppointments/>

    </>
  )  
}

export default App
