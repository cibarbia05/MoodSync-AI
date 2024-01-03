import axios from 'axios';
import * as SecureStore from "expo-secure-store";
const get_top_artists = async() => {
  const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
    headers: {
      'Authorization': `Bearer ${await SecureStore.getItemAsync('access_token')}`
    }
  })
  return response.data.items
}
export default async function get_genres_top_artists(){
  let top_artists = await get_top_artists()
    let genres = []
    for (let i = 0; i < top_artists.length; i++) {
      const genre_list = top_artists[i]['genres']
      for (let j = 0; j < genre_list.length; j++) {
        genres.push(genre_list[j])
      }
    }
    genres = new Set(genres)
    return Array.from(genres).join(',')

}
async function get_available_recommendation_genres(){
  const response = await axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
    headers: {
      'Authorization': `Bearer ${await SecureStore.getItemAsync('access_token')}`
    }
  });
  return response.data

}
// TODO: Check if any of the above found genres are part of Spotify's genre_seed_list, if not figure out another solution


