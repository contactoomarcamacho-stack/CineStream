let allMovies = [];

// Función para cargar los datos del JSON que subiste
async function loadMovies() {
    try {
        const response = await fetch('player_api.json');
        allMovies = await response.json();
        renderMovies(allMovies);
    } catch (error) {
        document.getElementById('movieGrid').innerHTML = '<p>Error al cargar el archivo JSON. Asegúrate de que player_api.json esté en la misma carpeta.</p>';
    }
}

function renderMovies(movies) {
    const grid = document.getElementById('movieGrid');
    grid.innerHTML = '';

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="${movie.stream_icon || 'https://via.placeholder.com/200x300?text=No+Image'}" alt="${movie.name}">
            <div class="info">
                <h3>${movie.name}</h3>
                <small>⭐ ${movie.rating || 'N/A'}</small>
            </div>
        `;
        card.onclick = () => openPlayer(movie);
        grid.appendChild(card);
    });
}

function openPlayer(movie) {
    const modal = document.getElementById('playerModal');
    document.getElementById('movieTitle').innerText = movie.name;
    document.getElementById('movieRating').innerText = `Rating: ${movie.rating}`;
    document.getElementById('movieExt').innerText = `Formato: ${movie.container_extension}`;
    document.getElementById('streamInfo').innerText = `Source ID: ${movie.stream_id}`;
    
    modal.style.display = 'block';
}

// Lógica de búsqueda
document.getElementById('searchBar').oninput = (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allMovies.filter(m => m.name.toLowerCase().includes(term));
    renderMovies(filtered);
};

// Cerrar el modal
document.querySelector('.close-btn').onclick = () => {
    document.getElementById('playerModal').style.display = 'none';
};

window.onclick = (event) => {
    if (event.target == document.getElementById('playerModal')) {
        document.getElementById('playerModal').style.display = 'none';
    }
};

// Iniciar aplicación
loadMovies();
