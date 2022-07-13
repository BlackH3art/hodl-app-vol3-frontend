import { FC, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../context/UserContext";


const ProtectedRoutes: FC = () => {

  const { user } = useContext(UserContext);

  return(
    <>
      {user ? <Outlet /> : <Navigate to="/login" />}
    </>
  )
}

export default ProtectedRoutes;