import { useAppContext } from "../context/appContext"
import { Navigate } from "react-router-dom"
const ProtectedRoute = ({children}) => {
    const {user} = useAppContext()
    if(!user){
     return <Navigate to={'/landing'}/>
    }
  return children
}

export default ProtectedRoute

//This component is fully used for if there is no user then we cannot access the dashboard