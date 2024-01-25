import * as SecureStore from "expo-secure-store";
import axios from "axios";
import {getGenreIntersection, getUrisOfTopArtists} from "./genres";

/**
 * Obtains a list of recommended tracks for the logged-in user by using the
 * gathered text analysis value of the user input and converting it into
 * the min_energy and max_energy parameters of the API endpoint 'recommendation'.
 * Additionally, passes either a seed_genre or seed_artist parameter to the get
 * request, depending on the recommended data type for the respective user
 * @param {string} textAnalysisValue
 * @returns {Promise<*>} list of recommended tracks
 */
const getRecommendationsData = async(textAnalysisValue) => {
    const params = {
        limit: 50,
        min_energy: (textAnalysisValue ? 0.5 : 0),
        max_energy: (textAnalysisValue ? 1 : 0.5),
    }

    if (await determineRecommendationDataType()) {
        params.seed_genres = (await getGenreIntersection()).join(',');
    }
    else{
        params.seed_artists = (await getUrisOfTopArtists()).join(',');
    }
    const response = await axios.get('https://api.spotify.com/v1/recommendations', {
        headers: {
            'Authorization': `Bearer ${await SecureStore.getItemAsync('access_token')}`
        },
        params: params,
    })
    return response.data.tracks;
};

/**
 * Obtains a list of the Spotify uris of all the recommended tracks to pass
 * back to the API endpoint 'playlists/${playlist_id}/tracks' to fill the empty
 * playlist
 * @param {string} textAnalysisValue
 * @returns {Promise<[]>} list of uris of all recommended tracks
 */
async function getRecommendedTracksUris(textAnalysisValue){
    let recommendedTrackUris = [];
    let recommendationsData = await getRecommendationsData(textAnalysisValue);
    for (let i = 0; i < recommendationsData.length; i++) {
        recommendedTrackUris.push(recommendationsData[i]['uri']);
    }
    return recommendedTrackUris;
}

/**
 * Determines whether the loggen-in user's playlist should contain tracks based
 * on top genres of top artists. The result is top genres (true) if any of the user's
 * top genres are present in Spotify's "seed_genres" and top artists (false) otherwise
 * @returns {Promise<boolean>} true if used data will be top genres, false if top artists
 */
async function determineRecommendationDataType(){
    const intersection = getGenreIntersection();

    return intersection === undefined || intersection.length === 0;

}

export default getRecommendedTracksUris;

