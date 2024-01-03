import * as SecureStore from "expo-secure-store";
import axios from "axios";
import get_genres_top_artists from "./genres";

const get_recommendations_data = async() => {
  const response = await axios.get('https://api.spotify.com/v1/recommendations', {
    headers: {
      'Authorization': `Bearer ${await SecureStore.getItemAsync('access_token')}`
    },
    //   TODO: replace salsa with await get_genres_top_artists()
    params: {
      limit: 50,
      seed_genres: 'salsa',
      min_energy: 0.5,

    }
  })
  return response.data.tracks
}

export default async function get_recommended_tracks_uris(){
    let recommended_track_uris = []
    let recommendations_data = await get_recommendations_data()
    for (let i = 0; i < recommendations_data.length; i++) {
        recommended_track_uris.push(recommendations_data[i]['uri'])
    }
    return recommended_track_uris
}
