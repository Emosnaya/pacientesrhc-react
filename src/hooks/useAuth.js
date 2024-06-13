import { useEffect } from "react"
import useSWR from "swr"
import { useNavigate } from "react-router-dom"
import clienteAxios from "../axios-client"
import { useStateContext } from "../contexts/contextProvider"



export const useAuth = () => {

    const { setUser, setToken , token } = useStateContext()
    const navigate = useNavigate();

    const { data:user, error , mutate } = useSWR('/api/user', () => 
        clienteAxios('/api/user', {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(error =>{
            throw Error(error?.response?.data?.errors)
        })
    )
    
    const login =  (payload, setErrores) => {
            clienteAxios.post('/api/login', payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token);
            }).catch(err => {
                const response = err.response;
                console.log(response.data)
                setErrores(response.data.errors)

            })
    }
    const registro =  (datos, setErrores) => {
            clienteAxios.post('/api/registro', datos)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token);
            }).catch(err => {
                const response = err.response;
                setErrores(response.data.errors)

            })

        
    }
    const logout =  () => {
        try {
                clienteAxios.post('/api/logout', null,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then(() => {
                setToken(null)
                mutate(undefined)
            })
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
        
    }

    useEffect(() => {
    }, [user,error])

    return{
        login,
        registro,
        logout,
        token,
        user, 
        error,
    }   
}