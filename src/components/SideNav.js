import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import PersonIcon from '@mui/icons-material/Person';
import AlbumIcon from '@mui/icons-material/Album';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import FavoriteIcon from '@mui/icons-material/Favorite';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Link } from "react-router-dom"


const drawerWidth = 240;



export default function SideNav() {
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <Link to="/" style={{ textDecoration: "none" }}>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/top/artists" style={{ textDecoration: "none" }}>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Top Artist" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/top/albums" style={{ textDecoration: "none" }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AlbumIcon />
                  </ListItemIcon>
                  <ListItemText primary="Top Album" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link to="/top/songs" style={{ textDecoration: "none" }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LibraryMusicIcon />
                  </ListItemIcon>
                  <ListItemText primary="Top Song" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>

            <Link to="/favourites" style={{ textDecoration: "none" }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <FavoriteIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Favourite" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link to="/playlist" style={{ textDecoration: "none" }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <QueueMusicIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Playlist" />
                </ListItemButton>
              </ListItem>
            </Link>

          </List>
        </Box>
      </Drawer>
    </>
  );
}
