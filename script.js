// Espera o HTML da página ser completamente carregado para executar o código
document.addEventListener('DOMContentLoaded', () => {

    const gameListContainer = document.getElementById('game-list');
    const filterContainer = document.getElementById('console-filters');

    const normalizeConsoleName = (consoleName) => consoleName.trim();
    const setActiveFilter = (activeButton) => {
        const buttons = filterContainer.querySelectorAll('.filter-button');
        buttons.forEach(button => {
            button.classList.toggle('is-active', button === activeButton);
        });
    };

    const renderGames = (games) => {
        gameListContainer.innerHTML = '';

        if (games.length === 0) {
            gameListContainer.innerHTML = '<p>Nenhum jogo encontrado para este console.</p>';
            return;
        }

        games.forEach(game => {
            const card = document.createElement('div');
            card.className = 'game-card';

            card.innerHTML = `
                <h2>${game.nome}</h2>
                <p class="console">Preso no: <strong>${game.console}</strong></p>
                <p class="description">${game.descricao}</p>
            `;

            gameListContainer.appendChild(card);
        });
    };

    const renderFilters = (games, onFilter) => {
        const consoles = Array.from(new Set(games.map(game => normalizeConsoleName(game.console)))).sort();
        const allConsoles = ['Todos', ...consoles];

        filterContainer.innerHTML = '';
        allConsoles.forEach((consoleName, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'filter-button';
            button.textContent = consoleName;
            if (index === 0) {
                button.classList.add('is-active');
            }
            button.addEventListener('click', () => {
                setActiveFilter(button);
                onFilter(consoleName);
            });
            filterContainer.appendChild(button);
        });
    };

    // A função fetch() busca nosso arquivo JSON. É a maneira moderna de fazer requisições web.
    fetch('games.json')
        .then(response => {
            // Quando a resposta chegar, verificamos se deu tudo certo
            if (!response.ok) {
                throw new Error('Não foi possível carregar o arquivo de jogos.');
            }
            // Convertemos a resposta em formato JSON para que o JavaScript possa usar
            return response.json();
        })
        .then(games => {
            const normalizedGames = games.map(game => ({
                ...game,
                console: normalizeConsoleName(game.console)
            }));

            renderGames(normalizedGames);
            renderFilters(normalizedGames, (selectedConsole) => {
                if (selectedConsole === 'Todos') {
                    renderGames(normalizedGames);
                    return;
                }

                const filtered = normalizedGames.filter(game => game.console === selectedConsole);
                renderGames(filtered);
            });
        })
        .catch(error => {
            // Se algo der errado (ex: arquivo não encontrado), mostramos um erro no console
            console.error('Erro ao buscar os jogos:', error);
            gameListContainer.innerHTML = '<p>Não foi possível carregar a lista de jogos. Tente novamente mais tarde.</p>';
        });
});
