import React,{ useState} from 'react';
import Box from '@mui/material/Box';
// import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';

import TopNav from './components/TopNav';
import MainContainer from './components/MainContainer';
import PlayerContainer from './components/PlayerContainer';
import SideNav from './components/SideNav';
import { Routes, Route } from "react-router-dom";
import TopArtistContainer from './components/TopArtistContainer';
import ArtistPage from './components/ArtistPage';
import TopSongsContainer from './components/TopSongsContainer';
import TopAlbumsContainer from './components/TopAlbumsContainer';
import AlbumPage from './components/AlbumPage';
import SearchConatiner from './components/SearchContainer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FavoriteListContaiiner from './components/FavouriteListContainer';
import PlayListContainer from './components/PlayListContainer';



const App = () => {

  const [theme,setThem] = useState(createTheme({
    palette: {
      mode: 'light',
    },
  }));

  // useEffect(() => {

  //   const theme = createTheme({
  //     palette: {
  //       mode: 'light',
  //     },
  //   });

  //   setThem(theme)

  // },[])


  const updateTheme = (isDark) => {

    if(isDark)
    {
      const theme = createTheme({
        palette: {
          mode: 'light',
        },
      });
  
      setThem(theme)
    }else{
      const theme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
  
      setThem(theme)

    }


  }


  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TopNav updateTheme={updateTheme}/>
            <SideNav />
            <Box sx={{ mb: 10, width: 1 }}>
              {/* <MainContainer /> */}
              <Routes>
                <Route path="/" element={<MainContainer />} />
                <Route path="/top/artists" element={<TopArtistContainer />} />
                <Route path="/artists/:artist_id" element={<ArtistPage />} />
                <Route path="/albums/:album_id" element={<AlbumPage />} />
                <Route path="/top/songs" element={<TopSongsContainer />} />
                <Route path="/top/albums" element={<TopAlbumsContainer />} />
                <Route path="/search/:query" element={<SearchConatiner />} />
                <Route path="/favourites" element={<FavoriteListContaiiner />} />
                <Route path="/playlist" element={<PlayListContainer />} />
               
              </Routes>

            </Box>
          </Box>
          <PlayerContainer />

        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;

// import PalyerContainer from './components/PlayerContainer';
// import TopNav from './components/TopNav';
// import AppDrawer  from "./components/AppDrawer";

// function App() {
//   return (
//     <>
//     <TopNav />
//     <AppDrawer />
//     <PalyerContainer />
//     </>
//   );
// }

// export default App;
