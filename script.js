document.addEventListener('DOMContentLoaded', () => {
    const gameForm = document.getElementById('game-form');
    const gameNameInput = document.getElementById('game-name');
    const gamePlatformInput = document.getElementById('game-platform');
    const gamesList = document.getElementById('games');

    let games = [
        { name: '王者荣耀', platform: '手机' },
        { name: '英雄联盟', platform: '网页' },
    ];

    function renderGames() {
        gamesList.innerHTML = '';
        games.forEach((game, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${game.name} - ${game.platform}</span>
                <button data-index="${index}">删除</button>
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
        renderGames();
        gameForm.reset();
    });

    gamesList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const index = e.target.dataset.index;
            games.splice(index, 1);
            renderGames();
        }
    });

    renderGames();
});