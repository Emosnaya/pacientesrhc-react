import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAuth } from "../hooks/useAuth";


export default function DefaultLayout() {

    const {token} = useAuth()

    if (!token) {
        return <Navigate to="/login"/>
      }

    
  return (
    <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
        <Sidebar/>
        
        <main className='lg:col-span-3 xl:col-span-5 p-8 bg-gray-100 col-span-2 h-screen overflow-y-scroll no-scrollbar'>
            <Outlet/>
        </main>
    </div>
  )
}
