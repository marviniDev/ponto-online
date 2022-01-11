import React, { useContext } from "react";
import AuthContext from "../contexts/auth";
import AppRoutes from "./app.routes";
import PrivateRoutes from "./private.routes";

const Routes: React.FC = () => {
    const { signed } = useContext(AuthContext)

    return signed ? <AppRoutes /> : <PrivateRoutes />
}

export default Routes