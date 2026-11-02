import 'dotenv/config'
import { spawnSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { mkdir, unlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import mysql from 'mysql2/promise'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))
const databaseName = process.env.DB_NAME || 'smk_project'
const connectionOptions = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: databaseName,
}

function quoteConfigValue(value) {
    return `"${String(value).replaceAll('\\', '\\\\').replaceAll('"', '\\"')}"`
}

async function createBackup() {
    const backupDirectory = join(projectRoot, 'database', 'backups')
    const backupPath = join(
        backupDirectory,
        `${databaseName}-before-normalization-${new Date().toISOString().replaceAll(':', '-')}.sql`,
    )
    const configPath = join(tmpdir(), `smk-mysqldump-${randomUUID()}.cnf`)
    const config = [
        '[client]',
        `host=${quoteConfigValue(connectionOptions.host)}`,
        `port=${connectionOptions.port}`,
        `user=${quoteConfigValue(connectionOptions.user)}`,
        `password=${quoteConfigValue(connectionOptions.password)}`,
        '',
    ].join('\n')

    await mkdir(backupDirectory, { recursive: true })
    await writeFile(configPath, config, { mode: 0o600 })
    try {
        const result = spawnSync(
            'mysqldump',
            [
                `--defaults-extra-file=${configPath}`,
                '--single-transaction',
                '--skip-lock-tables',
                '--no-tablespaces',
                databaseName,
                `--result-file=${backupPath}`,
            ],
            { encoding: 'utf8' },
        )
        if (result.error) {
            throw result.error
        }
        if (result.status !== 0) {
            throw new Error(result.stderr || `mysqldump afsluttede med status ${result.status}.`)
        }
        console.log(`Databasebackup oprettet: ${backupPath}`)
    } finally {
        await unlink(configPath).catch((error) => {
            if (error.code !== 'ENOENT') {
                throw error
            }
        })
    }
}

async function hasColumn(connection, column) {
    const [rows] = await connection.execute(
        `SELECT COUNT(*) AS count
         FROM information_schema.columns
         WHERE table_schema = ? AND table_name = 'artworks' AND column_name = ?`,
        [databaseName, column],
    )
    return Number(rows[0].count) > 0
}

async function hasConstraint(connection, constraint) {
    const [rows] = await connection.execute(
        `SELECT COUNT(*) AS count
         FROM information_schema.table_constraints
         WHERE table_schema = ? AND table_name = 'artworks' AND constraint_name = ?`,
        [databaseName, constraint],
    )
    return Number(rows[0].count) > 0
}

