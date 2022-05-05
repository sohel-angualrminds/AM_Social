import { Navigate, Outlet } from "react-router-dom"
import LoginPage from "./LoginPage"

const useAuth = () => {
    const user = { loggedIn : false }
    return user && user.loggedIn
}

const ProtectedRoutes = () => {
  const isAuth = useAuth()
  return isAuth ? <Outlet /> : <Navigate to={'/'} />
}

export default ProtectedRoutes