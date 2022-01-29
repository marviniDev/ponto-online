import { BrowserRouter, Route, Switch } from "react-router-dom";
import LayoutUser from "../components/Templates/LayoutUser";
import LayoutAdmin from "../components/Templates/LayoutAdmin";
import Movie from "../pages/Admin/Users";
import DashboardUser from "../pages/Dashboard";
import DashboardAdmin from "../pages/Admin/Dashboard";
import Calendar from "../pages/Calendar";
import RegisterTime from "../pages/RegisterTime";
import SignIn from "../pages/SignIn";
import PrivateRoutes from "./auth.routes";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoutes
                    layout={LayoutUser}
                    path="/dashboard"
                    component={DashboardUser}
                />
                <PrivateRoutes
                    layout={LayoutUser}
                    path="/registerTime"
                    component={RegisterTime}
                />
                <PrivateRoutes
                    layout={LayoutUser}
                    path="/calendar"
                    component={Calendar}
                />
                <Route path="/admin">
                <PrivateRoutes
                    layout={LayoutAdmin}
                    path="/admin/dashboard"
                    role="admin"
                    component={DashboardAdmin}
                />
                <PrivateRoutes
                    layout={LayoutAdmin}
                    path="/admin/scores"
                    role="admin"
                    component={RegisterTime}
                />
                <PrivateRoutes
                    layout={LayoutAdmin}
                    path="/admin/requests"
                    role="admin"
                    component={RegisterTime}
                />
                <PrivateRoutes
                    layout={LayoutAdmin}
                    path="/admin/users"
                    role="admin"
                    component={Movie}
                />
                </Route>

                <Route exact={true} path="/" component={SignIn} />
                <Route exact={true} path="*" component={SignIn} />
            </Switch>
        </BrowserRouter>
    );
};

export default AppRoutes;