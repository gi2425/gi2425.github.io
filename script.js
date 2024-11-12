// script.js

// Replace with your playlist ID and access token
const playlistId = '1mHkNHuBfOfy49dvWQDvly';
const accessToken = 'BQAsscr00titdocn3hoSNEJgrwuWBgi5nnAgsCgWjWU0Qyg3XKIxIZP2faooXU-arxLatUWztclc1jIoym1BxVUhkVJgkt168kYrBW7KTwd_ZUYqLAVMsVQRgiOTMdm920dZvHb-xva0YzoSEwTVcPjgrdVW3TkLHR8sgoMo7Stx9dLpnCHK4Q9MqfnnLmhowlQZOx0hhAtyLhL0JMloaJhWJHMH55XklyE';

// Function to get songs from a Spotify playlist
async function getPlaylistTracks() {
    try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
        return data.items.map(item => item.track.name);
    } catch (error) {
        console.error('Error fetching playlist tracks:', error);
    }
}

// Function to display random songs
async function displayRandomSongs() {
    const songList = document.getElementById('songList');
    songList.innerHTML = ''; // Clear previous songs

    const songs = await getPlaylistTracks();
    if (songs) {
        // Shuffle the songs and pick 5 random songs to display
        const randomSongs = songs.sort(() => 0.5 - Math.random()).slice(0, 5);

        randomSongs.forEach(song => {
            const listItem = document.createElement('li');
            listItem.textContent = song;
            songList.appendChild(listItem);
        });
    }
}

// Attach event listener to button
document.getElementById('getSongs').addEventListener('click', displayRandomSongs);
