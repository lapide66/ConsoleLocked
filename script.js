// Espera o HTML da página ser completamente carregado para executar o código
document.addEventListener('DOMContentLoaded', () => {

    const gameListContainer = document.getElementById('game-list');
    const sortButtons = document.querySelectorAll('.sort-button');
    const sortState = {
        column: 'nome',
        direction: 'asc'
    };
    let gamesData = [];

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
            gamesData = games;
            updateSortIndicators();
            renderTable();
        })
        .catch(error => {
            // Se algo der errado (ex: arquivo não encontrado), mostramos um erro no console
            console.error('Erro ao buscar os jogos:', error);
            gameListContainer.innerHTML = `
                <tr>
                    <td colspan="4">Não foi possível carregar a lista de jogos. Tente novamente mais tarde.</td>
                </tr>
            `;
        });

    sortButtons.forEach(button => {
        button.addEventListener('click', () => {
            const column = button.dataset.column;
            if (sortState.column === column) {
                sortState.direction = sortState.direction === 'asc' ? 'desc' : 'asc';
            } else {
                sortState.column = column;
                sortState.direction = 'asc';
            }
            updateSortIndicators();
            renderTable();
        });
    });

    function renderTable() {
        // Agora que temos a lista de jogos, limpamos qualquer conteúdo que já estivesse lá
        gameListContainer.innerHTML = '';

        const sortedGames = [...gamesData].sort((a, b) => {
            const valueA = a[sortState.column] ?? '';
            const valueB = b[sortState.column] ?? '';
            const directionMultiplier = sortState.direction === 'asc' ? 1 : -1;

            if (sortState.column === 'ano') {
                return (Number(valueA) - Number(valueB)) * directionMultiplier;
            }

            const normalizedA = valueA.toString().toLowerCase();
            const normalizedB = valueB.toString().toLowerCase();

            if (normalizedA < normalizedB) {
                return -1 * directionMultiplier;
            }
            if (normalizedA > normalizedB) {
                return 1 * directionMultiplier;
            }
            return 0;
        });

        // Para cada jogo na nossa lista, criamos uma linha na tabela
        sortedGames.forEach(game => {
            const row = document.createElement('tr');

            // Usamos template literals (crases ``) para construir o HTML da linha facilmente
            row.innerHTML = `
                <td>${game.nome}</td>
                <td><strong>${game.console}</strong></td>
                <td>${game.descricao}</td>
                <td>${game.ano}</td>
            `;

            // Adicionamos a linha recém-criada dentro do corpo da tabela
            gameListContainer.appendChild(row);
        });
    }

    function updateSortIndicators() {
        sortButtons.forEach(button => {
            const isActive = button.dataset.column === sortState.column;
            const headerCell = button.closest('th');
            button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            button.setAttribute(
                'aria-label',
                isActive
                    ? `Ordenado por ${button.textContent.trim()} (${sortState.direction === 'asc' ? 'A-Z' : 'Z-A'})`
                    : `Ordenar por ${button.textContent.trim()}`
            );
            button.classList.toggle('is-active', isActive);
            button.dataset.direction = isActive ? sortState.direction : '';
            if (headerCell) {
                headerCell.setAttribute('aria-sort', isActive ? (sortState.direction === 'asc' ? 'ascending' : 'descending') : 'none');
            }
        });
    }
});
