import React from "react";
import { Box, Toolbar, Typography } from "@mui/material/"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useSelector} from "react-redux";
import SongTableRow from "./SongTableRow";


const FavoriteListContaiiner = () => {

    const favourite_list = useSelector((state) => {

        return state.favourite_list;
    })

   
    return (
        <>
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Toolbar />
                <Typography variant="h4">My Favorite Songs :</Typography>

                <TableContainer component={Paper} sx={{ mt: 5 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6">S.No.</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Image</Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography variant="h6">Artist</Typography>
                                </TableCell>
                                {/* <TableCell>
                                    <Typography variant="h6"></Typography>
                                </TableCell> */}


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(favourite_list).map((single_key,idx) => {
                                const single_favorites_song = favourite_list[single_key]
                                return <SongTableRow data={single_favorites_song} key={single_key} index={idx} owner="favourite"/>
                            })}
                            {/* <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                <TableCell >
                                    1
                                </TableCell>
                                <TableCell >
                                    <Stack direction="row" textAlign="center" alignItems="center" spacing={2}>
                                        <img style={{ width: "3rem", height: "3rem" }} src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_2x_r4.png" />
                                        <Typography variant="body1">About Damn Time</Typography>
                                    </Stack>
                                </TableCell>

                                <TableCell >
                                <Typography variant="body1"> Morgan Wallen</Typography>
                                   
                                </TableCell>
                                <TableCell >
                                    <IconButton aria-label="delete" size="large" >
                                        <PlayArrowIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                             */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </>
    )

}

export default FavoriteListContaiiner;