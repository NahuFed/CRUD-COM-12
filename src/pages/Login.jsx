import { use, useEffect,useState } from 'react';
import axios from 'axios';
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
    axios.get('http://localhost:3001/users')
        .then((res) => {
            setUsuarios(res.data);
            console.log(res.data);
        })
        .catch((err) => console.error(err));
}, []);

const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que el usuario exista y que la contraseña sea correcta
    const usuarioEncontrado = usuarios.find(user => user.email === usuario && user.password === contrasena);

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
                <div style={{ position: 'relative' }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder='Contraseña'
                        value={contrasena}
                        onChange={e => setContrasena(e.target.value)}
                        style={{ width: "320px"}}
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            right: '8px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            userSelect: 'none'
                        }}
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