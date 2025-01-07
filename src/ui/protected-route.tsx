import { ReactNode } from "react";
import { useAppSelector } from "../utils/hooks/use-selector";
import { Navigate } from "react-router-dom";
import { getUser } from "../features/user/user-slice";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { name } = useAppSelector(getUser);

    return name ? children : <Navigate to='/' replace />;
};

export default ProtectedRoute;
