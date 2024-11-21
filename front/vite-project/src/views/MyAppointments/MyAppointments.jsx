import { useState } from "react";
import myAppointments from "../../helpers/myAppointments";
import Appointment from '../../components/Appointment/Appointment';
import Styles from './MyAppointments.module.css'

function MyAppointments() {

    // eslint-disable-next-line no-unused-vars
    const [appointments, setAppointments] = useState(myAppointments);

    return(
        <div className={Styles.container}>

            <div className={Styles.tilteAppointmentsContainer}>
                <h1>Mis turnos</h1>
            </div>

            <div className={Styles.appointmentsGrid}>
                { appointments.length > 0 ? appointments.map( (appoinment) => {
                        return(
                            <Appointment
                                key={appoinment.id}
                                id={appoinment.id}
                                date={appoinment.date}
                                hour={appoinment.hour}
                                status={appoinment.state}
                            />
                        ) 
                }) : <h1>No hay turnos disponibles</h1>}
                
            </div>
            
        </div>
    )
    
}
export default MyAppointments;