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
  const perfil = `/book/${localStorage.getItem('username')}`;

  return (
    <header className="header-principal">
        <div className="logo">
            <img src={image} alt="logo" />
        </div>
        <div className="navbar">
            <Link className="nav-li" to='/dashboard'>Inicio</Link>
            <Link className="nav-li" to={perfil}>Nuevo evento</Link>
            <span className="nav-li" href='/dashboard'>{localStorage.getItem('username')}</span>
            <span className="nav-li btn" onClick={handleLogout}>Cerrar sesion</span>
            
        </div>
    </header>
  )
}
