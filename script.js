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

            // Para cada jogo na nossa lista, criamos um card no HTML
            games.forEach(game => {
                const card = document.createElement('div');
                card.className = 'game-card'; // Adiciona a classe CSS para estilização

                // Usamos template literals (crases ``) para construir o HTML do card facilmente
                card.innerHTML = `
                    <h2>${game.nome}</h2>
                    <p class="console">Preso no: <strong>${game.console}</strong></p>
                    <p class="description">${game.descricao}</p>
                `;

                // Adicionamos o card recém-criado dentro do nosso container no HTML
                gameListContainer.appendChild(card);
            });
        })
        .catch(error => {
            // Se algo der errado (ex: arquivo não encontrado), mostramos um erro no console
            console.error('Erro ao buscar os jogos:', error);
            gameListContainer.innerHTML = '<p>Não foi possível carregar a lista de jogos. Tente novamente mais tarde.</p>';
        });
});