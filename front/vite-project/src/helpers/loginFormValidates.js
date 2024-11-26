export const loginFormValidates = (input) => {
    const errors = {};
  
    // Validación del nombre de usuario
    if (!input.username) {
      errors.username = "El nombre de usuario es requerido";
    } else if (input.username.length < 2) {
      errors.username = "El nombre de usuario debe tener al menos 2 caracteres";
    }
  
    // Validación de la contraseña
    if (!input.password) {
      errors.password = "La contraseña es requerida";
    } else if (input.password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres";
    } else if (!/[0-9]/.test(input.password)) {
      errors.password = "La contraseña debe tener al menos 1 número";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(input.password)) {
      errors.password = "La contraseña debe tener al menos 1 carácter especial";
    }
  
    return errors;
  };
  