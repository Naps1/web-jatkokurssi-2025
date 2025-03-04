const songForm = document.getElementById('songForm');
const songTableBody = document.getElementById('songTable').getElementsByTagName('tbody')[0];

// Fetch and display songs
const fetchSongs = async () => {
    const response = await fetch('/songs');
    const songs = await response.json();
    songTableBody.innerHTML = ''; // Clear existing rows
    songs.forEach(song => {
        const row = songTableBody.insertRow();
        row.innerHTML = `
            <td>${song.id}</td>
            <td>${song.title}</td>
            <td>${song.artist}</td>
            <td>${song.duration}</td>
            <td>
                <button onclick="deleteSong(${song.id})">Delete</button>
            </td>
        `;
    });
};

// Handle form submission
songForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const artist = document.getElementById('artist').value;
    const duration = document.getElementById('duration').value;

    await fetch('/songs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, artist, duration}),
    });

    songForm.reset();
    fetchSongs();
});

// Delete song
const deleteSong = async (id) => {
    await fetch(`/songs/${id}`, {
        method: 'DELETE',
    });

    fetchSongs();
};

// Initial fetch for songs
fetchSongs();

