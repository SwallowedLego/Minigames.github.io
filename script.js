// Main JavaScript for MinPlay website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the website
    initializeFiltering();
    initializeSearch();
    updateGameCount();
    
    // Add smooth scrolling and animations
    addSmoothScrolling();
});

// Game filtering functionality
function initializeFiltering() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const gameCards = document.querySelectorAll('.game-card');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter games
            filterGames(category);
        });
    });
}

function filterGames(category) {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        const cardCategory = card.dataset.category;
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
            card.classList.remove('fade-in');
        }
    });
    
    updateGameCount();
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        searchGames(searchTerm);
    });
}

function searchGames(searchTerm) {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        const gameName = card.dataset.name.toLowerCase();
        const gameTitle = card.querySelector('.game-title').textContent.toLowerCase();
        const gameDescription = card.querySelector('.game-description').textContent.toLowerCase();
        
        if (gameName.includes(searchTerm) || 
            gameTitle.includes(searchTerm) || 
            gameDescription.includes(searchTerm)) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
            card.classList.remove('fade-in');
        }
    });
    
    updateGameCount();
}

// Update game count
function updateGameCount() {
    const visibleGames = document.querySelectorAll('.game-card:not([style*="display: none"])');
    const gameCountElement = document.getElementById('gameCount');
    const count = visibleGames.length;
    
    gameCountElement.textContent = `${count} Game${count !== 1 ? 's' : ''} Available`;
}

// Smooth scrolling
function addSmoothScrolling() {
    // Add smooth scroll behavior to any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key to clear search
    if (e.key === 'Escape') {
        const searchInput = document.getElementById('searchInput');
        searchInput.value = '';
        searchGames('');
    }
    
    // Enter key on search to focus first game
    if (e.key === 'Enter' && document.activeElement === document.getElementById('searchInput')) {
        const firstVisibleGame = document.querySelector('.game-card:not([style*="display: none"]) .play-btn');
        if (firstVisibleGame) {
            firstVisibleGame.focus();
        }
    }
});

// Add some interactive effects
function addInteractiveEffects() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        // Add click handler for the entire card
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('play-btn')) {
                const playBtn = this.querySelector('.play-btn');
                if (playBtn) {
                    playBtn.click();
                }
            }
        });
        
        // Add keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const playBtn = this.querySelector('.play-btn');
                if (playBtn) {
                    playBtn.click();
                }
            }
        });
    });
}

// Initialize interactive effects after DOM is ready
document.addEventListener('DOMContentLoaded', addInteractiveEffects);

// Utility function to add new games dynamically
function addGameCard(gameData) {
    const gamesGrid = document.getElementById('gamesGrid');
    const gameCard = document.createElement('div');
    gameCard.className = 'game-card fade-in';
    gameCard.dataset.category = gameData.category;
    gameCard.dataset.name = gameData.name.toLowerCase();
    
    gameCard.innerHTML = `
        <div class="game-thumbnail ${gameData.backgroundClass}">
            <div class="game-overlay">
                <button class="play-btn" onclick="location.href='${gameData.url}'">▶ Play</button>
            </div>
        </div>
        <div class="game-info">
            <h3 class="game-title">${gameData.name}</h3>
            <p class="game-description">${gameData.description}</p>
            <div class="game-tags">
                ${gameData.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    gamesGrid.appendChild(gameCard);
    updateGameCount();
    addInteractiveEffects();
}

// Export functions for use in other files
window.MinPlay = {
    addGameCard,
    filterGames,
    searchGames,
    updateGameCount
};