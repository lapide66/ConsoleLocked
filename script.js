// Espera o HTML da página ser completamente carregado para executar o código
document.addEventListener('DOMContentLoaded', () => {

    const gameListContainer = document.getElementById('game-list');

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
            // Agora que temos a lista de jogos, limpamos qualquer conteúdo que já estivesse lá
            gameListContainer.innerHTML = '';

            // Para cada jogo na nossa lista, criamos uma linha na tabela
            games.forEach(game => {
                const row = document.createElement('tr');

                // Usamos template literals (crases ``) para construir o HTML da linha facilmente
                row.innerHTML = `
                    <td>${game.nome}</td>
                    <td><strong>${game.console}</strong></td>
                    <td>${game.descricao}</td>
                `;

                // Adicionamos a linha recém-criada dentro do corpo da tabela
                gameListContainer.appendChild(row);
            });
        })
        .catch(error => {
            // Se algo der errado (ex: arquivo não encontrado), mostramos um erro no console
            console.error('Erro ao buscar os jogos:', error);
            gameListContainer.innerHTML = `
                <tr>
                    <td colspan="3">Não foi possível carregar a lista de jogos. Tente novamente mais tarde.</td>
                </tr>
            `;
        });
});
