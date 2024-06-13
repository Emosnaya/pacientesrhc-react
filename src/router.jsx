import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import Users from "./views/Users";
import Expedientes from "./views/Expedientes";
import Paciente from "./views/Paciente";
import Expediente from "./views/Expediente";
import ExpEstartificacion from "./views/ExpEstartificacion";
import Perfil from "./views/Perfil";
import Imprimiresfuerzo from "./views/Imprimiresfuerzo";
import EstratiImp from "./views/EstratiImp";

const router = createBrowserRouter([

    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" />

            },
            {
                path: '/dashboard',
                element: <Dashboard/>

            },
            {
                path: '/expedientes',
                element: <Expedientes/>

            },
            {
                path: '/paciente/:id',
                element: <Paciente/>

            },
            {
                path: '/prueba/:id',
                element: <Expediente/>

            },
            {
                path: '/prueba/imprimir/:id',
                element: <Imprimiresfuerzo/>

            },
            {
                path: '/estrati/:id',
                element: <ExpEstartificacion/>

            },
            {
                path: '/estrati/imprimir/:id',
                element: <EstratiImp/>

            },
            {
                path: '/perfil/:id',
                element: <Perfil/>
            }

        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path:  '/login',
                element: <Login/>
            },
            {
                path: '/crear-cuenta',
                element: <Signup/>
            },
        ]
    },
    {
        path :'*',
        element: <NotFound/>
    }

])

export default router;