# ConsoleLocked

![Version](https://img.shields.io/badge/version-1.0-blue)

> Um catálogo minimalista de jogos marcantes que continuam presos aos seus consoles originais — sem ports, sem remasters, sem segunda chance.

🔗 **Acesse online:** [lapide66.github.io/ConsoleLocked](https://lapide66.github.io/ConsoleLocked/)

---

## Sobre o projeto

ConsoleLocked é um site estático que cataloga jogos que, por razões técnicas, comerciais ou de licenciamento, nunca receberam versões para outras plataformas. O objetivo é preservar a memória desses títulos e facilitar a descoberta de joias esquecidas do mundo dos videogames.

Não há backend, banco de dados ou dependências externas. Tudo roda no navegador com HTML, CSS e JavaScript puro.

---

## Funcionalidades

- **Busca em tempo real** — filtra por nome, console, descrição ou ano enquanto você digita
- **Filtro por console** — selecione um console específico para ver apenas seus jogos
- **Ordenação por coluna** — clique nos cabeçalhos da tabela para ordenar por qualquer campo (A-Z ou Z-A)
- **Contador de resultados** — exibe quantos títulos estão visíveis com os filtros ativos
- **Layout responsivo** — funciona bem em desktop e mobile
- **Acessibilidade** — navegação por teclado, `aria-label`, `aria-sort` e indicadores visuais de ordenação

---

## Estrutura do projeto

```
ConsoleLocked/
├── index.html    # Estrutura da página (hero, filtros, tabela)
├── style.css     # Tema visual, layout responsivo e animações
├── script.js     # Lógica de filtros, ordenação e renderização
└── games.json    # Lista de jogos exibidos no catálogo
```

### `games.json` — formato de um jogo

```json
{
  "nome": "Bloodborne",
  "console": "PlayStation 4",
  "ano": 2015,
  "descricao": "RPG de ação com atmosfera gótica e combates intensos.",
  "imagem": ""
}
```

| Campo      | Tipo   | Descrição                                      |
|------------|--------|------------------------------------------------|
| `nome`     | string | Título do jogo                                 |
| `console`  | string | Console original onde o jogo foi lançado       |
| `ano`      | number | Ano de lançamento                              |
| `descricao`| string | Breve descrição do jogo                        |
| `imagem`   | string | URL da imagem (opcional, não usado atualmente) |

---

## Como rodar localmente

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

**Node.js com `serve`:**
```bash
npx serve .
```

**VS Code:** instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) e clique em "Go Live".

### 3. Abrir no navegador

| Método     | URL                        |
|------------|----------------------------|
| Python     | `http://localhost:8000`    |
| npx serve  | `http://localhost:3000`    |
| Live Server| `http://localhost:5500`    |

### 4. Encerrar o servidor

Pressione `Ctrl + C` no terminal onde o servidor está rodando.

> ⚠️ Abrir o `index.html` diretamente pelo navegador (protocolo `file://`) não funciona porque o `fetch` é bloqueado por restrições de segurança do browser.

---

## Como adicionar um jogo

Edite o arquivo `games.json` e adicione um novo objeto ao array seguindo o formato acima. O site atualiza automaticamente ao recarregar a página.

```json
{
  "nome": "Nome do Jogo",
  "console": "Nome do Console",
  "ano": 2000,
  "descricao": "Uma breve descrição do jogo e por que ele é especial.",
  "imagem": ""
}
```

---

## Tecnologias

- HTML5 semântico
- CSS3 (variáveis, grid, media queries, pseudo-elementos)
- JavaScript ES6+ (fetch, Set, arrow functions, template literals)
- Sem frameworks, sem dependências, sem build step

---

## Deploy

O projeto é publicado automaticamente via **GitHub Pages** a partir da branch `main`. Qualquer push para `main` atualiza o site em alguns segundos.

Para habilitar o GitHub Pages no seu fork:
1. Vá em **Settings → Pages**
2. Em "Source", selecione a branch `main` e a pasta `/ (root)`
3. Clique em **Save**

---

## Licença

Este projeto é de uso pessoal e educacional. Os nomes e títulos dos jogos pertencem aos seus respectivos detentores de direitos.

---

## Version History

| Version | Date | Type | Description |
|---------|------|------|-------------|
| v1.0 | 2025-07-14 | docs | Adds project documentation (`docs/README.md`) and release snapshot |
