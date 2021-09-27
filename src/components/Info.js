import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useSelector, useDispatch } from 'react-redux'
import { addAll, clearAll, removeAt } from '../reducers/books'
// import {addToken, clearToken} from "../reducers/auth";

import {
    useHistory,
    useParams
} from "react-router-dom";
import axios from "axios";
import {addToken} from "../reducers/auth";

const baseURL = "http://localhost:5000/books";

export default function Info() {

    const history = useHistory()

    const token = useSelector(state => state.auth.value)

    const booksList = useSelector(state => state.books.value)
    const dispatch = useDispatch()

    let isLoggedIn = false;
    if(token)
        isLoggedIn = true

    let { bookId } = useParams();
    console.log(bookId)

    let book = booksList[bookId]
    console.log(book)

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(removeAt(bookId))
        history.replace("/")

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        axios.delete(baseURL + "/" + book._id,{
            headers: headers
        }).then((response) => {
            console.log(response.data)
        }).catch(()=>{
            console.log("error")
        });
    };

    return (
        <Card sx={{ maxWidth: 345 , mt: 6, ml: "40%"}}>
            <CardMedia
                component="img"
                height="290"
                image={`${book.image}?w=248&fit=crop&auto=format`}
                alt={book.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {book.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {book.author}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" disabled={!isLoggedIn} >Edit</Button>
                <Button size="small" disabled={!isLoggedIn} onClick={handleSubmit} >Delete</Button>
            </CardActions>
        </Card>
    );
}

