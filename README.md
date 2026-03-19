# ConsoleLocked

Site estatico para catalogar jogos marcantes que continuam presos aos seus consoles originais.

## O que mudou na interface

- Hero inicial com identidade visual mais forte.
- Cards de destaque com metricas da colecao.
- Busca por texto em tempo real.
- Filtro por console.
- Tabela com visual mais moderno e responsivo.
- Ordenacao por coluna mantida.

## Estrutura do projeto

- `index.html`: estrutura principal da pagina.
- `style.css`: tema visual, layout responsivo e animacoes.
- `script.js`: carregamento dos dados, filtros, metricas e ordenacao.
- `games.json`: lista de jogos exibidos.

## Como executar localmente

> Observacao: sirva os arquivos por HTTP para o `fetch` funcionar corretamente.

```bash
python3 -m http.server 8000
```

Depois abra `http://localhost:8000`.
