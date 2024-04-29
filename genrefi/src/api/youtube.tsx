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
