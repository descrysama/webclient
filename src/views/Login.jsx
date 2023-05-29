import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import authService from '../services/authService';
import { Toast } from 'primereact/toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useRef(null);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const show = (severity, summary, message) => {
      toast.current.show({ severity: severity, summary: summary, detail: message });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    authService.login({username, password}).then((res) => {
      if(res.boolean) {
        console.log(res)
        show("success", "success", res.message)
        setTimeout(navigate("/competitors"), 2000)
      } else {
        show("error", "Error", res.message)
      }
    })
  };

  return (
    <div className='w-full flex flex-col justify-center items-center mt-[150px]'>
      <Toast ref={toast} />
      <img alt="logo" src="https://mcs-parts.fr/img/logo-1675707804.jpg" height="40" className="mr-2"></img>
      <form onSubmit={handleSubmit} className='flex flex-col items-center '>
        <div className="p-field flex flex-col m-2">
          <label htmlFor="username">Username</label>
          <InputText id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div className="p-field flex flex-col m-2">
          <label htmlFor="password">Password</label>
          <InputText id="password" value={password} onChange={handlePasswordChange} type="password" />
        </div>
        <Button type="submit" className='m-2' label="Se connecter" />
      </form>
    </div>
  );
};

export default Login;
