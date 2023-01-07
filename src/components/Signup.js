
import React, {useState} from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { handleRegister } from '../utils/resource';



export const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim() && password.trim() && fullname.trim()) {
            // console.log(fullname, username, password);
            handleRegister(fullname,email, username, password,navigate);
            setPassword("");
            setUsername("");
            setFullName("");
                // navigate('/');
        }
    };

    return (
        <div className="container">
        <div className="form-container reverse-colum">
            <div className="titles">
                <div className="text">
                    <h1>Register</h1>
                    <p><span className="dark">Yes account? </span><Link to="/"><span className="light">Sign in</span></Link></p>
                </div>
            </div>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Full Name" id="fullname" className="inputs"  name="fullname" value={fullname} onChange={(e)=>{setFullName(e.target.value)}} />
                    <input type="text" placeholder="email" id="email" className="inputs" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    <input type="text" placeholder="Username" id="username" className="inputs" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                    <input type="password" placeholder="Password" id="password" className="inputs" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                    <input type="submit" value="Register account" id="btn-login" />
                </form>
            </div>
        </div>
    </div>
    );
}
