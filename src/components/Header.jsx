import { RiSearch2Line } from "react-icons/ri";

export default function Header(props) {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4" >
        <h1 className="text-2xl md:text-3xl font-bold">
            {props.titulo}
        </h1>
      
        
    </header>
  )
}
