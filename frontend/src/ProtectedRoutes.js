import { Navigate, Outlet } from "react-router-dom"

const useAuth = (status) => {
    const user = { loggedIn : status }
    return user && user.loggedIn
}

const ProtectedRoutes = (props) => {
  const isAuth = useAuth(props.isLoggendIn)
  return isAuth ? <Outlet /> : <Navigate to={'/'} />
}

export default ProtectedRoutes