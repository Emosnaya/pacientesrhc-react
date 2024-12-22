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
import ExpClinico from "./views/ExpClinico";
import ImpClinico from "./views/ImpClinico";
import EditPaciente from "./views/EditPaciente";
import Compare from "./views/Compare";
import EditNutri from "./views/Edit/EditNutri";
import ImpNutri from "./views/Imprimir/ImpNutri";
import EditPsico from "./views/Edit/EditPsico";
import ImpPsico from "./views/Imprimir/ImpPsico";

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
                path: '/paciente/:id',
                element: <Paciente/>

            },
            {
                path: '/paciente/edit/:id',
                element: <EditPaciente/>

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
                path: '/clinico/:id',
                element: <ExpClinico/>

            },
            {
                path: '/clinico/imprimir/:id',
                element: <ImpClinico/>

            },
            {
                path: '/perfil/:id',
                element: <Perfil/>
            }
            ,
            {
                path: '/compare/:id',
                element: <Compare/>
            },
            {
                path: '/nutri/:id',
                element: <EditNutri/>

            },
            {
                path: '/nutri/imprimir/:id',
                element: <ImpNutri/>

            },
            {
                path: '/psico/:id',
                element: <EditPsico/>

            },
            {
                path: '/psico/imprimir/:id',
                element: <ImpPsico/>

            },

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