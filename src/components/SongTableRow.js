import React from "react";
import TableCell from '@mui/material/TableCell';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton, Stack, Typography } from '@mui/material/';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from "react-redux";
import { removeFavourite,makeFavourite ,setPlayNow, addToPlaylist } from "./action";
import { Link } from "react-router-dom";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const SongTableRow = (props) => {

    const dispatch = useDispatch();
    const isFavourite = useSelector((state) =>{
        return state.favourite_list[props.data.id] !== undefined
    })

    const isPlaying = useSelector((state) => {
        return state.currently_playing.id === props.data.id

    })
    const image_url = `https://api.napster.com/imageserver/v2/albums/${props.data?.albumId}/images/70x70.jpg`;

    const playSong = () => {
        dispatch(setPlayNow(props.data));
    }

    const toggleFavourite = () => {
        if(isFavourite)
        {
          
            dispatch(removeFavourite(props.data.id))
           
        }else{
            dispatch(makeFavourite(props.data))
        }
        
    }

    const addToPlay = () => {
        dispatch(addToPlaylist(props.data))
    }
    // console.log(isPlaying)
    return (
        <>
            <TableRow hover  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} selected={isPlaying}>
                <TableCell component="th" scope="row">
                    {props.index + 1}
                </TableCell>
                <TableCell >
                    <Stack direction="row" textAlign="center" alignItems="center" spacing={2}>
                        {props.owner !== "album" ? (
                            <img style={{ width: "3rem", height: "3rem" }} src={image_url} alt="Album Cover"/>
                        ) : false}

                        <Typography variant="body1">{props.data?.name}</Typography>
                    </Stack>
                </TableCell>

                {/* {props.owner == "artist" ?
                    (<TableCell align="right">
                        <img style={{ width: "3rem", height: "3rem" }} src={image_url} alt="Album Poster" />
                    </TableCell>)
                    :
                    false
                }

                <TableCell align="right">{props.data?.name}</TableCell> */}
                <TableCell align="right">
                    {props.owner === "artist" ? (

                        <Link to={`/albums/${props.data?.albumId}`}>
                            {props.data?.albumName}
                        </Link>


                    ) : (
                        <Link to={`/artists/${props.data?.artistId}`}>
                            {props.data?.artistName}
                        </Link>
                    )}
                </TableCell>

                <TableCell align="right">
                    <IconButton aria-label="delete" size="large" onClick={playSong}>
                        {/* {isPlaying?<PauseIcon/>:<PlayArrowIcon />} */}
                        <PlayArrowIcon />
                    </IconButton>
                    {/* <IconButton aria-label="delete" size="large" onClick={toggleFavourite}>
                    {isFavourite ?
                    (
                        <FavoriteIcon />
                        
                        
                        
                    )
                    :
                    (
                        
                        <FavoriteBorderIcon />
                        
                    )}
                    </IconButton> */}
                    {isFavourite ?
                    (
                        <IconButton aria-label="delete" size="large" onClick={toggleFavourite} color="primary">
                        <FavoriteIcon />
                        
                        </IconButton>
                    )
                    :
                    (
                        <IconButton aria-label="delete" size="large" onClick={toggleFavourite}>
                        <FavoriteBorderIcon />
                        </IconButton>
                    )}

                    <IconButton aria-label="delete" size="large" onClick={addToPlay}>
                    <PlaylistAddIcon />
                    </IconButton>

                </TableCell>

            </TableRow>
        </>
    )
}

export default SongTableRow;