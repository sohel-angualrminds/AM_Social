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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function EditPage() 
{

    //datePicker

    const [value, setValue] = React.useState(null);



    return (
        <div>
            <HeaderPage />

            <h1>Edit Profile</h1>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>

                    <Grid item xs={4} sx={{border : '1px solid black'}}>
                        <div style={{height:'200px',width:'200px',backgroundColor:'skyblue'}}>
                        </div>
                    </Grid>

                    <Grid item xs={8} sx={{border : '1px solid black'}}>
                        <div>
                            <TextField 
                                id="outlined-basic" 
                                label="Name *" 
                                variant="outlined" 
                            />

                            <br />

                            <TextareaAutosize
                                aria-label="minimum height"
                                minRows={3}
                                placeholder="Minimum 3 rows"
                                style={{ width: 230 }}
                            />

                            <br />

                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
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
                            />

                            <br />

                            <TextField 
                                id="outlined-basic" 
                                label="Mobile Number *" 
                                variant="outlined" 
                            />

                        </div>
                    </Grid>

                </Grid>
            </Box>

            

        </div>
    )
}

export default EditPage
