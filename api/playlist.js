import get_user_id from "./user";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import get_recommended_tracks_uris from "./recommendations";
const create_playlist = async() => {
    const user_id = await get_user_id()
    const response = await axios.post(`https://api.spotify.com/v1/users/${user_id}/playlists`,  {
    'name': 'Your Latest Playlist',
    'description': 'AI-based generated playlist ',
    'public': false
    },
  {
        headers: {
          'Authorization': `Bearer ${await SecureStore.getItemAsync('access_token')}`,
          'Content-Type': 'application/json'
        }
    }
  );
    return response.data.id

}
const add_all_playlist_tracks = async() => {
    const playlist_id = await create_playlist()
    const response = await axios.post(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,  {
    'uris': await get_recommended_tracks_uris()
    },
  {
        headers: {
          'Authorization': `Bearer ${await SecureStore.getItemAsync('access_token')}`,
          'Content-Type': 'application/json'
        }
    }
  );
    return response.data
}

export default add_all_playlist_tracks