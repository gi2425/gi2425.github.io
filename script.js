// script.js

// Replace with your playlist ID and access token
const playlistId = '1mHkNHuBfOfy49dvWQDvly';
const accessToken = 'BQAsscr00titdocn3hoSNEJgrwuWBgi5nnAgsCgWjWU0Qyg3XKIxIZP2faooXU-arxLatUWztclc1jIoym1BxVUhkVJgkt168kYrBW7KTwd_ZUYqLAVMsVQRgiOTMdm920dZvHb-xva0YzoSEwTVcPjgrdVW3TkLHR8sgoMo7Stx9dLpnCHK4Q9MqfnnLmhowlQZOx0hhAtyLhL0JMloaJhWJHMH55XklyE';

// Function to get songs from a Spotify playlist
async function getPlaylistTracks(playlistId) {
    try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // Log the response data to inspect it
        console.log("Playlist tracks response:", data);

        return data.items
            .map(item => {
                const track = item.track;
                // Check if the track and track.name are available
                if (track && track.name) {
                    return track.name;
                } else {
                    console.warn("Track data missing for item:", item);
                    return null; // Return null for items without track or name
                }
            })
            .filter(name => name !== null); // Remove any null entries from the list

    } catch (error) {
        console.error("Error fetching playlist tracks:", error);
        return [];
    }
}

// Example display function for testing
async function displayRandomSongs() {
    const playlistId = 'YOUR_PLAYLIST_ID'; // Replace with your playlist ID
    const songs = await getPlaylistTracks(playlistId);
    if (songs.length > 0) {
        const randomSong = songs[Math.floor(Math.random() * songs.length)];
        console.log("Random Song:", randomSong);
    } else {
        console.log("No songs available to display.");
    }
}


// Attach event listener to button
document.getElementById('getSongs').addEventListener('click', displayRandomSongs);
