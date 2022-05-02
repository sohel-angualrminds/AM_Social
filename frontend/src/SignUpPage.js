import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import validator from 'validator'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SignUpPage() 
{
    const navigate = useNavigate()

    const [userData,setUserData] = React.useState({
        firstName : '',
        lastName : '',
        email : '',
        password : ''
    })

    const firstNameHandler = (e) => {
        // console.log(e.target.value)
        setUserData(prev => {
            return {
                ...prev,
                firstName : e.target.value
            }
        })
    }

    const lastNameHandler = (e) => {
        // console.log(e.target.value)
        setUserData(prev => {
            return {
                ...prev,
                lastName : e.target.value
            }
        })
    }

    const emailHandler = (e) => {
        // console.log(e.target.value)
        setUserData(prev => {
            return {
                ...prev,
                email : e.target.value
            }
        })
    }

    const passwordHandler = (e) => {
        // console.log(e.target.value)
        setUserData(prev => {
            return {
                ...prev,
                password : e.target.value
            }
        })
    }


    const [clickSignUp,setClickSignUp] = React.useState(false)

    const [checkEmail,setCheckEmail] = React.useState('')
    const [checkPassword,setCheckPassword] = React.useState('')
    const [checkConfirmPassword,setCheckConfirmPassword] = React.useState('')

    const signUpButtonHandler = () => {
        setClickSignUp(true)
        
        if (validator.isEmail(userData.email)) 
        {
            setCheckEmail('')
        } 
        else 
        {
            setCheckEmail('Enter valid Email!')
        }

        var hasNumber = /\d/
        function containsSpecialChars(str) {
            const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            return specialChars.test(str);
        }

        if( userData.password.length <=5 )
        {
            setCheckPassword('Minimum length of password is 6')
        }
        else if(!hasNumber.test(userData.password))
        {
            setCheckPassword('Password contain at least 1 Number')
        }
        else if(!containsSpecialChars(userData.password) )
        {
            setCheckPassword('Password contain at least 1 Symbol')
        }
        else
        {
            setCheckPassword('')
        }

        

        console.log(userData)

        // if(userData.firstName ==='' || userData.lastName==='' || userData.email==='' || userData.password ==='' || userData.cpassword !== '')
        // {
        //     console.log('Enter proper data');
        // }
        // else
        // {
            axios.post('/user/signup',userData)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
                console.log('Enter proper data');
            })
        // }
    }

    return (
        <div>
            <h1>Sign Up</h1>
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
                    label="First Name*" 
                    variant="filled" 
                    value={userData.firstName} 
                    onChange={(e) => firstNameHandler(e)}
                    error={ clickSignUp && userData.firstName === '' ? true : false } 
                    helperText={ clickSignUp && userData.firstName === '' ? "Enter First Name " : ''}
                />
                <br />
                <TextField 
                    id="filled-basic" 
                    label="Last Name *" 
                    variant="filled" 
                    value={userData.lastName} 
                    onChange={(e) => lastNameHandler(e)} 
                    error={ clickSignUp && userData.lastName === '' ? true : false }
                    helperText={ clickSignUp && userData.lastName === '' ? "Enter Last Name " : ''}
                />
                <br />
                <TextField 
                    id="filled-basic" 
                    label="Email *" 
                    variant="filled" 
                    value={userData.email} 
                    onChange={(e) => emailHandler(e)} 
                    error={ clickSignUp && userData.email === '' ? true : false }
                    helperText={ clickSignUp && userData.email === '' ? "Enter Email " : ''}
                />
                <br />
                <span style={{color:"red"}} >{ checkEmail !== "" && 'Enter valid Email!' }</span>
                <br />
                <TextField 
                    id="filled-basic" 
                    label="Password *" 
                    variant="filled" 
                    value={userData.password} 
                    onChange={(e) => passwordHandler(e)} 
                    error={ clickSignUp && userData.password === '' ? true : false }
                    helperText={ clickSignUp && userData.password === '' ? "Enter Password " : ''}
                />
                <br />
                <span style={{color:"red"}}>{ checkPassword !== "" && checkPassword }</span>
                <br />
                <Button variant="contained" onClick={ () => signUpButtonHandler() }>Sign Up</Button>
                <br />
                <Button variant="contained" onClick={ () => navigate('/')}>Login</Button>
            </Box>
        </div>
  )
}

export default SignUpPage
