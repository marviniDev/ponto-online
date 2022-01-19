import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface HierarchyProps {
    children: JSX.Element
}


const Hierarchy: React.FC<HierarchyProps> = ({ children }): JSX.Element => {
    const { user } = useAuth()
    const history = useHistory()

    if (user?.hierarchy == 0) {
        history.goBack()
    }

    return children
}

export default Hierarchy