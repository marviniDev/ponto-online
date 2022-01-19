import React from "react";
import 'typeface-roboto';
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./routes/app.routes";
import GlobalStyles from "./styles/global";

const App: React.FC = () => (
  <AuthProvider>
    <AppRoutes />
    <GlobalStyles />
  </AuthProvider>
)

export default App;