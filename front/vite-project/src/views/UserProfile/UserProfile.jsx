// import styles from "./UserProfile.module.css";

// const UserProfile = ({ user, appointments }) => {
//     return (
//         <div className={styles.profileContainer}>
//             {/* Información del Usuario */}
//             <div className={styles.userInfo}>
//                 <img
//                     src={user.avatar || "https://via.placeholder.com/150"}
//                     alt="Avatar del usuario"
//                     className={styles.avatar}
//                 />
//                 <h2 className={styles.userName}>{user.name}</h2>
//                 <p className={styles.userEmail}>{user.email}</p>
//             </div>

//             {/* Lista de Turnos */}
//             <div className={styles.appointmentsContainer}>
//                 <h3 className={styles.sectionTitle}>Mis Turnos</h3>
//                 {appointments && appointments.length > 0 ? (
//                     <ul className={styles.appointmentsList}>
//                         {appointments.map((appointment) => (
//                             <li key={appointment.id} className={styles.appointmentCard}>
//                                 <div>
//                                     <p className={styles.appointmentDate}>
//                                         📅 Fecha: {appointment.date}
//                                     </p>
//                                     <p className={styles.appointmentTime}>
//                                         ⏰ Hora: {appointment.time}
//                                     </p>
//                                     <p className={styles.appointmentService}>
//                                         ✂️ Servicio: {appointment.service}
//                                     </p>
//                                 </div>
//                                 <button className={styles.cancelButton}>
//                                     Cancelar
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p className={styles.noAppointments}>
//                         Aún no tienes turnos agendados. ¡Reserva tu próximo turno hoy!
//                     </p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UserProfile;
