import React, { useEffect, useRef, useState } from 'react';
import { Paper, Box, Stack, Slider, Fab, IconButton } from '@mui/material/';
import { useSelector, useDispatch } from "react-redux"
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOneOnIcon from '@mui/icons-material/RepeatOneOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { makeFavourite, removeFavourite,playNextSong, playPreviousSong } from './action';

const PalyerContainer = () => {

    const [volume, setVolume] = useState(50);
    const [playTime, setPlayTime] = useState(0);
    const [isPlaying, setPlaying] = useState(false);
    const audioPlayer = useRef(null);

    const [isRepeat, setRepeat] = useState(false);
    // console.log(audioPlayer)
   
    const dispatch = useDispatch();
    // const playlist = useSelector((state) => state.playlist)

    const appState = useSelector((state) => state);
    // console.log(appState)

    const changeVolume = (_, volume) => {
        setVolume(volume);
        // console.log(volume)

    }
  
    let img_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzPf5myU49EJyhJNVBqAUMiN1K4Tp7-z9o8g&usqp=CAU";
    // let img_url="";
    if(appState?.currently_playing?.albumId !== undefined)
    {
       img_url = `https://api.napster.com/imageserver/v2/albums/${appState?.currently_playing?.albumId}/images/356x237.jpg`;
    }
    
   

    useEffect(() => {
        audioPlayer.current.volume = (volume / 100);
    }, [volume])

    useEffect(() => {
        if(audioPlayer.current.src !== "")
        {
            setPlayTime(0);
            audioPlayer.current.play();
            setPlaying(true);
        }
      
    }, [appState.currently_playing])

    const changePlayTime = (_, playTime) => {
        audioPlayer.current.currentTime = playTime
        setPlayTime(playTime);

    }

    const stopPlaying = () => {
        setPlaying(false);
        setPlayTime(0);
        playNext();
    }

    const playNext = () => {
        dispatch(playNextSong());
    }
    const playPrevious = () => {
        dispatch(playPreviousSong());
    }

    const updateAudioTimePlayer = (e) => {
        // console.log(e.target.currentTime)

        setPlayTime(e.target.currentTime)

    }
    const togglePalyPause = () => {
        setPlaying((currentState) => { // here currentState is the previous value of current i.e. (false)
            const newState = !currentState;
            //  console.log(newState)

            if (newState) {

                audioPlayer.current.play();

            } else {
                audioPlayer.current.pause();

            }


            return newState;
        })

    }

    const toggleRepeat = () => {
        setRepeat((currentState) => {

            const newState = !currentState;
            if (newState) {
                audioPlayer.current.loop = true;
            } else {
                audioPlayer.current.loop = false;
            }

            return newState;
        })

    }

    const toggleFavourite = () => {
        if (appState.favourite_list[appState.currently_playing.id] === undefined) {
            dispatch(makeFavourite(appState.currently_playing));
        } else {
            dispatch(removeFavourite(appState.currently_playing.id));
        }

    }

    return (
        <>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, width: "100vw", zIndex: "1300" }} elevation={7}>
                {/* <audio ref={audioPlayer} src="http://listen.vo.llnwd.net/g3/prvw/0/2/6/1/6/2586561620.mp3" controls onTimeUpdate={updateAudioTimePlayer} /> */}
                <audio ref={audioPlayer} src={appState?.currently_playing?.previewURL} onTimeUpdate={updateAudioTimePlayer} onEnded={stopPlaying} />
                <Slider
                    aria-label="time-indicator"
                    size="small"
                    value={playTime}
                    min={0}

                    max={30}
                    onChange={changePlayTime}
                    sx={{
                        mt: -4,
                        color: "light" === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                        height: 4,
                        '& .MuiSlider-thumb': {
                            width: 8,
                            height: 8,
                            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                            '&:before': {
                                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                            },
                            '&:hover, &.Mui-focusVisible': {
                                boxShadow: `0px 0px 0px 8px ${"light" === 'dark'
                                    ? 'rgb(255 255 255 / 16%)'
                                    : 'rgb(0 0 0 / 16%)'
                                    }`,
                            },
                            '&.Mui-active': {
                                width: 20,
                                height: 20,
                            },
                        },
                        '& .MuiSlider-rail': {
                            opacity: 0.28,
                        },
                    }}
                />

                <Stack direction="row" spacing={2} sx={{ pb: 2, pl: 2, pr: 4 }} justifyContent="space-between" alignItems="center">
                    <img height="50px" src={img_url} alt="Album Cover"/>

                    <Box sx={{ pl: 22 }}>
                        <Stack direction="row" spacing={3} alignItems="center">


                            {appState.favourite_list[appState.currently_playing.id] === undefined ?
                                <IconButton aria-label="delete" size="large" onClick={toggleFavourite}>
                                    <FavoriteBorderIcon />
                                </IconButton>
                                :
                                <IconButton aria-label="delete" size="large" onClick={toggleFavourite} color="primary">
                                    <FavoriteIcon />
                                </IconButton>
                            }


                            <IconButton aria-label="delete" size="large" onClick={playPrevious}> 
                                <SkipPreviousIcon />
                            </IconButton>

                            <Fab color="primary" aria-label="add" onClick={togglePalyPause} >
                                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}

                            </Fab>

                            <IconButton aria-label="delete" size="large" onClick={playNext}>
                                <SkipNextIcon />
                            </IconButton>

                            {isRepeat ?
                                (
                                <IconButton aria-label="delete" size="large" onClick={toggleRepeat} color="primary">
                                    <RepeatOneOnIcon />
                                </IconButton>
                                )
                                :
                                (
                                    <IconButton aria-label="delete" size="large" onClick={toggleRepeat} >
                                        <RepeatIcon />
                                    </IconButton>
                                )
                            }



                        </Stack >
                    </Box>

                    <Box sx={{ width: "200px" }} >
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <VolumeDown />
                            <Slider aria-label="Volume" value={volume} onChange={changeVolume} />
                            <VolumeUp />
                        </Stack>
                    </Box>
                </Stack>
            </Paper>
        </>
    )
}

export default PalyerContainer;