import { appContext } from "../App";
import { useContext } from "react";
import { Navigate } from 'react-router-dom';


export const ProtectedRoute = ({children}) => {
  const userStatus = useContext(appContext);

  if(userStatus?.connected) {
    return children;
  } else {  
    return <Navigate to="/" />
  }

}