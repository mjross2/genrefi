import axios from "axios";
import { API_KEY } from '../../../config';

export const getVideoName = (url: string) => {
    // Make a request to the YouTube API
    fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${getVideoId(url)}&key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        // Extract the video title from the API response
        const videoTitle = data.items[0].snippet.title;
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
  // Define the request parameters
  const playlistData = {
    snippet: {
        title: name,
        description: `Genrefi's official ${name} collection.`
    }
  };

  try {
    const res = await axios.post(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&key=${API_KEY}`, JSON.stringify(playlistData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (res.status === 201) {
      return res.data;
    }
  } catch (error) {
    throw error;
  }
  return { id: 'failed'}
  /*
  // Make a POST request to create the playlist
  fetch(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&key=${API_KEY}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(playlistData)
  })
  .then(response => {
    if (!response.ok) throw new Error('Failed to create playlist');
    return response.json();
  })
  .then(data => {
    console.log('Playlist created successfully:', data);
  })
  .catch(error => {
    console.error('Error creating playlist:', error);
  });
  return {id: 'failed'}
  */
}