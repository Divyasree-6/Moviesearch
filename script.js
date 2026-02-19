const API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your TMDB API key
const API_URL = 'YOUR_OMDB_API_KEY';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

// Sample movies data with actual movie posters
const sampleMovies = [
    { id: 1, title: 'RRR', genre: 'Action/Drama', year: '2022', rating: 8.0, poster: 'https://image.tmdb.org/t/p/w500/wE0I6efAW4cDDmZQWtwZMOW44EJ.jpg', type: 'movie' },
    { id: 2, title: 'Baahubali 2', genre: 'Action/Fantasy', year: '2017', rating: 8.2, poster: 'https://image.tmdb.org/t/p/w500/9HE9xiNmQiVWNsVorinQCFR1SiR.jpg', type: 'movie' },
    { id: 3, title: 'Pushpa', genre: 'Action/Thriller', year: '2021', rating: 7.6, poster: 'https://image.tmdb.org/t/p/w500/5TydDLLGm4b5OXWZMZZPhXSZEBr.jpg', type: 'movie' },
    { id: 4, title: 'Ala Vaikunthapurramuloo', genre: 'Action/Drama', year: '2020', rating: 7.3, poster: 'https://image.tmdb.org/t/p/w500/6IEJAZlJEKnfHVEqZu8P7OLdLLq.jpg', type: 'movie' },
    { id: 5, title: 'Sarileru Neekevvaru', genre: 'Action/Comedy', year: '2020', rating: 5.8, poster: 'https://image.tmdb.org/t/p/w500/hJBXc0jvZgenK4xvPYqJPCRP0hM.jpg', type: 'movie' },
    { id: 6, title: 'Sita Ramam', genre: 'Romance/Drama', year: '2022', rating: 8.6, poster: 'https://image.tmdb.org/t/p/w500/gL73h4dBxFJlvttD6RLlLbPjQRu.jpg', type: 'movie' },
    { id: 7, title: 'Eega', genre: 'Fantasy/Thriller', year: '2012', rating: 7.7, poster: 'https://image.tmdb.org/t/p/w500/lFSSLTlFozwpaGlO31OoUeirBgQ.jpg', type: 'movie' },
    { id: 8, title: 'Arjun Reddy', genre: 'Romance/Drama', year: '2017', rating: 8.1, poster: 'https://image.tmdb.org/t/p/w500/tUkY2KcwZXs0qLbHPsJPvYZnXdg.jpg', type: 'movie' },
    { id: 9, title: 'Rangasthalam', genre: 'Action/Drama', year: '2018', rating: 8.2, poster: 'https://image.tmdb.org/t/p/w500/jMJJz7vGCnMUZOVEHbJaAWPLHKS.jpg', type: 'movie' },
    { id: 10, title: 'Magadheera', genre: 'Action/Fantasy', year: '2009', rating: 7.7, poster: 'https://image.tmdb.org/t/p/w500/xvzwMZdDYqJlLLqYqXqYqYqYqYq.jpg', type: 'movie' },
    { id: 11, title: 'KGF Chapter 2', genre: 'Action/Drama', year: '2022', rating: 8.4, poster: 'https://image.tmdb.org/t/p/w500/xYBaLMqbTUHI1fxIFRWTyX2C6w5.jpg', type: 'movie' },
    { id: 12, title: 'Salaar', genre: 'Action/Thriller', year: '2023', rating: 7.2, poster: 'https://image.tmdb.org/t/p/w500/iqRODLjht9fvXZFXKnJj8KCFWKF.jpg', type: 'movie' },
    { id: 13, title: 'Dhootha', genre: 'Thriller/Mystery', year: '2023', rating: 7.5, poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', type: 'series' },
    { id: 14, title: 'Kota Factory', genre: 'Drama/Comedy', year: '2023', rating: 9.0, poster: 'https://image.tmdb.org/t/p/w500/yxXAWZJqYgEFaMpJWQody5Yx3Yz.jpg', type: 'series' },
    { id: 15, title: 'Panchayat', genre: 'Comedy/Drama', year: '2023', rating: 8.9, poster: 'https://image.tmdb.org/t/p/w500/4g41f0lHs0Mzb8TQXL0LdLkJlqL.jpg', type: 'series' },
    { id: 16, title: 'Farzi', genre: 'Crime/Thriller', year: '2023', rating: 8.1, poster: 'https://image.tmdb.org/t/p/w500/kQKcbDbjnPKZbVJfZ7LZZ7LZZ7L.jpg', type: 'series' },
    { id: 17, title: 'Mirzapur', genre: 'Crime/Action', year: '2023', rating: 8.5, poster: 'https://image.tmdb.org/t/p/w500/8ZYhuvLvMmW3SNlJFcqgLCnPNYG.jpg', type: 'series' },
    { id: 18, title: 'The Family Man', genre: 'Action/Thriller', year: '2023', rating: 8.7, poster: 'https://image.tmdb.org/t/p/w500/dMiNDHhPqxvqX8mKJJKKKKKKKKK.jpg', type: 'series' },
    { id: 19, title: 'Asur', genre: 'Crime/Thriller', year: '2023', rating: 8.4, poster: 'https://image.tmdb.org/t/p/w500/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg', type: 'series' },
    { id: 20, title: 'Paatal Lok', genre: 'Crime/Drama', year: '2023', rating: 7.9, poster: 'https://image.tmdb.org/t/p/w500/lqoMzCcZYEFK729d6qzt349fB4o.jpg', type: 'series' }
];

let currentFilter = 'all';
let favorites = new Set();
let currentPage = 1;
let allMovies = [...sampleMovies];

document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();
    renderMovies();
    setupEventListeners();
});

