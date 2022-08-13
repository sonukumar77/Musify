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


const PlayListContainer = () => {

    const play_list = useSelector((state) => {

        return state.playlist;
    })

   
    return (
        <>
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Toolbar />
                <Typography variant="h4">My Playing Queues :</Typography>

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
                            {play_list.map((single_song,idx) => {
                                
                                return <SongTableRow data={single_song} key={idx} index={idx} owner="playlist"/>
                            })}
                           
                             
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </>
    )

}

export default PlayListContainer;