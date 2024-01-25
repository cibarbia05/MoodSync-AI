import axios from 'axios';
import * as SecureStore from "expo-secure-store";

/**
 * Obtains a list of top artists the logged-in user listens to on Spotify
 * with a call to the API endpoint 'me/top/artists'
 * @returns {Promise<*>} list of top artists
 */
const getTopArtists = async() => {
    const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
      headers: {
        'Authorization': `Bearer ${await SecureStore.getItemAsync('access_token')}`,
      }
    })
    return response.data.items;
}

/**
 * Obtains a list of the combined unique genres of all the top artists
 * the logged-in user listens to
 * @returns {Promise<[]>} Unique list of top genres
 */
async function getGenresOfTopArtists(){
    let topArtists = await getTopArtists();
      let genres = [];
      for (let i = 0; i < topArtists.length; i++) {
        const genreList = topArtists[i]['genres'];
        for (let j = 0; j < genreList.length; j++) {
          genres.push(genreList[j]);
        }
      }
      genres = Array.from(new Set(genres));

      return genres;
}
/**
 * Obtains a list of 5 random spotify uris from all the top artists the
 * logged-in user listens to
 * @returns {Promise<[]>} List of 5 spotify uris
 */

async function getUrisOfTopArtists(){
    let topArtists = await getTopArtists();
    let uris = [];
    for (let i = 0; i < topArtists.length; i++) {
        uris.push(topArtists[i]['uri'].split(':')[2]);
    }
    uris = uris.sort(() => .5 - Math.random()).slice(0, 5);

    return uris;
}

/**
 * Obtains a list of Spotify's "seed_genres" (genres that can be used to
 * make an API call to Spotify's track recommendations endpoint) with a call
 * to the API endpoint 'recommendations/available-genre-seeds'
 * @returns {Promise<*>} List of Spotify's "seed_genres"
 */
async function getAvailableSeedGenres(){
    const response = await axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
      headers: {
        'Authorization': `Bearer ${await SecureStore.getItemAsync('access_token')}`,
      }
    });
    return response.data.genres;
}

/**
 * Obtains a list of the genres from the loggen-in user's top genre list
 * that match those in Spotify's available "seed_genres"
 * @returns {Promise<*>} List of genre intersections in the user's top genres and "seed_genres"
 */
async function getGenreIntersection(){
    const genresOfTopArtists = await getGenresOfTopArtists();
    const spotifyGenres = await getAvailableSeedGenres();

    return spotifyGenres.filter(element => genresOfTopArtists.includes(element)).sort(() => .5 - Math.random()).slice(0, 5);
}

export {
    getGenresOfTopArtists,
    getUrisOfTopArtists,
    getGenreIntersection,
};