function setupEventListeners() {
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('sunToggle').addEventListener('click', toggleTheme);
    
    // Search
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            renderMovies();
        });
    });
    
    // Add filter
    document.getElementById('addFilterBtn').addEventListener('click', () => {
        const filter = prompt('Enter filter (movie/series/all):');
        if (filter) {
            alert(`Filter "${filter}" added!`);
        }
    });
    
    // Pagination
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderMovies();
            updatePagination();
        }
    });
    
    document.getElementById('nextBtn').addEventListener('click', () => {
        currentPage++;
        renderMovies();
        updatePagination();
    });
    
    document.querySelectorAll('.page-btn:not(#prevBtn):not(#nextBtn)').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            currentPage = parseInt(btn.textContent);
            document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderMovies();
        });
    });
}

function toggleTheme() {
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = sampleMovies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm)
    );
    allMovies = filtered;
    currentPage = 1;
    renderMovies();
}

function getFilteredMovies() {
    if (currentFilter === 'all') {
        return allMovies;
    }
    return allMovies.filter(movie => movie.type === currentFilter);
}

function renderMovies() {
    const grid = document.getElementById('moviesGrid');
    const movies = getFilteredMovies();
    
    grid.innerHTML = '';
    
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        
        const isFavorite = favorites.has(movie.id);
        
        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster" onerror="this.src='https://via.placeholder.com/500x750?text=No+Image'">
            <div class="movie-info">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-meta">
                    <span class="movie-genre">${movie.genre}</span>
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${movie.id}">
                        <svg viewBox="0 0 24 24" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                </div>
                <div class="movie-rating">
                    <div class="stars">
                        ${generateStars(movie.rating)}
                    </div>
                    <span class="imdb-badge">IMDb</span>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
    
    // Add event listeners to favorite buttons
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            toggleFavorite(id);
            btn.classList.toggle('active');
            const svg = btn.querySelector('svg');
            svg.setAttribute('fill', btn.classList.contains('active') ? 'currentColor' : 'none');
        });
    });
    
    // Add click event to cards
    document.querySelectorAll('.movie-card').forEach((card, index) => {
        card.addEventListener('click', () => {
            const movie = movies[index];
            showMovieDetails(movie);
        });
    });
}

function generateStars(rating) {
    const stars = Math.round(rating / 2);
    let html = '';
    for (let i = 0; i < 5; i++) {
        html += `<span class="star">${i < stars ? '★' : '☆'}</span>`;
    }
    return html;
}

function toggleFavorite(id) {
    if (favorites.has(id)) {
        favorites.delete(id);
    } else {
        favorites.add(id);
    }
    saveFavorites();
}

function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify([...favorites]));
}

function loadFavorites() {
    const saved = localStorage.getItem('favorites');
    if (saved) {
        favorites = new Set(JSON.parse(saved));
    }
}

function showMovieDetails(movie) {
    alert(`${movie.title}\n\nGenre: ${movie.genre}\nYear: ${movie.year}\nRating: ${movie.rating}/10`);
}

function updatePagination() {
    document.querySelectorAll('.page-btn:not(#prevBtn):not(#nextBtn)').forEach((btn, index) => {
        btn.classList.remove('active');
        if (parseInt(btn.textContent) === currentPage) {
            btn.classList.add('active');
        }
    });
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light');
}
