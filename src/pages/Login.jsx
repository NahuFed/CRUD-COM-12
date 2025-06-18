import './Login.css';

const Login = () => {
    return (
        <div id='login-container'>
            <h2 id='login-h2'>Login</h2>
            <form id='login-form'>
                <input type="text" placeholder='Usuario' />
                <input type="text" placeholder='Contraseña' />
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;