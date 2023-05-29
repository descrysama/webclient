import React, { useContext } from 'react'
import { appContext } from '../App';
import { Link } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const NavbarComponent = () => {
  const navigate = useNavigate();
  const userStatus = useContext(appContext);
  const handleNavigation = (path) => {
    navigate(path);
  };

  const items = [
    {
      label: 'Accueil',
      icon: 'pi pi-home',
      command: () => handleNavigation('/home')
    },
    {
      label: 'Concurrents',
      icon: 'pi pi-chart-line',
      command: () => handleNavigation('/competitors')
    },
    {
      label: 'Fournisseurs',
      icon: 'pi pi-truck',
      command: () => handleNavigation('/suppliers')
    },
    {
      label: 'Logout',
      command: () => logout()
    }
  ];

  const logout = () => {
    authService.logout().then(() => {
      userStatus?.checkAuth();
      navigate('/')
    })
  }

  const start = <img alt="logo" src="https://mcs-parts.fr/img/logo-1675707804.jpg" height="40" className="mr-2"></img>;

  return (
    <Menubar model={items} start={start}/>
  )
}

export default NavbarComponent