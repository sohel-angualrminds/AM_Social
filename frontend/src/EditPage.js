import React from 'react'
import HeaderPage from './HeaderPage'
import TextField from '@mui/material/TextField'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import userImg from './user.jpg'
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
 
function EditPage() 
{

    //token from local storage

    const userData = JSON.parse(localStorage.getItem('userData'))

    //datePicker

    const [value, setValue] = React.useState(null);

    //new userData

    const [newUserData,setNewUserData] = React.useState({
        image : '',
        name : '',
        bio : '',
        gender : '',
        dob : '',
        email : '',
        mobileNumber : ''
    })

    const imageHandler = (e) => {
        console.log(e.target.files[0])
        setNewUserData(prev => {
            return {
                ...prev,
                image : e.target.files[0]
            }
        })
    }

    const nameHandler = (e) => {
        console.log(e.target.value)
        setNewUserData(prev => {
            return {
                ...prev,
                name : e.target.value
            }
        })
    }

    const bioHandler = (e) => {
        console.log(e.target.value)
        setNewUserData(prev => {
            return {
                ...prev,
                bio : e.target.value
            }
        })
    }

    const genderHandler = (e) => {
        console.log(e.target.value)
        setNewUserData(prev => {
            return {
                ...prev,
                gender : e.target.value
            }
        })
    }


    const emailHandler = (e) => {
        console.log(e.target.value)
        setNewUserData(prev => {
            return {
                ...prev,
                email : e.target.value
            }
        })
    }

    const mobileHanlder = (e) => {
        console.log(e.target.value)
        setNewUserData(prev => {
            return {
                ...prev,
                mobileNumber : e.target.value
            }
        })
    }

    console.log(newUserData);

    const updateHandler = () => {

        const formData = new FormData()
        formData.append("image",newUserData.image )
        formData.append("name",newUserData.name)
        formData.append("bio",newUserData.bio)
        formData.append("gender",newUserData.gender )
        formData.append("dob",newUserData.dob)
        formData.append("email",newUserData.email)
        formData.append("mobileNumber",newUserData.mobileNumber)

        axios.put(`/user/edit/${userData.userInfo._id}`,formData,{
            headers: {
                Authorization: userData.token
            }
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => console.log(error))
    }


    return (
        <div>
            <HeaderPage />

            <h1>Edit Profile</h1>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>

                    <Grid item xs={4} sx={{border : '1px solid black'}}>
                        <div style={{height:'200px',width:'200px',marginLeft:'50px',backgroundColor:'skyblue'}}>
                            <img src={userImg} style={{height:'200px',width:'200px'}} alt='user' />
                        </div>
                        <br />
                        Add<input type='file' onChange={(e) => imageHandler(e)} />
                        {/* <Button variant="outlined">Edit</Button>
                        <Button variant="outlined">Remove</Button> */}
                    </Grid>

                    <Grid item xs={8} sx={{border : '1px solid black'}}>
                        <div>
                            <TextField 
                                id="outlined-basic" 
                                label="Name *" 
                                variant="outlined" 
                                value = {newUserData.name}
                                onChange = { (e) => nameHandler(e) }
                            />

                            <br />

                            <TextareaAutosize
                                aria-label="minimum height"
                                minRows={3}
                                placeholder="Bio *"
                                style={{ width: 230 }}
                                value = {newUserData.bio}
                                onChange = { (e) => bioHandler(e) }
                            />

                            <br />

                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    onChange={ (e) => genderHandler(e) }
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>

                            <br />

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Basic example"
                                    value={value}
                                    onChange={(newValue) => {
                                        function convert(str) {
                                            var date = new Date(str),
                                              mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                                              day = ("0" + date.getDate()).slice(-2);
                                            return [day, mnth, date.getFullYear()].join("-");
                                          }
                                        console.log(convert(newValue))
                                        setNewUserData(prev => {
                                            return {
                                                ...prev,
                                                dob :convert(newValue)
                                            }
                                        })
                                        setValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>

                            <br />

                            <TextField 
                                id="outlined-basic" 
                                label="Email *" 
                                variant="outlined" 
                                value={ newUserData.email}
                                onChange = { (e) => emailHandler(e) } 
                            />

                            <br />

                            <TextField 
                                id="outlined-basic" 
                                label="Mobile Number *" 
                                variant="outlined" 
                                value={newUserData.mobileNumber}
                                onChange = { (e) => mobileHanlder(e) }
                            />

                            <br />

                            <Button variant="outlined" onClick={() => updateHandler() }>Update Profile</Button>

                        </div>
                    </Grid>

                </Grid>
            </Box>

            

        </div>
    )
}

export default EditPage
