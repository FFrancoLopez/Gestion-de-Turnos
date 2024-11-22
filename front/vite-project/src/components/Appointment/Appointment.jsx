/* eslint-disable react/prop-types */
import Styles from './Appointment.module.css';


function Appointment({id, description, date, hour, state}) {
    return (
        <div className={Styles.appointmentsContainer}>
            <div className={Styles.appointmentCard} key={id}>
            
                <div className={Styles.appointmentHeader}>
                    <h3>Turno #{id}</h3> 
                    {/* <span className={Styles.statusActive}>Active</span> */}
                    <span className={state === 'Activo' ? Styles.statusActive : Styles.statusInactive}>{state}</span>
                </div>
                <div className={Styles.appointmentDetails}>
                    <p><strong>Descripción: </strong>{description}</p>
                    <p><strong>Fecha:</strong>{date}</p>
                    <p><strong>Hora:</strong>{hour}</p>
                </div>
                <button className={Styles.cancelButton} disabled>Cancelar</button>

            </div>

        </div>

    )
}

export default Appointment;