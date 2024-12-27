import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/trucker.svg'
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
        const response = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Credenciales inválidas');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        console.log(data.token)
        navigate('/dashboard');
        } catch (err) {
        setError(err.message);
        }
    };

    return (
        <div className='form-container'>
            
            <form onSubmit={handleLogin}>
                <img src={logo} alt='Trucker logo' loading='lazy'/>
                <h2>Log in</h2>
                <label htmlFor="email">Email</label>
                <input
                id='email'
                type="email"
                placeholder="Usuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <label htmlFor="password">Password</label>
                <input
                id='password'
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <button type="submit">Ingresar</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
