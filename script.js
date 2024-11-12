// script.js

const accessToken = 'BQAsscr00titdocn3hoSNEJgrwuWBgi5nnAgsCgWjWU0Qyg3XKIxIZP2faooXU-arxLatUWztclc1jIoym1BxVUhkVJgkt168kYrBW7KTwd_ZUYqLAVMsVQRgiOTMdm920dZvHb-xva0YzoSEwTVcPjgrdVW3TkLHR8sgoMo7Stx9dLpnCHK4Q9MqfnnLmhowlQZOx0hhAtyLhL0JMloaJhWJHMH55XklyE'; // Replace with your actual Spotify access token
const trackId = '3SeDS5sSoWnwAZvVgkdKzf'; // Replace with the track ID of the song you want to display

async function fetchSongName(trackId) {
    try {
        const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.name; // Return the name of the track

    } catch (error) {
        console.error("Error fetching track name:", error);
        return null;
    }
}

async function displaySongName() {
    const songName = await fetchSongName(trackId);
    const songNameElement = document.getElementById("song-name");
    
    if (songName) {
        songNameElement.textContent = `Song Name: ${songName}`;
    } else {
        songNameElement.textContent = "Error fetching song name.";
    }
}
