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

function EditPage() 
{

    //datePicker

    const [value, setValue] = React.useState(null);



    return (
        <div>
            <HeaderPage />

            <h1>Edit Profile</h1>

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

        </div>
    )
}

export default EditPage
