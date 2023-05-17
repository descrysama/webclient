import React from 'react'
import { Link } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

const NavbarComponent = () => {
  const navigate = useNavigate();

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
    }
  ];

  const start = <img alt="logo" src="https://mcs-parts.fr/img/logo-1675707804.jpg" height="40" className="mr-2"></img>;

  return (
    <div className="card">
      <Menubar model={items} start={start}/>
    </div>
  )
}

export default NavbarComponent