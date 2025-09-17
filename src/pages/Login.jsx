import { use, useEffect,useState } from 'react';
import { getAllUsers,login } from '../helpers/queriesUsuarios';
import './Login.css';
import { useNavigate } from 'react-router-dom';


const Login = () => {
//la logica basica de este login es: obtener los datos del usuario desde un formulario,
//validar que el usuario exista y que la contraseña sea correcta, y si es asi, 
//guardar los datos del usuario en el localStorage y redirigir al usuario a la pagina de inicio.

const [usuario, setUsuario] = useState("");
const [contrasena, setContrasena] = useState("");
const [usuarios, setUsuarios] = useState([]);
const navigate = useNavigate();
//useNavigate es un hook de react-router-dom que nos permite redirigir al usuario a
//otra pagina. En este caso, lo usamos para redirigir al usuario a la pagina de inicio


useEffect(() => {
    loadUsers();
}, []);

const loadUsers = async () => {
    try {
        const usersData = await getAllUsers();
        setUsuarios(usersData);
        console.log(usersData);
    } catch (err) {
        console.error('Error loading users:', err);
    }
};

const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que el usuario exista y que la contraseña sea correcta
    login(usuario, contrasena)
    .then(usuarioEncontrado => {
        if (usuarioEncontrado) {
            // Guardar los datos del usuario en el localStorage
            localStorage.setItem('user', JSON.stringify(usuarioEncontrado));
            // Redirigir al usuario a la pagina de inicio
            if (usuarioEncontrado.role === 'admin') {
                navigate('/admin/products');
            }
            else if (usuarioEncontrado.role === 'user') {
                navigate('/');
            }
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });
}



    const [showPassword, setShowPassword] = useState(false);
    
        return (
            <div id='login-container'>
            <h2 id='login-h2'>Login</h2>
            <form onSubmit={handleSubmit} id='login-form'>
                <input
                    type="text"
                    placeholder='Email'
                    value={usuario}
                    onChange={e => setUsuario(e.target.value)}
                />
                <div id='password-container'>
                    <input
                        id='password-input'
                        type={showPassword ? "text" : "password"}
                        placeholder='Contraseña'
                        value={contrasena}
                        onChange={e => setContrasena(e.target.value)}
                        
                        />
                    <span id='toggle-password'
                        onClick={() => setShowPassword(!showPassword)}
                        title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                        {showPassword ? '🙈' : '👁️'}
                    </span>
                </div>
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;