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
        artist_id: parseId(body.artist_id),
        category_id: parseId(body.category_id),
        artwork_year: body.artwork_year === '' || body.artwork_year == null
            ? null
            : Number(body.artwork_year),
        description: typeof body.description === 'string' ? body.description.trim() : '',
        image_url: typeof body.image_url === 'string' ? body.image_url.trim() : '',
    }

    if (!artwork.title || artwork.title.length > 255) {
        return { error: 'Titel er påkrævet og må højst være 255 tegn.' }
    }
    if (!artwork.artist_id) {
        return { error: 'Vælg en kunstner.' }
    }
    if (!artwork.category_id) {
        return { error: 'Vælg en kategori.' }
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

const artworkSelect = `
    SELECT
        artworks.artwork_id AS id,
        artworks.title,
        artworks.artist_id,
        artists.name AS artist,
        artworks.category_id,
        categories.name AS category,
        artworks.artwork_year,
        artworks.description,
        artworks.image_url,
        artworks.created_at
    FROM artworks
    LEFT JOIN artists ON artists.artist_id = artworks.artist_id
    LEFT JOIN categories ON categories.category_id = artworks.category_id
`

async function getArtworkById(id) {
    const [rows] = await pool.execute(`${artworkSelect} WHERE artworks.artwork_id = ?`, [id])
    return rows[0]
}

app.get('/api/kunstnere', async (request, response, next) => {
    try {
        const [rows] = await pool.query(
            'SELECT artist_id, name FROM artists ORDER BY name',
        )
        response.json(rows)
    } catch (error) {
        next(error)
    }
})

app.get('/api/kategorier', async (request, response, next) => {
    try {
        const [rows] = await pool.query(
            'SELECT category_id, name FROM categories ORDER BY name',
        )
        response.json(rows)
    } catch (error) {
        next(error)
    }
})

app.get('/api/kunstvaerker', async (request, response, next) => {
    try {
        const categoryId = request.query.category_id
            ? parseId(request.query.category_id)
            : null
        if (request.query.category_id && !categoryId) {
            return response.status(400).json({ error: 'Ugyldigt kategori-id.' })
        }
        const [rows] = categoryId
            ? await pool.execute(
                `${artworkSelect} WHERE artworks.category_id = ? ORDER BY artworks.created_at DESC, artworks.artwork_id DESC`,
                [categoryId],
            )
            : await pool.query(
                `${artworkSelect} ORDER BY artworks.created_at DESC, artworks.artwork_id DESC`,
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
        const artwork = await getArtworkById(id)
        if (!artwork) {
            return response.status(404).json({ error: 'Kunstværket blev ikke fundet.' })
        }
        response.json(artwork)
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
        const [artists] = await pool.execute('SELECT artist_id FROM artists WHERE artist_id = ?', [artwork.artist_id])
        const [categories] = await pool.execute(
            'SELECT category_id FROM categories WHERE category_id = ?',
            [artwork.category_id],
        )
        if (!artists.length || !categories.length) {
            return response.status(400).json({ error: 'Den valgte kunstner eller kategori findes ikke.' })
        }
        const [result] = await pool.execute(
            'INSERT INTO artworks (title, artist_id, category_id, artwork_year, description, image_url) VALUES (?, ?, ?, ?, ?, ?)',
            [
                artwork.title,
                artwork.artist_id,
                artwork.category_id,
                artwork.artwork_year,
                artwork.description || null,
                artwork.image_url || null,
            ],
        )
        response.status(201).json(await getArtworkById(result.insertId))
    } catch (error) {
        next(error)
    }
})

app.put('/api/kunstvaerker/:id', async (request, response, next) => {
    const id = parseId(request.params.id)
    if (!id) {
        return response.status(400).json({ error: 'Ugyldigt kunstværks-id.' })
    }
    const { artwork, error } = validateArtwork(request.body ?? {})
    if (error) {
        return response.status(400).json({ error })
    }

    try {
        const [artists] = await pool.execute('SELECT artist_id FROM artists WHERE artist_id = ?', [artwork.artist_id])
        const [categories] = await pool.execute(
            'SELECT category_id FROM categories WHERE category_id = ?',
            [artwork.category_id],
        )
        if (!artists.length || !categories.length) {
            return response.status(400).json({ error: 'Den valgte kunstner eller kategori findes ikke.' })
        }
        const [result] = await pool.execute(
            `UPDATE artworks
             SET title = ?, artist_id = ?, category_id = ?, artwork_year = ?, description = ?, image_url = ?
             WHERE artwork_id = ?`,
            [
                artwork.title,
                artwork.artist_id,
                artwork.category_id,
                artwork.artwork_year,
                artwork.description || null,
                artwork.image_url || null,
                id,
            ],
        )
        if (result.affectedRows === 0) {
            const existing = await getArtworkById(id)
            if (!existing) {
                return response.status(404).json({ error: 'Kunstværket blev ikke fundet.' })
            }
        }
        response.json(await getArtworkById(id))
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
        const [result] = await pool.execute('DELETE FROM artworks WHERE artwork_id = ?', [id])
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
