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

function HeaderPage() 
{

    const navigate = useNavigate()

    //get token for local storage

    const userData = JSON.parse(localStorage.getItem('userData'))

    console.log(userData)

    

    

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

    const [newPasswordData,setNewPasswordData] = React.useState({
        oldPassword : '',
        password : '',
        confirmPassword : ''
    })

    const oldPasswordHandler = (e) => {
        console.log(e.target.value) 
        setNewPasswordData(prev => {
            return {
                ...prev,
                oldPassword : e.target.value
            }
        })
    }

    const passwordHandler = (e) => {
        console.log(e.target.value) 
        setNewPasswordData(prev => {
            return {
                ...prev,
               password : e.target.value
            }
        })
    }

    const confirmPasswordHandler = (e) => {
        console.log(e.target.value) 
        setNewPasswordData(prev => {
            return {
                ...prev,
                confirmPassword : e.target.value
            }
        })
    }

    const changePasswordHandler = () => {
        console.log(userData.userInfo._id)
        
        axios.put(`/user/changepassword/${userData.userInfo._id}`,newPasswordData,{
            headers: {
                Authorization: userData.token
            }
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => console.log(error))
    }



    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar >
                        <Avatar sx={{ marginLeft : '85%' }} onClick={handleClick}>N</Avatar>
                        <label>Name</label>
                    </Toolbar>
                </AppBar>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => {
                        handleClose()
                        navigate('/editpage')
                    }}>
                        Edit Profile
                    </MenuItem>
                    <MenuItem onClick={() => {
                        handleClose()
                        handleOpen2()
                    }}>
                        Change Password
                    </MenuItem>
                    <MenuItem onClick={() => {
                        handleClose()
                        localStorage.clear()
                        navigate('/')
                    }}>Logout</MenuItem>
                </Menu>

                <Modal
                    open={open2}
                    onClose={handleClose2}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                           Change Password
                        </Typography>
                        <TextField 
                            id="outlined-basic" 
                            label="Current Password" 
                            variant="outlined" 
                            value = {newPasswordData.oldPassword}
                            onChange = { (e) => oldPasswordHandler(e)}
                        />
                        <br />
                        <TextField 
                            id="outlined-basic" 
                            label="New Password" 
                            variant="outlined" 
                            value={newPasswordData.password}
                            onChange = { (e) => passwordHandler(e) }
                            />
                        <br />
                        <TextField 
                            id="outlined-basic" 
                            label="Confirm Password" 
                            variant="outlined" 
                            value={newPasswordData.confirmPassword}
                            onChange = { (e) => confirmPasswordHandler(e) }
                        />
                        <br />
                        <Button variant="contained" onClick={ () => changePasswordHandler() } >Set New Password</Button>
                    </Box>
                </Modal>
            </Box>
        </div>
    )
}

export default HeaderPage
