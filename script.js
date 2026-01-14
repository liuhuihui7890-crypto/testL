document.addEventListener('DOMContentLoaded', () => {
    const gameForm = document.getElementById('game-form');
    const gameNameInput = document.getElementById('game-name');
    const gamePlatformInput = document.getElementById('game-platform');
    const gamesList = document.getElementById('games');

    // 从localStorage加载游戏数据，如果不存在则使用默认数据
    let games = JSON.parse(localStorage.getItem('games')) || [
        { name: '王者荣耀', platform: '手机' },
        { name: '英雄联盟', platform: '网页' },
    ];

    // 保存游戏数据到localStorage
    function saveGames() {
        localStorage.setItem('games', JSON.stringify(games));
    }

    function renderGames() {
        gamesList.innerHTML = '';
        games.forEach((game, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${game.name} - ${game.platform}</span>
                <div>
                    <button class="edit" data-index="${index}">编辑</button>
                    <button class="delete" data-index="${index}">删除</button>
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
            renderGames();
        } else if (e.target.classList.contains('edit')) {
            const index = e.target.dataset.index;
            const game = games[index];
            const newName = prompt('输入新的游戏名称:', game.name);
            const newPlatform = prompt('输入新的平台:', game.platform);
            if (newName && newPlatform) {
                games[index] = { name: newName, platform: newPlatform };
                saveGames();
                renderGames();
            }
        }
    });

    renderGames();
});