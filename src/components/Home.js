import * as React from 'react';
import '../styles/Home.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'
import { addAll, clearAll } from '../reducers/books'

const baseURL = "http://localhost:5000/books?limit=10&page=";
let page = 0;
let hasMore = true;

export default function Home() {
    const history = useHistory()


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
                page += 1
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
                            title={item.name}
                            subtitle={item.author}
                            actionIcon={
                                <IconButton
                                    onClick={() => history.replace(`/info/${index}`)}
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
