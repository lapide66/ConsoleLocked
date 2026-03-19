document.addEventListener('DOMContentLoaded', () => {
    const gameListContainer = document.getElementById('game-list');
    const sortButtons = document.querySelectorAll('.sort-button');
    const searchInput = document.getElementById('search-input');
    const consoleFilter = document.getElementById('console-filter');
    const resultsCount = document.getElementById('results-count');

    const state = {
        sortColumn: 'nome',
        sortDirection: 'asc',
        searchTerm: '',
        console: 'todos'
    };

    let gamesData = [];

    fetch('games.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Nao foi possivel carregar o arquivo de jogos.');
            }

            return response.json();
        })
        .then(games => {
            gamesData = games;
            populateConsoleFilter(gamesData);
            updateSortIndicators();
            renderTable();
        })
        .catch(error => {
            console.error('Erro ao buscar os jogos:', error);
            gameListContainer.innerHTML = `
                <tr>
                    <td colspan="4">Nao foi possivel carregar a lista de jogos.</td>
                </tr>
            `;
        });

    sortButtons.forEach(button => {
        button.addEventListener('click', () => {
            const column = button.dataset.column;

            if (state.sortColumn === column) {
                state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                state.sortColumn = column;
                state.sortDirection = 'asc';
            }

            updateSortIndicators();
            renderTable();
        });
    });

    searchInput.addEventListener('input', event => {
        state.searchTerm = event.target.value.trim().toLowerCase();
        renderTable();
    });

    consoleFilter.addEventListener('change', event => {
        state.console = event.target.value;
        renderTable();
    });

    function populateConsoleFilter(games) {
        const consoles = [...new Set(games.map(game => game.console))].sort((a, b) => a.localeCompare(b, 'pt-BR'));

        consoles.forEach(consoleName => {
            const option = document.createElement('option');
            option.value = consoleName;
            option.textContent = consoleName;
            consoleFilter.appendChild(option);
        });
    }

    function getVisibleGames() {
        const filteredGames = gamesData.filter(game => {
            const matchesConsole = state.console === 'todos' || game.console === state.console;
            const searchBase = `${game.nome} ${game.console} ${game.descricao} ${game.ano}`.toLowerCase();
            const matchesSearch = !state.searchTerm || searchBase.includes(state.searchTerm);

            return matchesConsole && matchesSearch;
        });

        return filteredGames.sort((a, b) => {
            const valueA = a[state.sortColumn] ?? '';
            const valueB = b[state.sortColumn] ?? '';
            const directionMultiplier = state.sortDirection === 'asc' ? 1 : -1;

            if (state.sortColumn === 'ano') {
                return (Number(valueA) - Number(valueB)) * directionMultiplier;
            }

            return valueA.toString().localeCompare(valueB.toString(), 'pt-BR', { sensitivity: 'base' }) * directionMultiplier;
        });
    }

    function renderTable() {
        const visibleGames = getVisibleGames();

        resultsCount.textContent = `${visibleGames.length} ${visibleGames.length === 1 ? 'titulo' : 'titulos'}`;
        gameListContainer.innerHTML = '';

        if (!visibleGames.length) {
            gameListContainer.innerHTML = `
                <tr>
                    <td colspan="4">Nenhum jogo encontrado.</td>
                </tr>
            `;
            return;
        }

        visibleGames.forEach(game => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${game.nome}</td>
                <td><span class="console-pill">${game.console}</span></td>
                <td>${game.descricao}</td>
                <td>${game.ano}</td>
            `;
            gameListContainer.appendChild(row);
        });
    }

    function updateSortIndicators() {
        sortButtons.forEach(button => {
            const isActive = button.dataset.column === state.sortColumn;
            const headerCell = button.closest('th');
            const label = button.childNodes[0]?.textContent?.trim() || button.textContent.trim();

            button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            button.setAttribute(
                'aria-label',
                isActive
                    ? `Ordenado por ${label} (${state.sortDirection === 'asc' ? 'A-Z' : 'Z-A'})`
                    : `Ordenar por ${label}`
            );
            button.classList.toggle('is-active', isActive);
            button.dataset.direction = isActive ? state.sortDirection : '';

            if (headerCell) {
                headerCell.setAttribute('aria-sort', isActive ? (state.sortDirection === 'asc' ? 'ascending' : 'descending') : 'none');
            }
        });
    }
});
