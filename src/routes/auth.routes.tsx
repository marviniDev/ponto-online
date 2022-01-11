import React from "react";
import { Route, RouteProps } from "react-router-dom";

// export type AuthRoutesProps = {
//     layout: React.FC | any;
//     path: string;
//     component: React.FC<RouteProps>
// } & RouteProps

export interface AuthRoutesProps extends RouteProps {
    layout?: React.FC | any;
    path: string;
    component: React.FC<RouteProps>
}

const AuthRoutes: React.FC<AuthRoutesProps> = ({ component: Component, layout: Layout, ...rest }) => {

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

export default AuthRoutes
