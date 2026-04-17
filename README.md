# ConsoleLocked — Documentação

> Um catálogo minimalista de jogos marcantes que continuam presos aos seus consoles originais — sem ports, sem remasters, sem segunda chance.

🔗 **Acesse online:** [lapide66.github.io/ConsoleLocked](https://lapide66.github.io/ConsoleLocked/)

---

## Visão Geral

ConsoleLocked é uma aplicação web estática que cataloga jogos que, por razões técnicas, comerciais ou de licenciamento, nunca receberam versões para outras plataformas. O objetivo é preservar a memória desses títulos e facilitar a descoberta de joias esquecidas do mundo dos videogames.

Não há backend, banco de dados ou dependências externas. Tudo roda no navegador com HTML, CSS e JavaScript puro.

---

## Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| Busca em tempo real | Filtra por nome, console, descrição ou ano enquanto você digita |
| Filtro por console | Dropdown para exibir apenas jogos de um console específico |
| Ordenação por coluna | Clique em qualquer cabeçalho da tabela para ordenar crescente ou decrescente |
| Contador de resultados | Exibe quantos títulos correspondem aos filtros ativos |
| Layout responsivo | Funciona bem em desktop e mobile |
| Acessibilidade | Navegação por teclado, `aria-label`, `aria-sort` e indicadores visuais de ordenação |

---

## Como Rodar Localmente

Este projeto não precisa de build nem de instalação de dependências. Basta servir os arquivos por HTTP para que o `fetch` do `games.json` funcione corretamente.

### 1. Clonar o repositório

```bash
git clone https://github.com/lapide66/ConsoleLocked.git
cd ConsoleLocked
```

### 2. Iniciar um servidor local

**Python 3 (recomendado):**
```bash
python3 -m http.server 8000
```

**VS Code:** instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) e clique em "Go Live".

### 3. Abrir no navegador

| Método | URL |
|---|---|
| Python | `http://localhost:8000` |
| npx serve | `http://localhost:3000` |
| Live Server | `http://localhost:5500` |

> ⚠️ Abrir o `index.html` diretamente pelo navegador (protocolo `file://`) não funciona porque o `fetch` é bloqueado por restrições de segurança do browser.

---

## Estrutura do Projeto

```
ConsoleLocked/
├── index.html      # Estrutura da página: hero, filtros, tabela
├── style.css       # Tema visual, layout responsivo e animações
├── script.js       # Lógica de filtros, ordenação e renderização
├── games.json      # Dados do catálogo de jogos
├── docs/
│   └── README.md   # Este arquivo de documentação
└── release/        # Snapshots versionados (ignorado pelo git)
```

---

## Catálogo de Jogos

O catálogo é alimentado pelo `games.json`. Entradas exemplo (v1.0):

| Jogo | Console | Ano |
|---|---|---|
| Yoshi's Woolly World | Wii U | 2015 |
| Eternal Darkness: Sanity's Requiem | GameCube | 2002 |


### Como adicionar um jogo

Edite o `games.json` e adicione um novo objeto ao array:

```json
{
  "nome": "Nome do Jogo",
  "console": "Nome do Console",
  "ano": 2000,
  "descricao": "Uma breve descrição do jogo e por que ele é especial.",
  "imagem": ""
}
```

| Campo | Tipo | Descrição |
|---|---|---|
| `nome` | string | Título do jogo |
| `console` | string | Console original |
| `ano` | number | Ano de lançamento |
| `descricao` | string | Breve descrição |
| `imagem` | string | URL da imagem (opcional, não usado) |

O site atualiza automaticamente ao recarregar a página.

---

## Detalhes Técnicos

### Stack

- **HTML5** — marcação semântica (`<main>`, `<header>`, `<section>`, `<table>`)
- **CSS3** — variáveis customizadas (design tokens), CSS Grid, media queries, pseudo-elementos
- **JavaScript ES6+** — `fetch`, `Set`, arrow functions, template literals
- Sem frameworks, sem dependências, sem build step

### Arquitetura

O `script.js` mantém um objeto de estado simples:

```js
const state = {
  sortColumn: 'nome',
  sortDirection: 'asc',
  searchTerm: '',
  console: 'todos'
};
```

A cada interação do usuário (busca, filtro, ordenação), `renderTable()` re-renderiza o `<tbody>` a partir do array `gamesData` em memória, filtrado e ordenado conforme o `state`. O dropdown de consoles é populado dinamicamente a partir dos valores únicos de console no `games.json`.

### Acessibilidade

- Todos os elementos interativos são navegáveis por teclado
- Botões de ordenação usam `aria-pressed` e `aria-label` com o estado atual
- Cabeçalhos da tabela usam `aria-sort` (`ascending` / `descending` / `none`)
- O contador de resultados usa `aria-live="polite"` para anúncios em leitores de tela
- O layout mobile usa atributos `data-label` para exibir os nomes das colunas inline

### Comportamento Responsivo

Em telas `≤ 720px`, a tabela muda para um layout de blocos empilhados — cada linha vira um card e os cabeçalhos de coluna ficam ocultos. Os rótulos são injetados via CSS `::before` usando atributos `data-label` em cada `<td>`.

---

## Licença

Uso pessoal e educacional. Os nomes e títulos dos jogos pertencem aos seus respectivos detentores de direitos.
