<script>
import Headset from './Images/icons/Headset.svg'

export default {
    name: 'Kunstvaerk',
    data() {
        return {
            artwork: null,
            loading: true,
            error: '',
            speechError: '',
            isSpeaking: false,
            Headset,
        }
    },
    watch: {
        '$route.params.id': 'handleRouteChange',
    },
    mounted() {
        this.loadArtwork()
    },
    beforeUnmount() {
        this.stopReading()
    },
    methods: {
        handleRouteChange() {
            this.stopReading()
            this.loadArtwork()
        },
        toggleReadAloud() {
            if (this.isSpeaking) {
                this.stopReading()
                return
            }

            if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
                this.speechError = 'Oplæsning understøttes ikke i denne browser.'
                return
            }

            const details = [
                this.artwork.title,
                this.artwork.artist,
                this.artwork.artwork_year,
                this.artwork.description,
            ].filter(Boolean)
            const utterance = new SpeechSynthesisUtterance(details.join('. '))
            utterance.lang = 'da-DK'
            utterance.onend = () => {
                this.isSpeaking = false
            }
            utterance.onerror = (event) => {
                this.isSpeaking = false
                if (event.error !== 'canceled' && event.error !== 'interrupted') {
                    this.speechError = 'Oplæsningen kunne ikke startes.'
                }
            }

            this.speechError = ''
            this.isSpeaking = true
            window.speechSynthesis.speak(utterance)
        },
        stopReading() {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel()
            }
            this.isSpeaking = false
        },
        async loadArtwork() {
            this.loading = true
            this.error = ''
            try {
                const id = this.$route.params.id
                if (id) {
                    const response = await fetch(`/api/kunstvaerker/${encodeURIComponent(id)}`)
                    if (!response.ok) {
                        const result = await response.json().catch(() => ({}))
                        throw new Error(result.error || `Kunne ikke hente kunstværket (${response.status}).`)
                    }
                    this.artwork = await response.json()
                } else {
                    const response = await fetch('/api/kunstvaerker')
                    if (!response.ok) {
                        const result = await response.json().catch(() => ({}))
                        throw new Error(result.error || `Kunne ikke hente kunstværker (${response.status}).`)
                    }
                    const artworks = await response.json()
                    this.artwork = artworks.find((item) => item.title === 'Landskab i italiensk manér') ?? null
                    if (!this.artwork) {
                        throw new Error('Kunstværket blev ikke fundet.')
                    }
                }
            } catch (error) {
                this.artwork = null
                this.error = error.message
            } finally {
                this.loading = false
            }
        },
    },
}
</script>

<template>
    <main class="artwork-detail">
        <p v-if="loading" aria-live="polite">Indlæser kunstværk...</p>
        <p v-else-if="error" class="error" role="alert">{{ error }}</p>
        <template v-else-if="artwork">
            <section class="artwork-information">
                <h1>{{ artwork.title }}</h1>
                <img v-if="artwork.image_url" :src="artwork.image_url" :alt="artwork.title">
                <h2 class="artwork-subtitle">Mere om {{ artwork.title }}</h2>
                <p v-if="artwork.artist" class="artwork-artist">{{ artwork.artist }}</p>
                <p v-if="artwork.artwork_year" class="artwork-year">Årstal: {{ artwork.artwork_year }}</p>
                <p v-if="artwork.description" class="artwork-description">{{ artwork.description }}</p>
            </section>
            <button
                class="read-aloud-button"
                type="button"
                :aria-pressed="isSpeaking"
                @click="toggleReadAloud"
            >
                <img :src="Headset" alt="">
                {{ isSpeaking ? 'Stop oplæsning' : 'Få teksten læst højt' }}
            </button>
            <p v-if="speechError" class="error" role="alert">{{ speechError }}</p>
        </template>
    </main>
</template>

<style scoped>
.artwork-detail {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 16px;
    padding: var(--headerPadding);
    text-align: center;
}

.artwork-information {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 16px;
    width: 100%;
}

.artwork-information h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: min(300px, 100%);
    padding: 20px 0;
    font-weight: bold;
}

.artwork-information img {
    display: block;
    width: min(374px, 100%);
    height: 337px;
    object-fit: cover;
}

.artwork-information p {
    margin: 0;
}

.artwork-subtitle {
    width: min(350px, 100%);
    min-height: 64px;
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
}

.artwork-artist,
.artwork-description {
    width: min(350px, 100%);
    font-size: 18px;
    text-align: center;
}

.artwork-year {
    font-size: 16px;
    font-style: italic;
    text-decoration: underline;
}

.artwork-information .artwork-description {
    margin-top: 10px;
}

.read-aloud-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: min(300px, 100%);
    box-sizing: border-box;
    height: 50px;
    border: 4px solid black;
    background: transparent;
    font: inherit;
    font-size: 24px;
    font-weight: 600;
    margin: 20px 0;
    cursor: pointer;
}

.read-aloud-button img {
    width: 24px;
    height: 24px;
}

.error {
    color: #a00000;
}
</style>