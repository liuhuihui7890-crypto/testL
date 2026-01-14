document.addEventListener('DOMContentLoaded', () => {
    const gameForm = document.getElementById('game-form');
    const gameNameInput = document.getElementById('game-name');
    const gamePlatformInput = document.getElementById('game-platform');
    const gamesList = document.getElementById('games');
    const searchBox = document.getElementById('search-box');

    let games = JSON.parse(localStorage.getItem('games')) || [
        { name: '王者荣耀', platform: '手机' },
        { name: '英雄联盟', platform: '网页' },
    ];

    function saveGames() {
        localStorage.setItem('games', JSON.stringify(games));
    }

    function renderGames(filter = '') {
        gamesList.innerHTML = '';
        const filteredGames = games.filter(game => 
            game.name.toLowerCase().includes(filter.toLowerCase()) || 
            game.platform.toLowerCase().includes(filter.toLowerCase())
        );

        filteredGames.forEach((game, index) => {
            const originalIndex = games.findIndex(g => g.name === game.name && g.platform === game.platform);
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${game.name} - ${game.platform}</span>
                <div>
                    <button class="edit" data-index="${originalIndex}">编辑</button>
                    <button class="delete" data-index="${originalIndex}">删除</button>
                </div>
            `;
            gamesList.appendChild(li);
        });
    }

    gameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newGame = {
            name: gameNameInput.value,
            platform: gamePlatformInput.value,
        };
        games.push(newGame);
        saveGames();
        renderGames();
        gameForm.reset();
    });

    gamesList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const index = e.target.dataset.index;
            games.splice(index, 1);
            saveGames();
            renderGames(searchBox.value);
        } else if (e.target.classList.contains('edit')) {
            const index = e.target.dataset.index;
            const game = games[index];
            const newName = prompt('输入新的游戏名称:', game.name);
            const newPlatform = prompt('输入新的平台:', game.platform);
            if (newName && newPlatform) {
                games[index] = { name: newName, platform: newPlatform };
                saveGames();
                renderGames(searchBox.value);
            }
        }
    });

    searchBox.addEventListener('input', (e) => {
        renderGames(e.target.value);
    });

    renderGames();
});