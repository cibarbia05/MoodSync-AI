import axios from 'axios';
import * as SecureStore from "expo-secure-store";

/**
 * Obtains the display_name (id of the user) from the user who logged into Spotify
 * with call to the API endpoint 'me'
 * @returns {Promise<*>} display_name (id of the user)
 */
const getUserId = async() => {
  const response = await axios.get('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': `Bearer ${await SecureStore.getItemAsync('access_token')}`
    }
  })
  return response.data.display_name;
}
export default getUserId;