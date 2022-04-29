import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { GoogleLogin } from 'react-google-login'
import { useNavigate } from 'react-router-dom'

function LoginPage() 
{
    const navigate = useNavigate()

    const [loginData,setLoginData] = React.useState({
        email : '',
        password : ''
    })

    const emailHandler = (e) => {
        console.log(e.target.value)
        setLoginData(prev => {
            return {
                ...prev,
                email : e.target.value
            }
        })
    }

    const passwordHandler = (e) => {
        console.log(e.target.value)
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
                <Button variant="contained" onClick={ () => {
                    setClickLogin(true)
                    navigate('/mainpage')
                }}>
                    Login
                </Button>
                <br />
                <GoogleLogin
                    clientId="971623344603-0qquan9pcdb9iu7oq9genvpnel77i7oa.apps.googleusercontent.com"
                    buttonText="Log in with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </Box>
            
        </div>
    )
}

export default LoginPage
