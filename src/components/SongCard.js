import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {useDispatch} from "react-redux"
import { setPlayNow } from "./action";

const SongCard = (props) => {

    const dispatch = useDispatch();
    // console.log(props.data)

    const img_url = `https://api.napster.com/imageserver/v2/albums/${props.data?.albumId}/images/356x237.jpg`;

    const changeSong = () => {
        dispatch(setPlayNow(props.data))

    }

    // console.log(props.data)
    return (
        <>
            <Grid item xs={3}  onClick={changeSong}>
                <Paper elevation={3} sx={{ p: 1 ,height:"100%"}}>
                    <Stack>
                    <Paper elevation={2} sx={{ m: 1, p: 6, backgroundImage: `url('${img_url}')`,backgroundSize:"cover" }} >

                        <h3>&nbsp;</h3>
                    </ Paper >
                    </Stack >
                    <Typography sx={{ textAlign: "center" }}>{props.data?.albumName}</Typography>
                </ Paper >
            </Grid>
        </>
    )
}

export default SongCard;