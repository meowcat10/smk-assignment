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

Kopiér `.env.example` til `.env`, og indstil databasebruger, adgangskode og eventuelt port:

```sh
cp .env.example .env
```

For en eksisterende installation med den gamle `artworks`-tabel skal du køre migrationen:

```sh
npm run migrate
```

Migrationen tager først en `mysqldump`-backup i `database/backups/`, bevarer værkernes ID'er og eksisterende oplysninger og flytter kunstnernavne til den normaliserede tabel. De eksisterende billeder og værker slettes ikke. Backupmappen er lokal og ignoreres af Git.

For en ny database oprettes skemaet og eksempeldata sådan:

```sh
mysql -u root -p < database/schema.sql
mysql -u root -p smk_project < database/seed.sql
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
| `GET` | `/api/kunstnere` | Se kunstnere |
| `GET` | `/api/kategorier` | Se kategorier |
| `POST` | `/api/kunstvaerker` | Tilføj et kunstværk |
| `PUT` | `/api/kunstvaerker/:id` | Redigér et kunstværk |
| `DELETE` | `/api/kunstvaerker/:id` | Slet et kunstværk |

`POST` og `PUT` accepterer JSON med `title`, `artist_id`, `category_id`, `artwork_year`, `description` og `image_url`. Titel, kunstner og kategori er påkrævet; øvrige oplysninger kan udelades.

## Vue-appen

Start udviklingsserveren i en anden terminal:

```sh
npm run dev
```

Kunstværkerne på `/listeafvaerker` og detaljesiderne på `/kunstvaerk/:id` hentes fra databasen. Oversigtssiden henter også kategorier fra API'et og kan filtrere efter kategori. Administrationssiden findes på `/kunstvaerker` og understøtter oprettelse, redigering, sletning og valg af kunstner/kategori. Vite videresender `/api`-kald til API'et på port 3001.
