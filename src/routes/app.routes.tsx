import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "../components/Templates";
import Movie from "../pages/Admin/Users";
import Calendar from "../pages/Calendar";
import RegisterTime from "../pages/RegisterTime";
import SignIn from "../pages/SignIn";
import PrivateRoutes from "./auth.routes";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoutes
                    layout={Layout}
                    path="/registerTime"
                    component={RegisterTime}
                />
                <PrivateRoutes
                    layout={Layout}
                    path="/calendar"
                    component={Calendar}
                />
                <PrivateRoutes
                    layout={Layout}
                    path="/admin"
                    role="admin"
                    component={Movie}
                />
                <PrivateRoutes
                    layout={Layout}
                    path="admin/dashboarad"
                    role="admin"
                    component={RegisterTime}
                />
                <PrivateRoutes
                    layout={Layout}
                    path="admin/users"
                    role="admin"
                    component={Calendar}
                />
                <Route exact={true} path="/" component={SignIn} />
                <Route exact={true} path="*" component={SignIn} />
            </Switch>
        </BrowserRouter>
    );
};

export default AppRoutes;