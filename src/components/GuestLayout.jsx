import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";
import { useAuth } from "../hooks/useAuth";


export default function GuestLayout() {

    const {token} = useAuth()

    if(token){
        return <Navigate to="/dashboard"/>
    }


  return (
    <main className="max-w-4xl m-auto flex flex-col md:flex-row items-center md:justify-center md:gap-5 md:h-[900px] md:mt-20">
        <img 
            src="../img/logo-2.png" 
            alt="imagen logotipo"
            className="w-[400px] md:w-[400px] md:h-auto md:"
        />
    

        <div className="p-10 max-w-full mt-20">
            <Outlet />
        </div>
    </main>
  )
}
