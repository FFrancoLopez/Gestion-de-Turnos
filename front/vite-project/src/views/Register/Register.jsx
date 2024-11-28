import { useFormik } from "formik";
import PropTypes from "prop-types";
import Styles from "./Register.module.css";
import { registerFormValidates } from "../../helpers/registerFormValidates";
import Swal from "sweetalert2";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UsersContext } from "../../context/UsersContext";

const Register = ({onRegisterSuccess}) => {

  const { registerUser } = useContext(UsersContext);


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      birthdate: "",
      nDni: "",
      username: "",
      password: "",
    },
    validate: registerFormValidates,
    initialErrors: {
      name: "El nombre es requerido",
      email: "El email es requerido",
      birthdate: "La fecha de nacimiento es requerida",
      nDni: "El número de documento es requerido",
      username: "El nombre de usuario es requerido",
      password: "La contraseña es requerida",
    },
    onSubmit: async (values) => {
      try {
        const res = await registerUser(values);
        if (res.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Usuario registrado con éxito",
          });

          onRegisterSuccess(); // Llamada a la función para notificar al usuario de que se registró correctamente
          formik.resetForm();
          
        }

      } catch (err) {
        // Verificar si err.response y err.response.data existen
        const details = err.response?.data?.details;
    
        if (details && Array.isArray(details)) {
          
          // Mostramos cada error específico
          details.forEach((error) => {
            Swal.fire({
              icon: "error",
              title: `Error en el campo: ${error.field}`,
              text: error.message,
            });
          });
        } else {
          // Fallback: mensaje genérico si no hay detalles específicos
          Swal.fire({
            icon: "error",
            title: "Error al registrar el usuario",
            text: err.response?.data?.message || "Ocurrió un error inesperado. Inténtalo nuevamente.",
          });
        }
      }
    }
    
  });

  return (
    <div className={Styles.modalContainer}>

      <form className={Styles.registerContainer} onSubmit={formik.handleSubmit}>
        <h2>Registro de usuario</h2>
        <div>
          <label>NOMBRE:</label>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && <label className={Styles.errorMessage}>{formik.errors.name}</label>}

          <label>EMAIL:</label>
          <input
            type="email"
            name="email"
            placeholder="example@example.com"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && <label className={Styles.errorMessage}>{formik.errors.email}</label>}

          <label>FECHA NACIMIENTO:</label>
          <input
            type="date"
            name="birthdate"
            onChange={formik.handleChange}
            value={formik.values.birthdate}
          />
          {formik.errors.birthdate && <label className={Styles.errorMessage}>{formik.errors.birthdate}</label>}

          <label>DNI:</label>
          <input
            type="text"
            name="nDni"
            placeholder="12345678"
            onChange={formik.handleChange}
            value={formik.values.nDni}
          />
          {formik.errors.nDni && <label className={Styles.errorMessage}>{formik.errors.nDni}</label>}

          <label>NOMBRE DE USUARIO:</label>
          <input
            type="text"
            name="username"
            placeholder="nombre de usuario"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.errors.username && <label className={Styles.errorMessage}>{formik.errors.username}</label>}

          <label>CONTRASEÑA:</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && <label className={Styles.errorMessage}>{formik.errors.password}</label>}

          <button
            type="submit"
            disabled={Object.keys(formik.errors).length > 0 || !formik.dirty}
            className={`${Styles.submitButton} ${
              Object.keys(formik.errors).length > 0 || !formik.dirty ? "disabled" : ""
            }`}
          >
            Registrar
          </button><br />
          <Link to="/login" >
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
        </div>
      </form>
    </div>
  );
};

Register.propTypes = {
  onRegisterSuccess: PropTypes.func, // Función opcional para manejar el éxito del registro
};

export default Register;
