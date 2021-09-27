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
import {addAll, add, removeAt,updateAt} from '../reducers/books'
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

    let { bookId } = useParams();
    let book = booksList[bookId]

    const [state, setState] = React.useState({ name: book.name,author: book.author});

    // setState({...state, name: book.name})


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const name = data.get('name')
        const author = data.get('author')

        if(!name && !author) {
            return;
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        const formData = new FormData();
        formData.append('name',name)
        formData.append('author',author)

        axios.patch(baseURL + "/" + book._id ,formData,{
            headers: headers
        }).then((response) => {
            console.log(response.data)

            let newBook = {name: state.name,author:state.author,image:book.image,_id:book._id}
            dispatch(updateAt({index:bookId,book:newBook}))
            history.replace("/info/"+bookId)
        }).catch((e)=>{
            console.log("error " + e)
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
                        Edit Book
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
                            value={state.name}
                            onChange={(e) => {setState({...state, name: e.target.value})}}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="author"
                            label="Author"
                            id="author"
                            autoComplete="author"
                            value={state.author}
                            onChange={(e) => {setState({...state, author: e.target.value})}}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 ,p:1}}
                        >
                            Update
                        </Button>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}