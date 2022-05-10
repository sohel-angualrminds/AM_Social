import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import validator from 'validator'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
 
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
    
function SignUpPage() 
{
    const navigate = useNavigate()

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

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

        
        axios.post('/user/signup',userData)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
            console.log('Enter proper data');
            handleClick()
        })
    }

    return (
        <div>

            

            <Box
                sx={{
                    width: 600,
                    height: 600,
                    backgroundColor: '#daf0ff',
                    marginLeft : '20%',
                    marginTop: "5%",
                    borderRadius : '10px'
                }}
            >

                <h1 style={{color:'#21A5B7'}}>Sign Up</h1>

                <br />

                <TextField 
                    id="filled-basic" 
                    label="First Name*" 
                    variant="filled" 
                    sx={{marginTop:'15px'}}
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
                    sx={{marginTop:'15px'}}
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
                    sx={{marginTop:'15px'}}
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
                    type='password'
                    variant="filled" 
                    sx={{marginTop:'15px'}}
                    value={userData.password} 
                    onChange={(e) => passwordHandler(e)} 
                    error={ clickSignUp && userData.password === '' ? true : false }
                    helperText={ clickSignUp && userData.password === '' ? "Enter Password " : ''}
                />

                <br />

                <span style={{color:"red"}}>{ checkPassword !== "" && checkPassword }</span>

                <br />

                <Button variant="contained" sx={{marginTop:'15px',backgroundColor:'#45b6fe'}} onClick={ () => signUpButtonHandler() }>Sign Up</Button>

                <br />

                <Button variant="contained" sx={{marginTop:'15px',backgroundColor:'#45b6fe'}} onClick={ () => navigate('/')}>Login</Button>

            </Box>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:'center' }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Enter Proper data!
                </Alert>
            </Snackbar>

        </div>
  )
}

export default SignUpPage
