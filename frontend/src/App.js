import './App.css'
import EditPage from './EditPage'
import LoginPage from './LoginPage'
import MainPage from './MainPage'
import SignUpPage from './SignUpPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import { useState } from 'react'
  
function App() {
  const [isLoggendIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggendIn') ? localStorage.getItem('isLoggendIn') : null);

  function checkLoggedIn(status) {
    setIsLoggedIn(status);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<LoginPage checkLoggedIn={checkLoggedIn} />} />
          <Route path={`/signuppage`} element={<SignUpPage />} />
          <Route element={<ProtectedRoutes key={"Protected123"} isLoggendIn={isLoggendIn} />} >
            <Route path={`/mainpage`} element={<MainPage />} />
            <Route path={`/editpage`} element={<EditPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
