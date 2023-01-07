import React from 'react';
import image from '../img/logo.png';
import { useNavigate,Link } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('id');
    localStorage.removeItem('username');

    navigate('/');
  }
  
  return (
    <header className="header-principal">
        <div className="logo">
            <img src={image} alt="logo" />
        </div>
        <div className="navbar">
            <Link className="nav-li" to='/dashboard'>Inicio</Link>
            <Link className="nav-li" to='/dashboard'>Nuevo calendario</Link>
            <Link className="nav-li" to={`/book/${localStorage.getItem('username')}`}>Nuevo evento</Link>
            <span className="nav-li" >{localStorage.getItem('username')}</span>
            <span className="nav-li btn" onClick={handleLogout}>Cerrar sesion</span>
            
        </div>
    </header>
  )
}
