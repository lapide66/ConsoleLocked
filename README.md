# ConsoleLocked

Um site estático para listar jogos presos em seus consoles originais.

## Estrutura do projeto

- `index.html`: página principal.
- `style.css`: estilos do site.
- `script.js`: busca os dados em JSON e renderiza as linhas da tabela.
- `games.json`: lista de jogos exibidos.

## Ordenação

A tabela permite ordenar os jogos clicando nos cabeçalhos. Cada clique alterna entre ordem alfabética de A-Z e Z-A para a coluna selecionada.

## Como executar localmente

> Observação: é recomendado servir os arquivos via HTTP para que o `fetch` funcione corretamente.

```bash
python3 -m http.server 8000
```

Abra `http://localhost:8000` no navegador.
