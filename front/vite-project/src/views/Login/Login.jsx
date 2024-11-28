import { useFormik } from "formik";
import PropTypes from "prop-types";
import Styles from "./Login.module.css";
import Swal from "sweetalert2";
import { loginFormValidates } from "../../helpers/loginFormValidates";
import { Link } from "react-router-dom";
import { UsersContext } from "../../context/UsersContext";
import { useContext } from "react";

function Login({onLoginSuccess}) {

  const { loginUser } = useContext(UsersContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validate: loginFormValidates,

    initialErrors: {
      username: "El nombre de usuario es requerido",
      password: "La contraseña es requerida",
    },

    onSubmit: async (values) => {
      try {
        const res = await loginUser(values);
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Usuario logueado con éxito",
          });
          
          onLoginSuccess(); // Llamada a la función para actualizar el estado global
          formik.resetForm(); // Limpiamos el formulario
        }
      } catch (err) {
        const { field, message } = err.response.data; // Desestructuramos los campos 'field' y 'message' de la respuesta de error
        
        if (field === "username" || field === "password") {

          // Si el error es de usuario o contraseña incorrectos
          Swal.fire({
            icon: "error",
            title: "Usuario o contraseña incorrectos",
            text: message,  // Mostramos el mensaje específico del error
          });

        } else if (field === "general") {

          // Error general
          Swal.fire({
            icon: "error",
            title: "Error",
            text: message,  // mensaje genérico del error
          });
        } else {
          // Error inesperado
          Swal.fire({
            icon: "error",
            title: "Error inesperado",
            text: "Ocurrió un problema. Inténtelo nuevamente más tarde.",
          });
        }
      }
    },
    
  });

  return (
    <div className={Styles.modalContainer}>
      <form className={Styles.loginContainer} onSubmit={formik.handleSubmit}>
        <h2>Iniciar Sesión</h2>

        <div>
          <label htmlFor="username">NOMBRE DE USUARIO:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="nombre de usuario"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.errors.username && <label className={Styles.errorMessage}>{formik.errors.username}</label>}


          <label htmlFor="password">CONTRASEÑA:</label>
          <input
            type="password"
            id="password"
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
            Iniciar Sesión
          </button>
          <Link to="/register" className={Styles.link}>
            ¿No tienes una cuenta? Regístrate
          </Link>
        </div>
      </form>
    </div>
  );
}

// Definimos las PropTypes para validar las props del componente
Login.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired, // Indicamos que es una función requerida
};

export default Login;
