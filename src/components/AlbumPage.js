import React, { useEffect, useState } from "react";
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { useParams, Link } from "react-router-dom";
import { NAPSTER_API_KEY } from "./Constants";
import { Paper, Stack, Typography, Chip } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Fab from '@mui/material/Fab';
import CircularProgress from "@mui/material/CircularProgress";
import SongTableRow from "./SongTableRow";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useDispatch } from "react-redux";
import { replacePlaylist } from "./action";

const AlbumPage = () => {

    const { album_id } = useParams();
    const [albumDetails, setAlbumDetails] = useState({});
    const [songList, setSongList] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const response = await fetch(`http://api.napster.com/v2.2/albums/${album_id}?apikey=${NAPSTER_API_KEY}`);
            const data = await response.json();
            if (data.albums.length > 0) {

                setAlbumDetails(data.albums[0])
                console.log(data.albums[0])
            }
            const song_response = await fetch(`https://api.napster.com/v2.2/albums/${album_id}/tracks?apikey=${NAPSTER_API_KEY}`);
            const song_data = await song_response.json();
            setSongList(song_data.tracks);
            // console.log(song_data.tracks)

        })();

    }, [album_id])

    const img_url = `https://api.napster.com/imageserver/v2/albums/${album_id}/images/500x500.jpg`;

    const changePlaylist = () => {
        dispatch(replacePlaylist(songList))
    }

    return (
        <>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Stack direction="row" spacing={10}>
                    <Paper elevation={12} style={{ width: "20vw", height: "20vw", backgroundImage: `url(${img_url})`, backgroundSize: "cover" }} >
                        <Fab color="primary" aria-label="add" sx={{top:"calc(20vw - 2.5rem)",left:"calc(20vw - 4.5rem)"}} onClick={changePlaylist}>
                        <PlayArrowIcon />
                        </Fab>
                        
                    </Paper>

                    <Stack direction="column" spacing={2}>
                        <Typography variant="h3" sx={{ pt: 3 }}> {albumDetails?.name}</Typography>
                        <Typography variant="h6">
                            {
                                (albumDetails?.contributingArtists?.primaryArtist === "art.0" ?
                                    albumDetails?.artistName
                                    :
                                    <Link to={`/artists/${albumDetails?.contributingArtists?.primaryArtist}`} style={{ textDecoration: "none" }}>
                                        {albumDetails?.artistName}
                                    </Link>
                                )
                            }

                        </Typography>
                        <Typography > {albumDetails?.copyright}</Typography>

                        <Stack direction="row">
                            {albumDetails?.tags?.map((single_tag, idx) => {
                                return (
                                    <Chip label={single_tag} key={idx} />
                                )
                            })}

                        </Stack>
                    </Stack>

                </Stack>
                <h1>List Of Songs</h1>

                {songList.length === 0 ?
                    <CircularProgress />
                    :
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">
                                        <Typography variant="h6">S.No.</Typography>
                                    </TableCell>
                                    {/* <TableCell>
                                        <Typography variant="h6">Poster</Typography>
                                    </TableCell> */}
                                    <TableCell align="right">
                                        <Typography variant="h6">Name</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="h6">Artist</Typography></TableCell>
                                    <TableCell align="right"></TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {songList.map((single_song, idx) => (
                                    <SongTableRow data={single_song} index={idx} owner="album" />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </Box>

        </>
    )
}

export default AlbumPage;