import { useEffect, useState } from 'react';
import { login } from '../helpers/queriesUsuarios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
// Nueva lógica de login:
// 1. Obtener credenciales del formulario
// 2. Enviar al backend para autenticación
// 3. El backend establece una cookie JWT httpOnly
// 4. Guardar datos básicos del usuario en localStorage para UI
// 5. Redirigir según el rol del usuario

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const navigate = useNavigate();

// Limpiar error cuando el usuario empiece a escribir
useEffect(() => {
    if (error) {
        setError("");
    }
}, [email, password]);

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
        // Validaciones básicas
        if (!email || !password) {
            setError("Por favor, complete todos los campos");
            setLoading(false);
            return;
        }

        // Llamar a la función de login que maneja cookies JWT
        const result = await login(email, password);
        console.log('Resultado del login:', result);
        if (result.success) {
            // Guardar datos básicos del usuario para la UI
            localStorage.setItem('user', JSON.stringify(result.user));
            
            // Redirigir según el rol del usuario
            if (result.user.role === 'admin'|| result.user.role === 'superadmin') {
                navigate('/admin/products');
            } else {
                navigate('/');
            }
        } else {
            setError(result.message || 'Error en el login');
        }
    } catch (err) {
        console.error('Error durante el login:', err);
        setError('Error de conexión. Por favor, intente nuevamente.');
    } finally {
        setLoading(false);
    }
};



    const [showPassword, setShowPassword] = useState(false);

    return (
        <div id='login-container'>
            <h2 id='login-h2'>Login</h2>
            {error && (
                <div style={{ 
                    color: 'red', 
                    marginBottom: '10px', 
                    padding: '8px', 
                    border: '1px solid red', 
                    borderRadius: '4px',
                    backgroundColor: '#ffe6e6'
                }}>
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} id='login-form'>
                <input
                    type="email"
                    placeholder='Email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={loading}
                    required
                />
                <div id='password-container'>
                    <input
                        id='password-input'
                        type={showPassword ? "text" : "password"}
                        placeholder='Contraseña'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        disabled={loading}
                        required
                    />
                    <span id='toggle-password'
                        onClick={() => setShowPassword(!showPassword)}
                        title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
                    >
                        {showPassword ? '🙈' : '👁️'}
                    </span>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Ingresando...' : 'Ingresar'}
                </button>
            </form>
        </div>
    );
};

export default Login;