import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";

import { useSelector, useDispatch } from 'react-redux'
import {addAll, add, removeAt} from '../reducers/books'
import {addToken, clearToken} from "../reducers/auth";

import {
    useHistory,
    useParams
} from "react-router-dom";

const theme = createTheme();
const baseURL = "http://localhost:5000/books";

export default function Edit() {

    const history = useHistory()

    const token = useSelector(state => state.auth.value)
    const booksList = useSelector(state => state.books.value)
    const dispatch = useDispatch()


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const name = data.get('name')
        const author = data.get('author')
        const image = data.get('image')



        if(!name && !author && !image) {
            return;
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        const formData = new FormData();
        formData.append('image',image)
        formData.append('name',name)
        formData.append('author',author)
        formData.append('publisher',author)
        formData.append('price',1)
        formData.append('pages',10)
        formData.append('version','1')
        formData.append('publishDate','1399/12/03')

        axios.post(baseURL ,formData,{
            headers: headers
        }).then((response) => {
            console.log(response.data)
            dispatch(add({_id:name+author,name:name,author:author,image:'image'}))
            history.replace("/")
        }).catch(()=>{
            console.log("error")
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
                        New Book
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="author"
                            label="Author"
                            type="author"
                            id="author"
                            autoComplete="author"
                        />

                        <Button
                            variant="contained"
                            component="label"
                        >
                            Select book image
                            <input
                                name="image"
                                type="file"
                                id="image"
                            />
                        </Button>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 ,p:1}}
                        >
                            Submit
                        </Button>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}