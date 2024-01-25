import getUserId from "./user";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import getTextSentiment from '../sentiment/analyse.js'
import getRecommendedTracksUris from "./recommendations";

/**
 * Creates an empty playlist on the logged-in user's Spotify account,
 * utilizing the user_id as a parameter for the post request to the API
 * endpoint 'users/${user_id}/playlists'
 * @returns {Promise<*>} Playlist id
 */
const createPlaylist = async() => {
    const user_id = await getUserId();
    const response = await axios.post(`https://api.spotify.com/v1/users/${user_id}/playlists`,  {
    'name': 'Your Latest Playlist',
    'description': 'AI-based generated playlist ',
    'public': false,
    },
  {
        headers: {
          'Authorization': `Bearer ${await SecureStore.getItemAsync('access_token')}`,
          'Content-Type': 'application/json',
        }
    }
  );
    return response.data.id;

}
/**
 * Generates a complete playlist on the logged-in user's Spotify account by
 * creating an empty playlist and creating a post request to the API endpoint
 * 'playlists/${playlist_id}/tracks' with the uris of the tracks recommended
 * for the user (which are based on the text sentiment analysis, and favorite
 * genres/artists of the user)
 * @param {string} text
 * @returns {Promise<*|boolean>}
 */
const startPlaylistGeneration = async(text) => {
    const textAnalysisValue = getTextSentiment(text);
    const playlist_id = await createPlaylist();
    try {
        const response = await axios.post(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
                'uris': await getRecommendedTracksUris(textAnalysisValue),
            },
            {
                headers: {
                    'Authorization': `Bearer ${await SecureStore.getItemAsync('access_token')}`,
                    'Content-Type': 'application/json',
                }
            }
        );
        return response.data;
    }
    catch (e) {
        return false;
    }
}

export default startPlaylistGeneration;