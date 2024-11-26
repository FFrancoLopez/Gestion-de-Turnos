export const registerFormValidates = (input) => {
    const errors = {};
  
    // Validar nombre
    if (!input.name.trim()) {
      errors.name = "El nombre es obligatorio";
    } else if (!/^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]{2,}$/g.test(input.name.trim())) {
      errors.name = "El nombre debe contener al menos 2 letras y solo letras y espacios";
    }
  
    // Validar email
    if (!input.email) {
      errors.email = "El email es obligatorio";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g.test(input.email)) {
      errors.email = "Por favor, ingresa un email válido";
    }
  
    // Validar fecha de nacimiento
    if (!input.birthdate) {
      errors.birthdate = "La fecha de nacimiento es obligatoria";
    } else {
      const birthDate = new Date(input.birthdate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const isBirthdayPassed =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
      const finalAge = isBirthdayPassed ? age : age - 1;
  
      if (finalAge < 16) {
        errors.birthdate = "Debes tener al menos 16 años para registrarte";
      }
    }
  
    // Validar DNI
    if (!input.nDni) {
      errors.nDni = "El DNI es obligatorio";
    } else if (!/^\d{8}$/g.test(input.nDni)) {
      errors.nDni = "El DNI debe tener exactamente 8 números";
    }
  
    // Validar nombre de usuario
    if (!input.username.trim()) {
      errors.username = "El nombre de usuario es obligatorio";
    } else if (!/^[a-zA-Z0-9]{2,}$/g.test(input.username)) {
      errors.username = "El nombre de usuario debe tener al menos 2 caracteres y no contener espacios";
    }
  
    // Validar contraseña
    if (!input.password) {
      errors.password = "La contraseña es obligatoria";
    } else if (input.password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres";
    } else if (!/\d/.test(input.password)) {
      errors.password = "La contraseña debe contener al menos un número";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/g.test(input.password)) {
      errors.password = "La contraseña debe contener al menos un carácter especial";
    } else if (/\s/.test(input.password)) {
      errors.password = "La contraseña no debe contener espacios";
    }
  
    return errors;
  };
  