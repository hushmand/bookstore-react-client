import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import useState from 'react';
import { useHistory } from "react-router-dom";


import { useSelector, useDispatch } from 'react-redux'
import { addToken, clearToken } from '../reducers/auth'
import {addAll} from "../reducers/books";

const theme = createTheme();
const baseURL = "http://localhost:5000/auth/login";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignIn() {
    const history = useHistory()

    const token = useSelector(state => state.auth.value)
    const dispatch = useDispatch()

    const [state, setState] = React.useState({ hasError: false, hasWarning: false,hasLoading: false });


    const handleSubmit = (event) => {
        // setState({...state, hasWarning: false,hasError: false,hasLoading: false})
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let email = data.get('email')
        let pass = data.get('password')

        if(!email && !pass) {
            setState({...state, hasWarning: true})
            return;
        }
        setState({...state, hasLoading: true,hasError: false,hasWarning: false})

        axios.post(baseURL,{
            username:email,
            password: pass
        }).then((response) => {
            setState({...state, hasLoading: false})
            console.log(response.data)
            if(response.data.success == true){
                dispatch(addToken(response.data.token))
                history.replace("/")
            }else{
                setState({...state, hasError: true,hasWarning: false})
            }
        }).catch(()=>{
            setState({...state, hasLoading: false,hasError: true,hasWarning: false})
        });

    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Username"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 ,p:1}}
                        >
                            Sign In
                        </Button>

                        {state.hasError ? <Alert sx={{ mt: 3}} severity="error">Username or password not correct</Alert> : null}
                        {state.hasWarning ? <Alert severity="warning">Please enter username and password</Alert> : null}
                        {state.hasLoading ? <CircularProgress sx={{ml: "49%"}} /> : null}



                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}