import * as React from 'react';
import '../styles/list.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux'
import { addAll, clearAll } from '../reducers/books'
import {addToken} from "../reducers/auth";


const baseURL = "http://localhost:5000/books?limit=10&page=";


export default function TitlebarImageList() {

    let page = 0;
    let hasMore = true;

    const booksList = useSelector(state => state.books.value)
    const dispatch = useDispatch()

    React.useEffect(() => {

        const fetchData = () =>{
            console.log(baseURL + page)
            axios.get(baseURL + page).then((response) => {
                console.log(response.data.result.books)
                if(response.data.result.books.length > 0){
                    dispatch(addAll(response.data.result.books))
                }else{
                    hasMore = false
                }
            });
        }

        fetchData();

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if ((window.innerHeight + currentScrollY) >= document.body.offsetHeight + 15) {
                // console.log("button")
                page++;
                if(hasMore) fetchData()
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    if (!booksList) return null;


    return (
        <div >
            <ImageList sx={{ width: '40%', justifyContent: 'center',ml: "30%" , mr: "30%", mt: 3}}>

                {booksList.map((item,index) => (
                    <ImageListItem key={item._id + index}>
                        <img
                            src={`${item.image}?w=248&fit=crop&auto=format`}
                            srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.name}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.name + index}
                            subtitle={item.author}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about ${item.name}`}
                                >
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>

    );
}
