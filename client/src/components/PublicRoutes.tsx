import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicRoutes = ({ component: Component }: any) => {
  const user = useAuth();

  return user ? <Navigate to={"/"} /> : <Outlet />;
};

export default PublicRoutes;
