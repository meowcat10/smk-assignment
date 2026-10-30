<script>
export default {
    name: 'KunstvaerkerAdmin',
    data() {
        return {
            artworks: [],
            loading: true,
            saving: false,
            error: '',
            form: this.emptyForm(),
        }
    },
    mounted() {
        this.loadArtworks()
    },
    methods: {
        emptyForm() {
            return {
                title: '',
                artist: '',
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
        async loadArtworks() {
            this.loading = true
            this.error = ''
            try {
                this.artworks = await this.request('/api/kunstvaerker')
            } catch (error) {
                this.error = error.message
            } finally {
                this.loading = false
            }
        },
        async addArtwork() {
            this.saving = true
            this.error = ''
            try {
                await this.request('/api/kunstvaerker', {
                    method: 'POST',
                    body: JSON.stringify(this.form),
                })
                this.form = this.emptyForm()
                await this.loadArtworks()
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
        <p>Se, tilføj og slet kunstværker i samlingen.</p>

        <form class="artwork-form" @submit.prevent="addArtwork">
            <h2>Tilføj kunstværk</h2>
            <label>
                Titel *
                <input v-model.trim="form.title" type="text" maxlength="255" required>
            </label>
            <label>
                Kunstner
                <input v-model.trim="form.artist" type="text" maxlength="255">
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
            <button type="submit" :disabled="saving">
                {{ saving ? 'Gemmer...' : 'Tilføj kunstværk' }}
            </button>
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
                    <p v-if="artwork.artwork_year">{{ artwork.artwork_year }}</p>
                    <p v-if="artwork.description">{{ artwork.description }}</p>
                </div>
                <button class="delete-button" type="button" @click="deleteArtwork(artwork)">
                    Slet
                </button>
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
.artwork-form textarea {
    box-sizing: border-box;
    width: 100%;
    padding: 8px;
    border: 1px solid black;
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

    .delete-button {
        margin-left: auto;
    }
}
</style>
