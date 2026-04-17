# ConsoleLocked — Documentation

> A minimalist catalog of remarkable games forever locked to their original consoles — no ports, no remasters, no second chances.

🔗 **Live site:** [lapide66.github.io/ConsoleLocked](https://lapide66.github.io/ConsoleLocked/)

---

## Project Overview

ConsoleLocked is a static web application that catalogs video games which, due to technical, commercial, or licensing reasons, never received versions on other platforms. The goal is to preserve the memory of these titles and make it easier to discover forgotten gems from gaming history.

There is no backend, database, or external dependencies. Everything runs in the browser using plain HTML, CSS, and JavaScript.

---

## Features

| Feature | Description |
|---|---|
| Real-time search | Filters by name, console, description, or year as you type |
| Console filter | Dropdown to show only games from a specific console |
| Column sorting | Click any table header to sort ascending or descending |
| Result counter | Shows how many titles match the active filters |
| Responsive layout | Works well on desktop and mobile |
| Accessibility | Keyboard navigation, `aria-label`, `aria-sort`, and visual sort indicators |

---

## Getting Started

This project requires no build step or dependency installation. You just need a local HTTP server (opening `index.html` directly via `file://` won't work because `fetch` is blocked by browser security).

### 1. Clone the repository

```bash
git clone https://github.com/lapide66/ConsoleLocked.git
cd ConsoleLocked
```

### 2. Start a local server

**Python 3 (recommended):**
```bash
python3 -m http.server 8000
```

**Node.js:**
```bash
npx serve .
```

**VS Code:** install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension and click "Go Live".

### 3. Open in browser

| Method | URL |
|---|---|
| Python | `http://localhost:8000` |
| npx serve | `http://localhost:3000` |
| Live Server | `http://localhost:5500` |

---

## File Structure

```
ConsoleLocked/
├── index.html      # Page structure: hero, filters, table
├── style.css       # Visual theme, responsive layout, animations
├── script.js       # Filter, sort, and render logic
├── games.json      # Game catalog data
├── docs/
│   └── README.md   # This documentation file
└── release/
    └── ConsoleLocked-v1.0.html  # Versioned release snapshot
```

---

## Games Catalog

The catalog is driven by `games.json`. Current entries (v1.0):

| Game | Console | Year |
|---|---|---|
| Yoshi's Woolly World | Wii U | 2015 |
| Eternal Darkness: Sanity's Requiem | GameCube | 2002 |
| Super Mario RPG: Legend of the Seven Stars | Super Nintendo | 1996 |
| Panzer Dragoon Saga | Sega Saturn | 1998 |
| Fable II | Xbox 360 | 2008 |
| Gravity Rush | PlayStation Vita | 2012 |
| Bloodborne | PlayStation 4 | 2015 |
| Xenoblade Chronicles X | Wii U | 2015 |
| The Last Story | Wii | 2011 |

### Adding a game

Edit `games.json` and add a new object to the array:

```json
{
  "nome": "Game Title",
  "console": "Console Name",
  "ano": 2000,
  "descricao": "A brief description of the game and why it's special.",
  "imagem": ""
}
```

| Field | Type | Description |
|---|---|---|
| `nome` | string | Game title |
| `console` | string | Original console |
| `ano` | number | Release year |
| `descricao` | string | Short description |
| `imagem` | string | Image URL (optional, unused) |

The site updates automatically on page reload.

---

## Technical Details

### Stack

- **HTML5** — semantic markup (`<main>`, `<header>`, `<section>`, `<table>`)
- **CSS3** — custom properties (design tokens), CSS Grid, media queries, pseudo-elements
- **JavaScript ES6+** — `fetch`, `Set`, arrow functions, template literals
- No frameworks, no dependencies, no build step

### Architecture

`script.js` maintains a simple state object:

```js
const state = {
  sortColumn: 'nome',
  sortDirection: 'asc',
  searchTerm: '',
  console: 'todos'
};
```

On every user interaction (search, filter, sort), `renderTable()` re-renders the `<tbody>` from the in-memory `gamesData` array filtered and sorted according to `state`. The console dropdown is populated dynamically from the unique console values in `games.json`.

### Accessibility

- All interactive elements are keyboard-navigable
- Sort buttons use `aria-pressed` and `aria-label` with current sort state
- Table headers use `aria-sort` (`ascending` / `descending` / `none`)
- Result count uses `aria-live="polite"` for screen reader announcements
- Mobile layout uses `data-label` attributes to display column names inline

### Responsive Behavior

At `≤ 720px`, the table switches to a stacked block layout — each row becomes a card and column headers are hidden. Labels are injected via CSS `::before` using `data-label` attributes on each `<td>`.

---

## Deployment

The project is published automatically via **GitHub Pages** from the `main` branch. Any push to `main` updates the live site within seconds.

To enable GitHub Pages on a fork:
1. Go to **Settings → Pages**
2. Under "Source", select branch `main` and folder `/ (root)`
3. Click **Save**

---

## License

Personal and educational use. Game names and titles belong to their respective rights holders.
