# ConsoleLocked

Site estatico para catalogar jogos marcantes que continuam presos aos seus consoles originais.

## GitHub Pages

A versao publicada no GitHub Pages pode ser acessada em:

- https://consolelocked.github.io/ConsoleLocked/

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

## Como subir o projeto localmente (apos clonar o repositorio)

Este projeto nao precisa de build nem de instalacao de dependencias. Basta servir os arquivos estaticos por HTTP para o `fetch` do `games.json` funcionar.

### 1) Clonar o repositorio

```bash
git clone <URL_DO_REPOSITORIO>
cd ConsoleLocked
```

### 2) Iniciar um servidor local

Opcao recomendada (Python 3):

```bash
python3 -m http.server 8000
```

Opcao alternativa (Node.js com `serve`):

```bash
npx serve .
```

### 3) Abrir no navegador

- Se usou Python: `http://localhost:8000`
- Se usou `npx serve`: use a URL exibida no terminal (geralmente `http://localhost:3000`)

### 4) Encerrar o servidor

No terminal onde o servidor esta rodando, pressione `Ctrl + C`.
