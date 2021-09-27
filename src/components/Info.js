import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useSelector, useDispatch } from 'react-redux'
import { addAll, clearAll } from '../reducers/books'
// import {addToken, clearToken} from "../reducers/auth";

import {
    useParams
} from "react-router-dom";

export default function Info() {

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
                <Button size="small" disabled={!isLoggedIn}>Delete</Button>
            </CardActions>
        </Card>
    );
}

