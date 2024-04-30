// Define your API key and video URL
const apiKey = 'AIzaSyDPLF4p9bEvwPOwGEzDWUJHJ7pmjGVTEFs';

export const getVideoName = (url: string) => {
    // Make a request to the YouTube API
    fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${getVideoId(url)}&key=${apiKey}`)
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

export const createRealPlaylist = (name: string) => {
  // Define the request parameters
  const playlistData = {
    snippet: {
        title: name,
        description: `Genrefi's official collection of ${name}.`
    }
  };

  // Make a POST request to create the playlist
  fetch(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&key=${apiKey}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(playlistData)
  })
  .then(response => {
    if (!response.ok) {
        throw new Error('Failed to create playlist');
    }
    return response.json();
  })
  .then(data => {
    console.log('Playlist created successfully:', data);
  })
  .catch(error => {
    console.error('Error creating playlist:', error);
  });
}