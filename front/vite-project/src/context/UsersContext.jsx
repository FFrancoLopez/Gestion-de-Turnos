import axios from 'axios';
import { createContext, useState } from 'react'; 




// eslint-disable-next-line react-refresh/only-export-components
export const UsersContext = createContext({
    user: "",
    userAppointment: [],
    registerUser: async () => {},
    loginUser : async () => {},
    createAppointment: async () => {},
    getUserAppointments: async () => {},
    logOut: () => {},
    cancelUserAppointment: async () => {},

});
 
// eslint-disable-next-line react/prop-types
export const UsersContextProvider = ({ children }) => {
    
    const [user, setUser] = useState( localStorage.getItem('user') ?? false );
    const [userAppointment, setUserAppointment] = useState([]);


    const registerUser = async ( userData ) => {
        return await axios.post('http://localhost:3000/users/register', userData)
    }

    const loginUser = async ( loginUser ) => {
        const res = await axios.post('http://localhost:3000/users/login', loginUser)
        localStorage.setItem('user', res.data.user.id)
        setUser(res.data.user.id)
        return res 
    }

    const createAppointment = async ( values ) => {
        await axios.post('http://localhost:3000/appointments/schedule', values)
        

    }

    const getUserAppointments = async (userId) => {
        const { data } = await axios.get(`http://localhost:3000/users/${userId}`)
    
        setUserAppointment(data.appointments)
    }    

    const logOut = () => {
        localStorage.removeItem('user')
        setUser(false)
        setUserAppointment([])
    }

    const cancelUserAppointment = async (appointmentId) => {
        try {
            // Llamada al backend para cancelar el turno
            await axios.put(`http://localhost:3000/appointments/cancel/${appointmentId}`);
    
            // Actualización local inmediata del estado
            setUserAppointment((prevAppointments) => 
                prevAppointments.filter((appointment) => appointment.id !== appointmentId)
              );
        } catch (error) {
            console.error("Error al cancelar el turno: ", error);
            throw error;
        }
    };  

    const value = {
        user,
        userAppointment,
        registerUser,
        loginUser,
        logOut,
        createAppointment,
        getUserAppointments,
        cancelUserAppointment,
    }
    
    return (
        <UsersContext.Provider value={value}>
            {children}
        </UsersContext.Provider>
    )
}

