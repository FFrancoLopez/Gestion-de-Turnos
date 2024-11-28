import { useContext, useEffect } from "react";
import Appointment from '../../components/Appointment/Appointment';
import Styles from './MyAppointments.module.css'
import { UsersContext } from "../../context/UsersContext";

function MyAppointments() {

    const { userAppointment, getUserAppointments, user } = useContext(UsersContext);
 
    useEffect(() => {
        const fetchAppointments = async () => {
            if (user){
                await getUserAppointments(user)
            }
        };
        fetchAppointments() // Llamada a la función para obtener los turnos del usuario

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return(
        <div className={Styles.container}>

            <div className={Styles.tilteAppointmentsContainer}>
                <h2>Mis turnos😎</h2>
            </div>

            <div className={Styles.appointmentsGrid}>
                { userAppointment.length > 0 ? userAppointment.map( (appoinment) => {
                       
                       return(
                            <Appointment
                                key={appoinment.id}
                                id={appoinment.id}
                                date={appoinment.date}
                                time={appoinment.time}
                                state={appoinment.state}
                            />
                        ) 
                }) : <h3 className={Styles.textNotAppointments}>No hay turnos disponibles...😭</h3>}
                
            </div>
            
        </div>
    )
    
}
export default MyAppointments;