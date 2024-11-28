import { useContext } from 'react';
import Styles from './Appointment.module.css';
import { UsersContext } from '../../context/UsersContext';
import Swal from 'sweetalert2';
 

// eslint-disable-next-line react/prop-types
function Appointment({id, date, time, state}) {

    const { cancelUserAppointment } = useContext(UsersContext);

    const handleCancel = async () => {
        try{
            await cancelUserAppointment(id)
            Swal.fire({
                icon: 'warning',
                color: 'red',
                title: 'Turno cancelado con éxito',
            })

        // eslint-disable-next-line no-unused-vars
        }catch (error){
            Swal.fire({
                icon: 'error',
                title: "Error al cancelar el turno, intentalo nuevamente",
                
            })
        }
    }

    return (

        <div className={Styles.appointmentsContainer}>
            <div className={Styles.appointmentCard} key={id}>
            
                <div className={Styles.appointmentHeader}>
                    <h3>Turno #{id}</h3> 
                    <span className={state === 'Activo' ? Styles.statusActive : Styles.statusInactive}>{state}</span>
                </div>
                
                <div className={Styles.appointmentDetails}>
                    <p><strong>Fecha: </strong> {date}</p>
                    <p><strong>Hora: </strong> {time}</p>
                    
                </div>

                <button 
                    className={`${Styles.cancelButton} ${state === 'Cancelado' ? Styles.disabled : ''}`} 
                    onClick={handleCancel} 
                    disabled={state === 'Cancelado'}
                >
                    Cancelar
                </button>


            </div>

        </div>

    )
}

export default Appointment;