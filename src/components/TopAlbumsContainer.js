import React, { useEffect, useState } from "react";
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { NAPSTER_API_KEY } from "./Constants";
import AlbumCard from "./AlbumCard";



const TopAlbumsContainer = () => {

    const [albumList,setAlbumList] = useState([]);

    useEffect(() => {

        (async () => {
            const response = await fetch(`https://api.napster.com/v2.2/albums/top?apikey=${NAPSTER_API_KEY}`);
            const data = await response.json();
            setAlbumList(data.albums);
            // console.log(data.albums)

        })();

    }, [])

    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {
                        albumList.map((single_album,idx) => {
                            return(
                                <>
                                <AlbumCard data={single_album} key={idx}/>
                                </>
                            )
                        })
                    }
                    
                </Grid>
            </Box>

        </>
    )
}

export default TopAlbumsContainer;