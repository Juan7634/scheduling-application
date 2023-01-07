import React, {useState} from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { handleLogin } from '../utils/resource';

export const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
            e.preventDefault();
        if (username.trim() && password.trim()) {
            handleLogin(username, password,navigate);
            setPassword("");
            setUsername("");
            
        }
    };

    return (
    <div className="container">
        <div className="form-container">
            <div className="titles">
                <div className="text">
                    <h1>Login</h1>
                    <p><span className="dark">No account? </span><Link to="/register"><span className="light">Sign up</span></Link></p>
                </div>
            </div>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" id="username" name="username" className="inputs" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                    <input type="password" placeholder="Password" id="password" name="password" className="inputs" value={password} onChange={(e)=> setPassword(e.target.value)} />
                    <input type="submit" value="Login" id="btn-login" />
                </form>
            </div>
        </div>
    </div>
    );
}
