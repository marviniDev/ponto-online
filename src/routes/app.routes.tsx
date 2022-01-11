import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "../components/Layout";
import Calendar from "../pages/Calendar";
import RegisterTime from "../pages/RegisterTime";
import SignIn from "../pages/SignIn";
import PrivateRoutes from "./auth.routes";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoutes
                    exact={true}
                    path="/login"
                    component={SignIn}
                />
                <PrivateRoutes
                    layout={Layout}
                    exact={true}
                    path="/registerTime"
                    component={RegisterTime}
                />
                <PrivateRoutes
                    layout={Layout}
                    exact={true}
                    path="/calendar"
                    component={Calendar}
                />
                <Route exact={true} path="*" component={SignIn} />
            </Switch>
        </BrowserRouter>
    );
};

export default AppRoutes;