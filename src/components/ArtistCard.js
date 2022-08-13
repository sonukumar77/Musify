import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";

const ArtistCard = (props) => {

    const navigate = useNavigate();
    

    const img_url = `https://api.napster.com/imageserver/v2/artists/${props.data?.id}/images/356x237.jpg`;


    const navigate_fn = () => {
        navigate(`/artists/${props.data?.id}`)
    }
    // console.log(props.data)
    return (
        <>
            <Grid item xs={3}  onClick={navigate_fn} >
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

export default ArtistCard;