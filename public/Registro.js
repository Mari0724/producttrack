// Selección de elementos
const btnSignIn = document.getElementById("sign-in"),
    btnSignUp = document.getElementById("sign-up"),
    formRegister = document.querySelector(".register"),
    formLogin = document.querySelector(".login"),
    userTypeSelect = document.getElementById("userType"),
    personaFields = document.getElementById("personaFields"),
    empresaFields = document.getElementById("empresaFields"),
    equipoFields = document.getElementById("equipoFields"),
      form = document.querySelector(".form"); // Seleccionar el formulario

// Función para manejar el cambio de tipo de usuario
userTypeSelect.addEventListener("change", function() {
    // Ocultar todos los campos adicionales primero
    personaFields.style.display = "none";
    empresaFields.style.display = "none";
    equipoFields.style.display = "none";

    // Mostrar los campos relevantes según el tipo de usuario seleccionado
    switch (this.value) {
        case "persona":
            personaFields.style.display = "block";
            break;
        case "empresa":
            empresaFields.style.display = "block";
            break;
        case "equipoTrabajo":
            equipoFields.style.display = "block";
            break;
        default:
            // Si no se selecciona un tipo válido, no mostrar nada
            break;
    }
});

// Alternar entre formularios de registro e inicio de sesión
btnSignIn.addEventListener("click", e => {
    formRegister.classList.add("hide");
    formLogin.classList.remove("hide");
});

btnSignUp.addEventListener("click", e => {
    formLogin.classList.add("hide");
    formRegister.classList.remove("hide");
});

// Función para validar la seguridad de la contraseña
function isPasswordSecure(password) {
    // Expresión regular para verificar si la contraseña tiene al menos 8 caracteres, un número y un carácter especial
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
}

// Validación del formulario antes de enviar
form.addEventListener("submit", function(event) {
    // Prevenir el envío del formulario
    event.preventDefault();

    // Obtener valores del formulario
    const userType = userTypeSelect.value;
    const nombreUsuario = document.getElementById("nombreUsuario").value;
    const nombreEmpresa = document.getElementById("nombreEmpresa").value;
    const nombreEmpresaEquipo = document.getElementById("nombreEmpresaEquipo").value;
    const nombreUsuarioEquipo = document.getElementById("nombreUsuarioEquipo").value;
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;

    // Validación según el tipo de usuario
    let isValid = true;
    switch (userType) {
        case "persona":
            if (!nombreUsuario || !correo || !contrasena) {
                isValid = false;
            }
            break;
        case "empresa":
            if (!nombreEmpresa || !correo || !contrasena) {
                isValid = false;
            }
            break;
        case "equipoTrabajo":
            if (!nombreEmpresaEquipo || !nombreUsuarioEquipo || !correo || !contrasena) {
                isValid = false;
            }
            break;
        default:
            isValid = false; // Si no hay tipo de usuario seleccionado
            break;
    }

    // Validar que la contraseña sea segura
    if (isValid && !isPasswordSecure(contrasena)) {
        isValid = false;
        alert("La contraseña debe tener al menos 8 caracteres, un número y un carácter especial.");
    }

    // Mostrar mensaje de error o permitir envío
    if (!isValid) {
        alert("Por favor, completa todos los campos requeridos.");
    } else {
        // Si todos los campos están completos y la contraseña es segura, puedes permitir el envío
        form.submit();
    }
});


