<script>
export default {
    name: 'KunstvaerkerAdmin',
    data() {
        return {
            artworks: [],
            artists: [],
            categories: [],
            loading: true,
            saving: false,
            error: '',
            editingId: null,
            form: this.emptyForm(),
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        emptyForm() {
            return {
                title: '',
                artist_id: '',
                category_id: '',
                artwork_year: '',
                description: '',
                image_url: '',
            }
        },
        async request(path, options = {}) {
            const response = await fetch(path, {
                ...options,
                headers: {
                    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
                    ...options.headers,
                },
            })
            if (!response.ok) {
                const result = await response.json().catch(() => ({}))
                throw new Error(result.error || `Forespørgslen fejlede (${response.status}).`)
            }
            return response.status === 204 ? null : response.json()
        },
        async loadData() {
            this.loading = true
            this.error = ''
            try {
                const [artworks, artists, categories] = await Promise.all([
                    this.request('/api/kunstvaerker'),
                    this.request('/api/kunstnere'),
                    this.request('/api/kategorier'),
                ])
                this.artworks = artworks
                this.artists = artists
                this.categories = categories
            } catch (error) {
                this.error = error.message
            } finally {
                this.loading = false
            }
        },
        editArtwork(artwork) {
            this.editingId = artwork.id
            this.form = {
                title: artwork.title,
                artist_id: artwork.artist_id,
                category_id: artwork.category_id,
                artwork_year: artwork.artwork_year ?? '',
                description: artwork.description ?? '',
                image_url: artwork.image_url ?? '',
            }
            this.error = ''
        },
        cancelEdit() {
            this.editingId = null
            this.form = this.emptyForm()
            this.error = ''
        },
        async saveArtwork() {
            this.saving = true
            this.error = ''
            try {
                const isEditing = this.editingId !== null
                const path = isEditing
                    ? `/api/kunstvaerker/${this.editingId}`
                    : '/api/kunstvaerker'
                await this.request(path, {
                    method: isEditing ? 'PUT' : 'POST',
                    body: JSON.stringify(this.form),
                })
                this.cancelEdit()
                await this.loadData()
            } catch (error) {
                this.error = error.message
            } finally {
                this.saving = false
            }
        },
        async deleteArtwork(artwork) {
            if (!window.confirm(`Vil du slette "${artwork.title}"?`)) {
                return
            }
            this.error = ''
            try {
                await this.request(`/api/kunstvaerker/${artwork.id}`, { method: 'DELETE' })
                if (this.editingId === artwork.id) {
                    this.cancelEdit()
                }
                this.artworks = this.artworks.filter((item) => item.id !== artwork.id)
            } catch (error) {
                this.error = error.message
            }
        },
    },
}
</script>

<template>
    <main class="artwork-admin">
        <h1>Kunstværker</h1>
        <p>Se, tilføj, redigér og slet kunstværker i samlingen.</p>

        <form class="artwork-form" @submit.prevent="saveArtwork">
            <h2>{{ editingId === null ? 'Tilføj kunstværk' : 'Redigér kunstværk' }}</h2>
            <label>
                Titel *
                <input v-model.trim="form.title" type="text" maxlength="255" required>
            </label>
            <label>
                Kunstner *
                <select v-model.number="form.artist_id" required>
                    <option disabled value="">Vælg en kunstner</option>
                    <option v-for="artist in artists" :key="artist.artist_id" :value="artist.artist_id">
                        {{ artist.name }}
                    </option>
                </select>
            </label>
            <label>
                Kategori *
                <select v-model.number="form.category_id" required>
                    <option disabled value="">Vælg en kategori</option>
                    <option
                        v-for="category in categories"
                        :key="category.category_id"
                        :value="category.category_id"
                    >
                        {{ category.name }}
                    </option>
                </select>
            </label>
            <label>
                Årstal
                <input v-model="form.artwork_year" type="number" min="0" max="3000" step="1">
            </label>
            <label>
                Billedadresse
                <input v-model.trim="form.image_url" type="url" maxlength="2048" placeholder="https://...">
            </label>
            <label>
                Beskrivelse
                <textarea v-model.trim="form.description" maxlength="5000" rows="4"></textarea>
            </label>
            <div class="form-actions">
                <button type="submit" :disabled="saving || loading">
                    {{ saving ? 'Gemmer...' : editingId === null ? 'Tilføj kunstværk' : 'Gem ændringer' }}
                </button>
                <button v-if="editingId !== null" type="button" @click="cancelEdit">
                    Annullér
                </button>
            </div>
        </form>

        <p v-if="error" class="message error" role="alert">{{ error }}</p>
        <p v-if="loading" class="message" aria-live="polite">Indlæser kunstværker...</p>
        <p v-else-if="artworks.length === 0" class="message">Der er endnu ingen kunstværker.</p>

        <ul v-else class="artwork-list">
            <li v-for="artwork in artworks" :key="artwork.id" class="artwork">
                <img v-if="artwork.image_url" :src="artwork.image_url" :alt="artwork.title">
                <div class="artwork-details">
                    <h2>{{ artwork.title }}</h2>
                    <p v-if="artwork.artist">{{ artwork.artist }}</p>
                    <p v-if="artwork.category">{{ artwork.category }}</p>
                    <p v-if="artwork.artwork_year != null">{{ artwork.artwork_year }}</p>
                    <p v-if="artwork.description">{{ artwork.description }}</p>
                </div>
                <div class="item-actions">
                    <button type="button" @click="editArtwork(artwork)">Redigér</button>
                    <button class="delete-button" type="button" @click="deleteArtwork(artwork)">
                        Slet
                    </button>
                </div>
            </li>
        </ul>
    </main>
</template>

<style scoped>
.artwork-admin {
    max-width: 760px;
    margin: 0 auto;
    padding: var(--headerPadding);
}

h1,
.artwork-form > h2 {
    text-align: center;
}

.artwork-form {
    display: grid;
    gap: 12px;
    padding: 16px;
    border: 2px solid black;
}

.artwork-form label {
    display: grid;
    gap: 6px;
}

.artwork-form input,
.artwork-form select,
.artwork-form textarea {
    box-sizing: border-box;
    width: 100%;
    min-height: 40px;
    padding: 8px;
    border: 1px solid black;
    background: white;
    font: inherit;
}

button {
    min-height: 40px;
    padding: 8px 14px;
    border: 2px solid black;
    background: white;
    font: inherit;
    cursor: pointer;
}

button:disabled {
    cursor: wait;
    opacity: 0.6;
}

.form-actions,
.item-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.artwork-list {
    display: grid;
    gap: 12px;
    padding: 0;
    list-style: none;
}

.artwork {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 12px;
    border: 1px solid black;
}

.artwork img {
    width: 96px;
    aspect-ratio: 1;
    object-fit: cover;
}

.artwork-details {
    flex: 1;
    min-width: 0;
}

.artwork-details h2,
.artwork-details p {
    margin: 0 0 8px;
    overflow-wrap: anywhere;
}

.item-actions {
    flex-direction: column;
}

.delete-button {
    flex: 0 0 auto;
}

.message {
    margin: 16px 0;
}

.error {
    color: #a00000;
}

@media (max-width: 520px) {
    .artwork {
        flex-wrap: wrap;
    }

    .item-actions {
        flex-direction: row;
        margin-left: auto;
    }
}
</style>
