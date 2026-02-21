const API_KEY = 'YOUR_TMDB_API_KEY';
const API_URL = 'YOUR_OMDB_API_KEY';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const sampleMovies = [
    { id: 1, title: 'RRR', genre: 'Action/Drama', year: '2022', rating: 8.0, poster: 'https://img.omdbapi.com/?i=tt8178634&h=450&apikey=1', type: 'movie' },
    { id: 2, title: 'Baahubali 2', genre: 'Action/Fantasy', year: '2017', rating: 8.2, poster: 'https://img.omdbapi.com/?i=tt4849438&h=450&apikey=1', type: 'movie' },
    { id: 3, title: 'Pushpa', genre: 'Action/Thriller', year: '2021', rating: 7.6, poster: 'https://img.omdbapi.com/?i=tt9389998&h=450&apikey=1', type: 'movie' },
    { id: 4, title: 'Ala Vaikunthapurramuloo', genre: 'Action/Drama', year: '2020', rating: 7.3, poster: 'https://img.omdbapi.com/?i=tt10189514&h=450&apikey=1', type: 'movie' },
    { id: 5, title: 'Sarileru Neekevvaru', genre: 'Action/Comedy', year: '2020', rating: 5.8, poster: 'https://img.omdbapi.com/?i=tt9389998&h=450&apikey=1', type: 'movie' },
    { id: 6, title: 'Sita Ramam', genre: 'Romance/Drama', year: '2022', rating: 8.6, poster: 'https://img.omdbapi.com/?i=tt15097216&h=450&apikey=1', type: 'movie' },
    { id: 7, title: 'Eega', genre: 'Fantasy/Thriller', year: '2012', rating: 7.7, poster: 'https://img.omdbapi.com/?i=tt2258337&h=450&apikey=1', type: 'movie' },
    { id: 8, title: 'Arjun Reddy', genre: 'Romance/Drama', year: '2017', rating: 8.1, poster: 'https://img.omdbapi.com/?i=tt7294534&h=450&apikey=1', type: 'movie' },
    { id: 9, title: 'Rangasthalam', genre: 'Action/Drama', year: '2018', rating: 8.2, poster: 'https://img.omdbapi.com/?i=tt7019842&h=450&apikey=1', type: 'movie' },
    { id: 10, title: 'Magadheera', genre: 'Action/Fantasy', year: '2009', rating: 7.7, poster: 'https://img.omdbapi.com/?i=tt1447500&h=450&apikey=1', type: 'movie' },
    { id: 11, title: 'KGF Chapter 2', genre: 'Action/Drama', year: '2022', rating: 8.4, poster: 'https://img.omdbapi.com/?i=tt10698680&h=450&apikey=1', type: 'movie' },
    { id: 12, title: 'Salaar', genre: 'Action/Thriller', year: '2023', rating: 7.2, poster: 'https://img.omdbapi.com/?i=tt12735488&h=450&apikey=1', type: 'movie' },
    { id: 13, title: 'Dhootha', genre: 'Thriller/Mystery', year: '2023', rating: 7.5, poster: 'https://img.omdbapi.com/?i=tt27688034&h=450&apikey=1', type: 'series' },
    { id: 14, title: 'Kota Factory', genre: 'Drama/Comedy', year: '2023', rating: 9.0, poster: 'https://img.omdbapi.com/?i=tt9432978&h=450&apikey=1', type: 'series' },
    { id: 15, title: 'Panchayat', genre: 'Comedy/Drama', year: '2023', rating: 8.9, poster: 'https://img.omdbapi.com/?i=tt10199590&h=450&apikey=1', type: 'series' },
    { id: 16, title: 'Farzi', genre: 'Crime/Thriller', year: '2023', rating: 8.1, poster: 'https://img.omdbapi.com/?i=tt11464826&h=450&apikey=1', type: 'series' },
    { id: 17, title: 'Mirzapur', genre: 'Crime/Action', year: '2023', rating: 8.5, poster: 'https://img.omdbapi.com/?i=tt6473300&h=450&apikey=1', type: 'series' },
    { id: 18, title: 'The Family Man', genre: 'Action/Thriller', year: '2023', rating: 8.7, poster: 'https://img.omdbapi.com/?i=tt9544034&h=450&apikey=1', type: 'series' },
    { id: 19, title: 'Asur', genre: 'Crime/Thriller', year: '2023', rating: 8.4, poster: 'https://img.omdbapi.com/?i=tt9750652&h=450&apikey=1', type: 'series' },
    { id: 20, title: 'Paatal Lok', genre: 'Crime/Drama', year: '2023', rating: 7.9, poster: 'https://img.omdbapi.com/?i=tt9680136&h=450&apikey=1', type: 'series' }
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
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            renderMovies();
        });
    });
    
    document.getElementById('addFilterBtn').addEventListener('click', () => {
        const filter = prompt('Enter filter (movie/series/all):');
        if (filter) alert(`Filter "${filter}" added!`);
    });
    
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
    
    document.querySelectorAll('.page-btn:not(#prevBtn):not(#nextBtn)').forEach((btn) => {
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
    const moonIcon = document.querySelector('.moon-icon');
    const sunIcon = document.querySelector('.sun-icon');
    
    if (document.body.classList.contains('light')) {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }
    
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = sampleMovies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
    allMovies = filtered;
    currentPage = 1;
    renderMovies();
}

function getFilteredMovies() {
    if (currentFilter === 'all') return allMovies;
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
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster" loading="lazy">
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
                    <div class="stars">${generateStars(movie.rating)}</div>
                    <span class="imdb-badge">IMDb</span>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
    
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
    if (saved) favorites = new Set(JSON.parse(saved));
}

function showMovieDetails(movie) {
    alert(`${movie.title}\n\nGenre: ${movie.genre}\nYear: ${movie.year}\nRating: ${movie.rating}/10`);
}

function updatePagination() {
    document.querySelectorAll('.page-btn:not(#prevBtn):not(#nextBtn)').forEach((btn) => {
        btn.classList.remove('active');
        if (parseInt(btn.textContent) === currentPage) {
            btn.classList.add('active');
        }
    });
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light');
    document.querySelector('.moon-icon').style.display = 'none';
    document.querySelector('.sun-icon').style.display = 'block';
}
