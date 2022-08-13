import React, { useEffect, useState } from "react";
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";

import { NAPSTER_API_KEY } from "./Constants";
import SongCard from "./SongCard";

const TopSongsConatiner = () => {

    const [songList, setSongList] = useState([]);

    useEffect(() => {

        (async () => {
            const response = await fetch(`https://api.napster.com/v2.2/tracks/top?apikey=${NAPSTER_API_KEY}`);
            const data = await response.json();
            setSongList(data.tracks);

        })();

    }, [])

    // console.log(songList)
    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {
                        // (new Array(16)).fill(123).map((_, idx) => {
                        songList.map((single_song, idx) => {
                            return (

                                <SongCard data={single_song} key={idx} />


                            )
                        })
                    }
                </Grid>
            </Box>

        </>
    )
}

export default TopSongsConatiner;
