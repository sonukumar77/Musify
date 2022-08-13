import React, { useEffect, useState } from "react";
import {Toolbar,Typography} from '@mui/material/';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { NAPSTER_API_KEY } from "./Constants";
import ArtistCard from "./ArtistCard";
import AlbumCard from "./AlbumCard";
import SongCard from "./SongCard";

const SearchConatiner = () => {

    
    const {query} = useParams();
    const [albumList,setAlbumList] = useState([]);
    const [artistList,setArtistList] = useState([]);
    const [songList,setsongList] = useState([]);
    useEffect(()=> {

        (async () => {
            const response= await fetch(`https://api.napster.com/v2.2/search?apikey=${NAPSTER_API_KEY}&per_type_limit=5&query=${query}`);
            const data = await response.json();
            const search_result =data.search.data
            setAlbumList(search_result.albums)
            setArtistList(search_result.artists)
            setsongList(search_result.tracks)
            // console.log(songList);
        })();
    },[query])
    
    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Typography variant="h4" >Search result for {query}</Typography>
                <Typography variant="h6" sx={{mt:4,mb:2}}>Artists:</Typography>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
         
                    {artistList.map((single_artist,idx) =>{
                        return(
                            <ArtistCard data={single_artist} key={idx} />
                        )
                    })}
                    
                </Grid>
                <Typography variant="h6" sx={{mt:4,mb:2}}>Albums:</Typography>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
         
                    {albumList.map((single_album,idx) =>{
                        return(
                            <AlbumCard data={single_album} key={idx}/>
                        )
                    })}
                    
                </Grid>
                <Typography variant="h6" sx={{mt:4,mb:2}}>Songs:</Typography>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
         
                    {songList.map((single_song,idx) =>{
                        return(
                            <SongCard data={single_song} key={idx} />
                        )
                    })}
                    
                </Grid>
            </Box>

        </>
    )
}

export default SearchConatiner;
