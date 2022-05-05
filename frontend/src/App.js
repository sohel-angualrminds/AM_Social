import './App.css'
import EditPage from './EditPage'
import LoginPage from './LoginPage'
import MainPage from './MainPage'
import SignUpPage from './SignUpPage'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
    
function App() 
{
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<LoginPage />} />
          <Route path={`/signuppage`} element={<SignUpPage /> } />
          <Route element={<ProtectedRoutes />} >
            <Route path={`/mainpage`} element={<MainPage /> } />
            <Route path={`/editpage`} element={<EditPage /> } />            
          </Route>          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
