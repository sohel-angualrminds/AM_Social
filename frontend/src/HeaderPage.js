import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Stack } from '@mui/material'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

   
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
    
function HeaderPage() {

    const navigate = useNavigate()

    //get token for local storage

    const userData = JSON.parse(localStorage.getItem('userData'))

    // console.log(userData)

    // const loginUserData = JSON.parse(localStorage.getItem('loginUserData'))

    // console.log(loginUserData)

    const [loginUserData, setLoginUserData] = React.useState({
        image: '',
        name: ''
    })

    React.useEffect(() => {
        axios.get(`/Profile/user/${userData.userInfo._id}`, {
            headers: {
                authorization: userData.token
            }
        })
            .then(response => {
                console.log(response.data.data)
                setLoginUserData({
                    image: response.data.data.image,
                    name: response.data.data.name
                })
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    //another

    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    //update password handler

    const [newPasswordData, setNewPasswordData] = React.useState({
        oldPassword: '',
        password: '',
        confirmPassword: ''
    })

    const oldPasswordHandler = (e) => {
        console.log(e.target.value)
        setNewPasswordData(prev => {
            return {
                ...prev,
                oldPassword: e.target.value
            }
        })
    }

    const passwordHandler = (e) => {
        
        console.log(e.target.value)
        setNewPasswordData(prev => {
            return {
                ...prev,
                password: e.target.value
            }
        })
    }

    const confirmPasswordHandler = (e) => {
        console.log(e.target.value)
        setNewPasswordData(prev => {
            return {
                ...prev,
                confirmPassword: e.target.value
            }
        })
    }

    const [open4, setOpen4] = React.useState(false);

    const handleClick4 = () => {
      setOpen4(true);
    };

    const handleClose4 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen4(false);
    };



    const [passwordCheck,setPasswordCheck] = React.useState('')
    const [bothPasswordCheck,setBothPassword] = React.useState('')

    const [toggle,setToggle] = React.useState(false)
 
    const changePasswordHandler = () => {
      setToggle(true)
      console.log(userData.userInfo._id);

      var hasNumber = /\d/;
      function containsSpecialChars(str) {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return specialChars.test(str);
      }

      if(newPasswordData.password.length <= 5)
      {
        setPasswordCheck("Minimum length of password is 6");
      }
      else if (!hasNumber.test(newPasswordData.password)) 
      {
          setPasswordCheck("Password contain at least 1 Number");
      } 
      else if (!containsSpecialChars(newPasswordData.password)) {
        setPasswordCheck("Password contain at least 1 Symbol");
      } 
      else 
      {
        setPasswordCheck('')
      }
      
      if(newPasswordData.password !== newPasswordData.confirmPassword)
      {
            setBothPassword('new password and confirm password should be same')
      }
      else
      {
        setBothPassword('')
      }
      if(newPasswordData.password.length >=6 && hasNumber.test(newPasswordData.password) && containsSpecialChars(newPasswordData.password) && newPasswordData.password === newPasswordData.confirmPassword)
      {
          setPasswordCheck('')
          setBothPassword('')
        axios
          .put(
            `/user/changepassword/${userData.userInfo._id}`,
            newPasswordData,
            {
              headers: {
                Authorization: userData.token,
              },
            }
          )
          .then((response) => {
            console.log(response);
            // alert("password change successfully");
            // navigate("/mainpage");
            handleClick4()
          })
          .catch((error) => console.log(error));
      }
      

      
    }

    return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{backgroundColor:'#CBD5F0'}}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <h3 style={{color:'#194F92'}}>AM Social Feed</h3>
              </Typography>

              <Avatar
                sx={{ marginLeft: "65%",backgroundColor:'#194F92' }}
                onClick={handleClick}
                src={loginUserData.image && loginUserData.image}
              >
                {!loginUserData.image &&
                  userData.userInfo.firstName &&
                  userData.userInfo.firstName.split("")[0]}
              </Avatar>
              <Stack direction={"row"} gap={1}>
                <label style={{color:'#194F92'}}>
                  {userData.userInfo.firstName && userData.userInfo.firstName}
                </label>
                <label style={{color:'#194F92'}}>
                  {userData.userInfo.lastName && userData.userInfo.lastName}
                </label>
              </Stack>
            </Toolbar>
          </AppBar>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                navigate("/editpage");
              }}
            >
              Edit Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleOpen2();
              }}
            >
              Change Password
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                localStorage.clear();
                navigate("/");
              }}
            >
              Logout
            </MenuItem>
          </Menu>

          <Modal
            open={open2}
            onClose={handleClose2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <h4 style={{color:'#194F92'}}>Change Password</h4>
              </Typography>

              <TextField
                id="outlined-basic"
                label="Current Password"
                variant="outlined"
                type="password"
                error={toggle && newPasswordData.oldPassword==='' ? true : false}
                sx={{ marginTop: "5px" }}
                value={newPasswordData.oldPassword}
                onChange={(e) => oldPasswordHandler(e)}
              />

              <br />

              <TextField
                id="outlined-basic"
                label="New Password"
                variant="outlined"
                type="password"
                error={toggle && newPasswordData.password=="" ? true : false}
                sx={{ marginTop: "10px" }}
                value={newPasswordData.password}
                onChange={(e) => passwordHandler(e)}
              />

              <br />

              <span style={{ color: "red" }}>
                {passwordCheck && passwordCheck}
              </span>

              <br />

              <TextField
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                type="password"
                error={toggle && newPasswordData.confirmPassword==='' ? true : false}
                sx={{ marginTop: "10px" }}
                value={newPasswordData.confirmPassword}
                onChange={(e) => confirmPasswordHandler(e)}
              />

              <br />

              <span style={{ color: "red" }}>
                {bothPasswordCheck && bothPasswordCheck}
              </span>

              <br />

              <Button
                variant="contained"
                sx={{ marginTop: "10px" }}
                onClick={() => changePasswordHandler()}
              >
                Set New Password
              </Button>
            </Box>
          </Modal>
          
          <Snackbar open={open4} autoHideDuration={6000} onClose={handleClose4} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={handleClose4} severity="success" sx={{ width: '100%' }}>
              password change successfully!
            </Alert>
          </Snackbar>
        </Box>
      </div>
    );
}

export default HeaderPage
