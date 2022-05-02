import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { GoogleLogin } from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from "react-google-recaptcha"
import axios from 'axios'

function LoginPage() 
{
    const navigate = useNavigate()

    const recaptchaRef = React.useRef();

    const [loginData,setLoginData] = React.useState({
        email : '',
        password : ''
    })
    
    const emailHandler = (e) => {
        // console.log(e.target.value)
        setLoginData(prev => {
            return {
                ...prev,
                email : e.target.value
            }
        })
    }

    const passwordHandler = (e) => {
        // console.log(e.target.value)
        setLoginData(prev => {
            return {
                ...prev,
                password: e.target.value
            }
        })
    }

    const [clickLogin,setClickLogin] = React.useState(false)

  
    const responseGoogle = (response) => {
        console.log(response);
    }

    const loginHandler = async() => {
        setClickLogin(true)

        // const token = await recaptchaRef.current.executeAsync()
        

        console.log(loginData)

        axios.post('/user/login',loginData)
        .then(response => {
            console.log(response)
            console.log(response.data.token);
            localStorage.setItem('userData',JSON.stringify(response.data))
            const temp = () => navigate('/mainpage',{state : {token : response.data.token}})
            temp()
        })
        .catch(error => {
            console.log(error)
            console.log('Enter proper data')
        })
        
    }

    return (
        <div>
            <h1>Login </h1>
            <Box
                sx={{
                    width: 500,
                    height: 500,
                    backgroundColor: 'lavender',
                    '&:hover': {
                    backgroundColor: '',
                    opacity: [0.9, 0.8, 0.7],
                    },
                    marginLeft : '30%',
                    marginTop: "5%"
                }}
            >
                <TextField 
                    id="filled-basic" 
                    label="Email*" 
                    variant="filled"
                    value={loginData.email} 
                    onChange={(e) => emailHandler(e)}
                    error={ clickLogin && loginData.email === "" ? true : false }
                    helperText={ clickLogin && loginData.email === "" ? "Enter Email " : '' }
                />
                <br />
                <TextField 
                    id="filled-basic" 
                    label="Password*" 
                    variant="filled" 
                    value={loginData.password}
                    onChange={(e) => passwordHandler(e)}
                    error={ clickLogin && loginData.password ===  "" ? true : false }
                    helperText={ clickLogin && loginData.password ===  "" ? "Enter Password " : '' }
                />
                <br />
                <ReCAPTCHA 
                    ref={recaptchaRef} 
                    size="invisible" 
                    sitekey="6Ld3COIZAAAAAC3A_RbO1waRz6QhrhdObYOk7b_5" 
                />
                <br />
                <Button variant="contained" onClick={ () => loginHandler()}>Login</Button>
                <br />
                <GoogleLogin
                    clientId="971623344603-0qquan9pcdb9iu7oq9genvpnel77i7oa.apps.googleusercontent.com"
                    buttonText="Log in with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <br />
                <Button variant="contained" onClick={ () => navigate('/signuppage')}>SignUp</Button>
                
            </Box>
            
        </div>
    )
}

export default LoginPage
