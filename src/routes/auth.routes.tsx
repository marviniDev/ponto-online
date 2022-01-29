import React, { useEffect } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { layoutProps } from "../components/Templates/LayoutUser";
import { useAuth } from "../contexts/AuthContext";
import Hierarchy from "../contexts/hierarchy";

// export type AuthRoutesProps = {
//     layout: React.FC | any;
//     path: string;
//     component: React.FC<RouteProps>
// } & RouteProps

export interface AuthRoutesProps extends RouteProps {
    component: React.FC<RouteProps>
    path: string
    role?: string
    layout?: React.FC<layoutProps>
}

const AuthRoutes: React.FC<AuthRoutesProps> = ({ component: Component, layout: Layout, role, ...rest }) => {
    const { signed, user } = useAuth()

    useEffect(() => {
        console.log(window.location.pathname);
    }, [user])

    if (!signed) {
        return <Redirect to="/login" />
    }

    if (!role && signed) {
        if (user?.hierarchy !== 1) {
            return (
                <Route
                    {...rest}
                    render={() =>

                        Layout ? (
                            <Layout>
                                <Component />
                            </Layout>

                        ) : (
                            <Component />
                        )
                    }
                />
            )
        }
        return <Redirect to={"/login"} />
    }

    return (
        user && user.hierarchy === 1 && role ? (
            <Route
                {...rest}
                render={() =>

                    Layout ? (
                        <Hierarchy>
                            <Layout>
                                <Component />
                            </Layout>
                        </Hierarchy>

                    ) : (
                        <Hierarchy >
                            <Component />
                        </Hierarchy >
                    )
                }
            />)
            :
            <Redirect to={"/calendar"} />
    )
}

export default AuthRoutes