async function migrate() {
    await createBackup()
    const connection = await mysql.createConnection(connectionOptions)
    try {
        const [tableRows] = await connection.execute(
            `SELECT COUNT(*) AS count
             FROM information_schema.tables
             WHERE table_schema = ? AND table_name = 'artworks'`,
            [databaseName],
        )
        if (Number(tableRows[0].count) === 0) {
            throw new Error(`Tabellen artworks findes ikke i databasen ${databaseName}.`)
        }

        const [[{ count: initialCount }]] = await connection.query('SELECT COUNT(*) AS count FROM artworks')

        await connection.query(`
            CREATE TABLE IF NOT EXISTS artists (
                artist_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                PRIMARY KEY (artist_id),
                UNIQUE KEY uq_artists_name (name)
            ) ENGINE=InnoDB
        `)
        await connection.query(`
            CREATE TABLE IF NOT EXISTS categories (
                category_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                PRIMARY KEY (category_id),
                UNIQUE KEY uq_categories_name (name)
            ) ENGINE=InnoDB
        `)

        const hasLegacyArtist = await hasColumn(connection, 'artist')
        const hasArtistId = await hasColumn(connection, 'artist_id')
        const hasCategoryId = await hasColumn(connection, 'category_id')
        if (!hasArtistId) {
            await connection.query('ALTER TABLE artworks ADD COLUMN artist_id INT UNSIGNED NULL')
        }
        if (!hasCategoryId) {
            await connection.query('ALTER TABLE artworks ADD COLUMN category_id INT UNSIGNED NULL')
        }

        await connection.query(`
            INSERT IGNORE INTO artists (name)
            VALUES ('Kunstner A'), ('Kunstner B'), ('Johan Mandelberg')
        `)
        if (hasLegacyArtist) {
            await connection.query(`
                UPDATE artworks
                SET artist = CASE
                    WHEN title IN ('Use Us', 'Unshore') THEN 'Kunstner A'
                    WHEN title = 'Call Center' THEN 'Kunstner B'
                    WHEN title = 'Landskab i italiensk manér' THEN 'Johan Mandelberg'
                    ELSE artist
                END
                WHERE artist IS NULL OR TRIM(artist) = ''
            `)
            await connection.query(`
                INSERT IGNORE INTO artists (name)
                SELECT DISTINCT TRIM(artist)
                FROM artworks
                WHERE artist IS NOT NULL AND TRIM(artist) <> ''
            `)
            await connection.query(`
                UPDATE artworks
                JOIN artists ON artists.name = TRIM(artworks.artist)
                SET artworks.artist_id = artists.artist_id
                WHERE artworks.artist_id IS NULL
                    AND artworks.artist IS NOT NULL
                    AND TRIM(artworks.artist) <> ''
            `)
        }

        await connection.query(`
            INSERT IGNORE INTO categories (name)
            VALUES ('Danish Art'), ('European Art')
        `)
        await connection.query(`
            UPDATE artworks
            JOIN categories
                ON categories.name = CASE
                    WHEN artworks.title IN ('Use Us', 'Unshore', 'Landskab i italiensk manér') THEN 'Danish Art'
                    WHEN artworks.title = 'Call Center' THEN 'European Art'
                    ELSE NULL
                END
            SET artworks.category_id = categories.category_id
            WHERE artworks.category_id IS NULL
        `)

        if (hasLegacyArtist) {
            await connection.query(`
                UPDATE artworks
                JOIN artists ON artists.name = 'Kunstner A'
                SET artworks.artist_id = artists.artist_id
                WHERE artworks.artist_id IS NULL
                    AND artworks.title IN ('Use Us', 'Unshore')
            `)
            await connection.query(`
                UPDATE artworks
                JOIN artists ON artists.name = 'Kunstner B'
                SET artworks.artist_id = artists.artist_id
                WHERE artworks.artist_id IS NULL AND artworks.title = 'Call Center'
            `)
            await connection.query(`
                UPDATE artworks
                JOIN artists ON artists.name = 'Johan Mandelberg'
                SET artworks.artist_id = artists.artist_id
                WHERE artworks.artist_id IS NULL AND artworks.title = 'Landskab i italiensk manér'
            `)
            await connection.query(`
                UPDATE artworks
                SET artwork_year = 1745
                WHERE title = 'Landskab i italiensk manér' AND artwork_year IS NULL
            `)
            await connection.query(`
                UPDATE artworks
                SET description = 'Landskab i italiensk manér blev malet af Johan Mandelberg mellem 1745 og 1786. Værket er udført i olie på træ og bruger primært brune toner.'
                WHERE title = 'Landskab i italiensk manér' AND description IS NULL
            `)
        }

        if (!(await hasConstraint(connection, 'fk_artworks_artist'))) {
            await connection.query(`
                ALTER TABLE artworks
                ADD CONSTRAINT fk_artworks_artist
                FOREIGN KEY (artist_id) REFERENCES artists (artist_id)
                ON UPDATE CASCADE ON DELETE RESTRICT
            `)
        }
        if (!(await hasConstraint(connection, 'fk_artworks_category'))) {
            await connection.query(`
                ALTER TABLE artworks
                ADD CONSTRAINT fk_artworks_category
                FOREIGN KEY (category_id) REFERENCES categories (category_id)
                ON UPDATE CASCADE ON DELETE RESTRICT
            `)
        }

        if (hasLegacyArtist) {
            await connection.query('ALTER TABLE artworks DROP COLUMN artist')
        }
        if (await hasColumn(connection, 'id')) {
            await connection.query(
                'ALTER TABLE artworks CHANGE COLUMN id artwork_id INT UNSIGNED NOT NULL AUTO_INCREMENT',
            )
        }

        const [[{ count: finalCount }]] = await connection.query('SELECT COUNT(*) AS count FROM artworks')
        if (Number(finalCount) !== Number(initialCount)) {
            throw new Error(`Antallet af kunstværker ændrede sig under migrationen (${initialCount} til ${finalCount}).`)
        }
        console.log(`Migration gennemført. ${finalCount} eksisterende kunstværker er bevaret.`)
    } finally {
        await connection.end()
    }
}

migrate().catch((error) => {
    console.error('Migrationen fejlede:', error.message)
    process.exitCode = 1
})
