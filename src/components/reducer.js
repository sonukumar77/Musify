 import { ADD_TO_PLAYLIST, MAKE_FAVOURITE, PLAY_NEXT_SONG, PLAY_PREV_SONG, REMOVE_FAVOURITE, REPLACE_PLAYLIST, SET_PLAY_NOW } from "./Constants"

 const initialState = {
    currently_playing :{},
    favourite_list:{},
    playlist:[],
    playing_index:0
}

const reducer = (currentState = initialState ,action) => {

    const newState ={ ...currentState}


    switch(action.type)
    {
        case SET_PLAY_NOW:
            newState.currently_playing=action.payload;
            newState.playlist = [action.payload, ...newState.playlist]
            break;

        case MAKE_FAVOURITE:
            newState.favourite_list[action.payload.id] = action.payload;
            newState.favourite_list= {...newState.favourite_list};
            break;

        case REMOVE_FAVOURITE:
            delete newState.favourite_list[action.payload.id]
            newState.favourite_list= {...newState.favourite_list};
            break;
        case ADD_TO_PLAYLIST:
            newState.playlist.push(action.payload)
            newState.playlist=[...newState.playlist]
            break;
        case PLAY_NEXT_SONG:
            if((newState.playlist.length - 1) > newState.playing_index )
            {
                newState.playing_index++
                newState.currently_playing=newState.playlist[newState.playing_index]
            }
            break;
        case PLAY_PREV_SONG:
            if(newState.playing_index > 0)
            {
                newState.playing_index--
                newState.currently_playing=newState.playlist[newState.playing_index]
            }
            break;
        case REPLACE_PLAYLIST:
            if(action.payload.length > 0)
            {
                newState.playlist=action.payload;
                newState.playing_index=0;
                newState.currently_playing=newState.playlist[0]
            }
            
            break;

            default:
              break;
    }
    return newState;

}

export default reducer;

// or 
// const reducer = (currentState = initialState ,action) => {

    

//     return {...currentState};

// }