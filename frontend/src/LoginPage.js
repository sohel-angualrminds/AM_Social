import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { GoogleLogin } from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from "react-google-recaptcha"
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
 
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function LoginPage(props) {
    const navigate = useNavigate()
    const { checkLoggedIn } = props;
    const recaptchaRef = React.useRef();

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

    const [loginData, setLoginData] = React.useState({
        email: '',
        password: ''
    })
 
    const emailHandler = (e) => {
        // console.log(e.target.value)
        setLoginData(prev => {
            return {
                ...prev,
                email: e.target.value
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

    const [clickLogin, setClickLogin] = React.useState(false)


    const responseGoogle = (res) => {
        axios.post('/user/google-login', { email: res.profileObj.email }).then(response => {
            console.log(response);
            if (response.status == 200) {
                localStorage.setItem('userData', JSON.stringify(response.data))
                localStorage.setItem('isLoggendIn', true);
                checkLoggedIn(true);
                const temp = () => navigate('/mainpage', { state: { token: response.data.token } })
                temp();
            }
        }).catch(err => {
            //here please show error in 
            navigate('/signuppage');
        })
    }

    const loginHandler = async () => {
        setClickLogin(true)

        // console.log(loginData)

        axios.post('/user/login', loginData)
            .then(response => {
                localStorage.setItem('userData', JSON.stringify(response.data))
                localStorage.setItem('isLoggendIn', true);
                checkLoggedIn(true);

                const temp = () => navigate('/mainpage', { state: { token: response.data.token } })
                temp()
            })
            .catch(error => {
                console.log(error)
                checkLoggedIn(false);
                handleClick()
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
                    // '&:hover': {
                    // backgroundColor: '',
                    // opacity: [0.9, 0.8, 0.7],
                    // },
                    marginLeft: '30%',
                    marginTop: "5%",
                    borderRadius: '10px'
                }}
            >
                <TextField
                    id="filled-basic1"
                    label="Email*"
                    variant="filled"
                    sx={{ marginTop: '10px' }}
                    value={loginData.email}
                    onChange={(e) => emailHandler(e)}
                    error={clickLogin && loginData.email === "" ? true : false}
                    helperText={clickLogin && loginData.email === "" ? "Enter Email " : ''}
                />
                <br />
                <TextField
                    id="filled-basic2"
                    label="Password*"
                    variant="filled"
                    type="password"
                    sx={{ marginTop: '10px' }}
                    value={loginData.password}
                    onChange={(e) => passwordHandler(e)}
                    error={clickLogin && loginData.password === "" ? true : false}
                    helperText={clickLogin && loginData.password === "" ? "Enter Password " : ''}
                />
                <br />
                <ReCAPTCHA
                    ref={recaptchaRef}
                    size="invisible"
                    sitekey="6Ld3COIZAAAAAC3A_RbO1waRz6QhrhdObYOk7b_5"
                />
                <br />
                <Button variant="contained" sx={{ marginTop: '10px', marginBottom: '10px' }} onClick={() => loginHandler()}>Login</Button>
                <br />
                <GoogleLogin
                    clientId="186822021258-a22h3l16t1vfn0vm2gb4srruekjvrtoi.apps.googleusercontent.com"
                    buttonText="Log in with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <br />
                <Button variant="contained" sx={{ marginTop: '10px', marginBottom: '10px' }} onClick={() => navigate('/signuppage')}>SignUp</Button>

            </Box>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Enter Valid Data!
                </Alert>
            </Snackbar>

        </div>
    )
}

export default LoginPage
