import axios from "axios";
import { API_KEY, OAUTH_TOKEN } from '../../../config';

export const getVideoName = (url: string) => {
  console.log(url);
    // Make a request to the YouTube API
    fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${getVideoId(url)}&key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        // Extract the video title from the API response
        const videoTitle = data.items[0].snippet.title;
        console.log(videoTitle);
        return videoTitle;
    })
    .catch(error => {
    console.error('Error:', error);
    });
}

// Function to extract video ID from URL
function getVideoId(url: string) {
  const slice1 = url.slice(url.indexOf('v=') + 2);
  const slice2 = slice1.slice(0, slice1.indexOf('&'));
  return slice2;
}

export const createRealPlaylist = async (name: string): Promise<{ id: string; }> => {
  console.log("createRealPlaylist")
  // Define the request parameters
  const playlistData = {
    snippet: {
        title: name,
        description: `Genrefi's official ${name} collection.`
    },
    status: {
      privacyStatus: "public"
    }
  };

  console.log(JSON.stringify(playlistData));

  try {
    const res = await axios.post(`https://www.googleapis.com/youtube/v3/playlists?part=snippet,status`, JSON.stringify(playlistData), {
      headers: {
        'Authorization': `Bearer ${OAUTH_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    if (res.status === 200) {
      console.log('success');
      return res.data;
    }
  } catch (error) {
    console.log("youtube api call failed. Throwing error:");
    throw error;
  }
  return { id: 'failed'}
}