# smk-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## MySQL og API

Projektet bruger en lokal MySQL-server. Opret databasen og tabellen fra projektmappen:

```sh
mysql -u root -p < database/schema.sql
```

Indsæt projektets fire eksisterende værker (kommandoen kan køres igen uden at lave dubletter):

```sh
mysql -u root -p smk_project < database/seed.sql
```

Kopiér `.env.example` til `.env`, og ret databasebruger, adgangskode og eventuelt port, så de passer til din MySQL-installation:

```sh
cp .env.example .env
```

Start API'et i en terminal:

```sh
npm run server
```

API'et lytter som standard på `http://localhost:3001`. Tilgængelige stier:

| Metode | Sti | Funktion |
| --- | --- | --- |
| `GET` | `/api/kunstvaerker` | Se alle kunstværker |
| `GET` | `/api/kunstvaerker/:id` | Se ét kunstværk |
| `POST` | `/api/kunstvaerker` | Tilføj et kunstværk |
| `DELETE` | `/api/kunstvaerker/:id` | Slet et kunstværk |

`POST` accepterer JSON med `title` (påkrævet), `artist`, `artwork_year`, `description` og `image_url`.

## Vue-appen

Start udviklingsserveren i en anden terminal:

```sh
npm run dev
```

Kunstværkerne på `/listeafvaerker` og detaljesiderne på `/kunstvaerk/:id` hentes fra databasen. Administrationssiden findes på `/kunstvaerker` og kan også åbnes via linket på siden med udstillinger. Vite videresender `/api`-kald til API'et på port 3001.
