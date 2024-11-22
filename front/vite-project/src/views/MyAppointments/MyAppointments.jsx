import { useEffect, useState } from "react";
import Appointment from '../../components/Appointment/Appointment';
import axios from 'axios';
import Styles from './MyAppointments.module.css'

function MyAppointments() {

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/appointments')

        .then((response) => {
            setAppointments(response.data);
        })

        .catch((error) => {
            console.log({message: "Error al obtener los turnos", error: error});
        });

    }, []);

    useEffect(() => {
        console.log({message: "useEffect", appointments: appointments});
    }, [appointments]);

    return(
        <div className={Styles.container}>

            <div className={Styles.tilteAppointmentsContainer}>
                <h2>Mis turnos😎</h2>
            </div>

            <div className={Styles.appointmentsGrid}>
                { appointments.length > 0 ? appointments.map( (appoinment) => {
                        return(
                            <Appointment
                                key={appoinment.id}
                                id={appoinment.id}
                                description={appoinment.description}
                                date={appoinment.date}
                                hour={appoinment.hour}
                                state={appoinment.state}
                            />
                        ) 
                }) : <h3 className={Styles.textNotAppointments}>No hay turnos disponibles.😭</h3>}
                
            </div>
            
        </div>
    )
    
}
export default MyAppointments;