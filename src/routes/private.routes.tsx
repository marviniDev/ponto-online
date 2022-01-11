import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "../components/Layout";
import Calendar from "../pages/Calendar";
import RegisterTime from "../pages/RegisterTime";
import SignIn from "../pages/SignIn";
import AuthRoutes from "./auth.routes";

const PrivateRoutes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <AuthRoutes
                    exact={true}
                    path="/c"
                    component={SignIn}
                />
                <AuthRoutes
                    layout={Layout}
                    exact={true}
                    path="/a"
                    component={RegisterTime}
                />
                <AuthRoutes
                    layout={Layout}
                    exact={true}
                    path="/b"
                    component={Calendar}
                />
                <Route exact={true} path="*" component={SignIn} />
            </Switch>
        </BrowserRouter>
    );
};

export default PrivateRoutes;