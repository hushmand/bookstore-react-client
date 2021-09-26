import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { useSelector, useDispatch } from 'react-redux'
import { addToken, clearToken } from '../reducers/auth'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


export default function ButtonAppBar() {

    const token = useSelector(state => state.auth.value)
    const dispatch = useDispatch()

    let isLoggedIn;
    if(token)
        isLoggedIn = true
    else
        isLoggedIn = false

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Bookstore
                    </Typography>

                    <div>
                        {isLoggedIn ? <Button color="inherit"><Link to="/new" style={{ textDecoration: 'none',color: 'white' }}>New</Link></Button>: null }

                        {!isLoggedIn ?
                            <Button color="inherit"><Link to="/login" style={{ textDecoration: 'none',color: 'white' }}>Login</Link></Button> :
                            <Button
                                color="inherit"
                                aria-label="clear token"
                                onClick={() => dispatch(clearToken())}>
                                Logout
                            </Button>
                        }
                    </div>

                </Toolbar>
            </AppBar>
        </Box>
    );
}