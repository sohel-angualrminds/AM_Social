import './App.css'
import EditPage from './EditPage'
import LoginPage from './LoginPage'
import MainPage from './MainPage'
import SignUpPage from './SignUpPage'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import HeaderPage from './HeaderPage'

function App() 
{
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<LoginPage />} />
          <Route path={`/mainpage`} element={<MainPage /> } />
          <Route path={`/editpage`} element={<EditPage /> } />
          <Route path={`/signuppage`} element={<SignUpPage /> } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
