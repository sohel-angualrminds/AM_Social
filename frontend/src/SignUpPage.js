import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

function SignUpPage() 
{
  return (
    <div>
        <Box
            sx={{
                width: 300,
                height: 300,
                backgroundColor: '',
                '&:hover': {
                backgroundColor: '',
                opacity: [0.9, 0.8, 0.7],
                },
               
            }}
        >
            <TextField id="filled-basic" label="Enter First Name *" variant="filled" />
            <TextField id="filled-basic" label="Enter Last Name *" variant="filled" />
            <TextField id="filled-basic" label="Enter Email *" variant="filled" />
            <TextField id="filled-basic" label="Enter Password *" variant="filled" />
        </Box>
    </div>
  )
}

export default SignUpPage
