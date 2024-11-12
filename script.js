const firebaseConfig = {
    apiKey: "AIzaSyC-TPpeaAZJikoZe8tTMGyhJWOzdm5uM20",
    authDomain: "datos-de-formulario-2d95a.firebaseapp.com",
    projectId: "datos-de-formulario-2d95a",
    storageBucket: "datos-de-formulario-2d95a.firebasestorage.app",
    messagingSenderId: "41717138329",
    appId: "1:41717138329:web:981c6242ba4e1bf3eb8908",
    measurementId: "G-7M7SFCKHPE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault();
    // Código de validación del formulario
    
    // Validación del campo de nombre
    let entradaNombre = document.getElementById('name');
    let errorNombre = document.getElementById('nameError');

    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor, introducí tu nombre';
        errorNombre.classList.add('error-message');
    } else {
        errorNombre.textContent = '';
        errorNombre.classList.remove('error-message');
    }

    // Validación del correo electrónico
    let emailEntrada = document.getElementById('email');
    let emailError = document.getElementById('emailError');
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación básico

    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = 'Por favor, introducí un mail válido';
        emailError.classList.add('error-message');
    } else {
        emailError.textContent = '';
        emailError.classList.remove('error-message');
    }

    // Validación de la contraseña
    let contrasenaEntrada = document.getElementById('password');
    let contrasenaError = document.getElementById('passwordError');
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, números, mayúsculas y minúsculas y caracteres especiales';
        contrasenaError.classList.add('error-message');
    } else {
        contrasenaError.textContent = '';
        contrasenaError.classList.remove('error-message');
    }

    // Envío del formulario y almacenamiento en Firebase
    if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {
        // BACKEND QUE RECIBA LA INFORMACIÓN
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con exito', docRef.id);
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error);
        });
    }
});