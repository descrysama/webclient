import { appContext } from "../App";
import { useContext } from "react";
import { Navigate } from 'react-router-dom';


export const ProtectLogin = ({children}) => {
  const userStatus = useContext(appContext);

  if(userStatus?.connected) {
    return <Navigate to="/competitors" />
  } else {  
    return children
  }

}