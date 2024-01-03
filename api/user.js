import axios from 'axios';
import * as SecureStore from "expo-secure-store";

const get_user_id = async() => {
  const response = await axios.get('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': `Bearer ${await SecureStore.getItemAsync('access_token')}`
    }
  })
  return response.data.display_name
}
export default get_user_id