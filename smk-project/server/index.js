import 'dotenv/config'
import express from 'express'
import mysql from 'mysql2/promise'

const app = express()
const port = Number(process.env.API_PORT || 3001)
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'smk_project',
    waitForConnections: true,
    connectionLimit: 10,
})

app.use(express.json({ limit: '1mb' }))

function parseId(value) {
    const id = Number(value)
    return Number.isSafeInteger(id) && id > 0 ? id : null
}

function validateArtwork(body) {
    const artwork = {
        title: typeof body.title === 'string' ? body.title.trim() : '',
        artist: typeof body.artist === 'string' ? body.artist.trim() : '',
        artwork_year: body.artwork_year === '' || body.artwork_year == null
            ? null
            : Number(body.artwork_year),
        description: typeof body.description === 'string' ? body.description.trim() : '',
        image_url: typeof body.image_url === 'string' ? body.image_url.trim() : '',
    }

    if (!artwork.title || artwork.title.length > 255) {
        return { error: 'Titel er påkrævet og må højst være 255 tegn.' }
    }
    if (artwork.artist.length > 255) {
        return { error: 'Kunstnerens navn må højst være 255 tegn.' }
    }
    if (artwork.artwork_year !== null
        && (!Number.isInteger(artwork.artwork_year) || artwork.artwork_year < 0 || artwork.artwork_year > 3000)) {
        return { error: 'Årstal skal være et heltal mellem 0 og 3000.' }
    }
    if (artwork.description.length > 5000) {
        return { error: 'Beskrivelsen må højst være 5000 tegn.' }
    }
    if (artwork.image_url.length > 2048) {
        return { error: 'Billedadressen må højst være 2048 tegn.' }
    }
    if (artwork.image_url) {
        try {
            const imageUrl = new URL(artwork.image_url)
            if (!['http:', 'https:'].includes(imageUrl.protocol)) {
                return { error: 'Billedadressen skal begynde med http:// eller https://.' }
            }
        } catch {
            return { error: 'Indtast en gyldig billedadresse.' }
        }
    }

    return { artwork }
}

app.get('/api/kunstvaerker', async (request, response, next) => {
    try {
        const [rows] = await pool.query(
            'SELECT id, title, artist, artwork_year, description, image_url, created_at FROM artworks ORDER BY created_at DESC, id DESC',
        )
        response.json(rows)
    } catch (error) {
        next(error)
    }
})

app.get('/api/kunstvaerker/:id', async (request, response, next) => {
    const id = parseId(request.params.id)
    if (!id) {
        return response.status(400).json({ error: 'Ugyldigt kunstværks-id.' })
    }

    try {
        const [rows] = await pool.execute(
            'SELECT id, title, artist, artwork_year, description, image_url, created_at FROM artworks WHERE id = ?',
            [id],
        )
        if (rows.length === 0) {
            return response.status(404).json({ error: 'Kunstværket blev ikke fundet.' })
        }
        response.json(rows[0])
    } catch (error) {
        next(error)
    }
})

app.post('/api/kunstvaerker', async (request, response, next) => {
    const { artwork, error } = validateArtwork(request.body ?? {})
    if (error) {
        return response.status(400).json({ error })
    }

    try {
        const [result] = await pool.execute(
            'INSERT INTO artworks (title, artist, artwork_year, description, image_url) VALUES (?, ?, ?, ?, ?)',
            [
                artwork.title,
                artwork.artist || null,
                artwork.artwork_year,
                artwork.description || null,
                artwork.image_url || null,
            ],
        )
        const [rows] = await pool.execute(
            'SELECT id, title, artist, artwork_year, description, image_url, created_at FROM artworks WHERE id = ?',
            [result.insertId],
        )
        response.status(201).json(rows[0])
    } catch (error) {
        next(error)
    }
})

app.delete('/api/kunstvaerker/:id', async (request, response, next) => {
    const id = parseId(request.params.id)
    if (!id) {
        return response.status(400).json({ error: 'Ugyldigt kunstværks-id.' })
    }

    try {
        const [result] = await pool.execute('DELETE FROM artworks WHERE id = ?', [id])
        if (result.affectedRows === 0) {
            return response.status(404).json({ error: 'Kunstværket blev ikke fundet.' })
        }
        response.status(204).end()
    } catch (error) {
        next(error)
    }
})

app.use('/api', (request, response) => {
    response.status(404).json({ error: 'API-stien blev ikke fundet.' })
})

app.use((error, request, response, next) => {
    console.error('API-fejl:', error)
    if (response.headersSent) {
        return next(error)
    }
    if (error.type === 'entity.parse.failed') {
        return response.status(400).json({ error: 'Ugyldigt JSON-format.' })
    }
    response.status(500).json({ error: 'Der opstod en serverfejl. Kontrollér API- og databaseopsætningen.' })
})

const server = app.listen(port, () => {
    console.log(`Kunstværk-API kører på http://localhost:${port}`)
})

async function shutdown() {
    server.close(async () => {
        await pool.end()
        process.exit(0)
    })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
