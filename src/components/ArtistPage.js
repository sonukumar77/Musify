import React, { useEffect, useState } from "react";
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
import { NAPSTER_API_KEY } from "./Constants";
import { Paper, Stack, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from "@mui/material/CircularProgress";
import SongTableRow from "./SongTableRow";

const ArtistPage = () => {

    const { artist_id } = useParams();
    const [artistDetails, setArtistDetails] = useState({});
    const [songList, setSongList] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`http://api.napster.com/v2.2/artists/${artist_id}?apikey=${NAPSTER_API_KEY}`);
            const data = await response.json();
            if (data.artists.length > 0) {

                setArtistDetails(data.artists[0])
                // console.log(data.artists[0])
            }
            const song_response = await fetch(`http://api.napster.com/v2.2/artists/${artist_id}/tracks?apikey=${NAPSTER_API_KEY}&limit=5`);
            const song_data = await song_response.json();
            setSongList(song_data.tracks);
            // console.log(song_data.tracks)

        })();

    }, [artist_id])

    const img_url = `https://api.napster.com/imageserver/v2/artists/${artist_id}/images/356x237.jpg`;
    return (
        <>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Stack direction="row" spacing={8}>
                    <Paper elevation={3} style={{ width: "31vw", height: "40vh", backgroundImage: `url(${img_url})`, backgroundSize: "cover" }} />
                    <Typography variant="h4" sx={{ pt: 3 }}> {artistDetails?.name}</Typography>

                </Stack>
                <h1>List Of Songs</h1>

                {songList.length === 0 ?
                    <CircularProgress />
                    :
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="h6">S.No.</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h6">Poster</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="h6">Name</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="h6">Album</Typography>
                                    </TableCell>
                                    <TableCell align="right"></TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {songList.map((single_song, idx) => (
                                    <SongTableRow data={single_song} key={idx} index={idx} owner="artist" />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </Box>

        </>
    )
}

export default ArtistPage;