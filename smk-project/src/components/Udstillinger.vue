<script>
import { RouterLink } from 'vue-router';
import ExhibitionCard from '@/components/ExhibitionCard.vue';
export default {
    name: 'Udstillinger',
    components: {
        ExhibitionCard,
        RouterLink,
    },
    data() {
        return {
            search: '', // What the user types in the search field
            artworks: [],
            categories: [],
            selectedCategoryId: '',
            loading: true,
            error: '',
        }
    },
    mounted() {
        this.loadArtworks()
    },
    computed: {
        // Only shows the exhibitions that match the search (updates when 'search' changes)
        filteredExhibitions() {
            // filter = keeps the exhibitions where the answer is true
            // includes = checks if the title contains the search text
            // toLowerCase = makes everything small letters, so it works with both big and small letters
            return this.artworks.filter((exhibition) => {
                const matchesSearch = exhibition.title.toLowerCase().includes(this.search.toLowerCase())
                const matchesCategory = !this.selectedCategoryId
                    || exhibition.category_id === Number(this.selectedCategoryId)
                return matchesSearch && matchesCategory
            })
        }
    },
    methods: {
        async loadArtworks() {
            this.loading = true
            this.error = ''
            try {
                const [artworksResponse, categoriesResponse] = await Promise.all([
                    fetch('/api/kunstvaerker'),
                    fetch('/api/kategorier'),
                ])
                for (const [response, label] of [
                    [artworksResponse, 'kunstværker'],
                    [categoriesResponse, 'kategorier'],
                ]) {
                    if (!response.ok) {
                        const result = await response.json().catch(() => ({}))
                        throw new Error(result.error || `Kunne ikke hente ${label} (${response.status}).`)
                    }
                }
                ;[this.artworks, this.categories] = await Promise.all([
                    artworksResponse.json(),
                    categoriesResponse.json(),
                ])
            } catch (error) {
                this.error = error.message
            } finally {
                this.loading = false
            }
        },
    },
}
</script>

<template>
    <!-- <br> = line break, so the heading always has 3 lines -->
    <h1>Liste over alle<br>udstillingerne<br>der er i lokalet</h1>
    <hr>

    <div class="search">
        <!-- v-model saves what is typed in 'search' -->
        <input type="text" v-model="search">
    </div>

    <label class="category-filter">
        Filtrér efter kategori
        <select v-model="selectedCategoryId">
            <option value="">Alle kategorier</option>
            <option
                v-for="category in categories"
                :key="category.category_id"
                :value="String(category.category_id)"
            >
                {{ category.name }}
            </option>
        </select>
    </label>

    <RouterLink class="manage-artworks" to="/kunstvaerker">Administrér kunstværker</RouterLink>

    <p v-if="loading" class="status" aria-live="polite">Indlæser kunstværker...</p>
    <p v-else-if="error" class="status error" role="alert">{{ error }}</p>
    <p v-else-if="filteredExhibitions.length === 0" class="status">Ingen kunstværker matcher søgningen.</p>

    <div class="grid">
        <!-- Makes one card for each exhibition in the list (:key = the id) -->
        <!-- title and image are sent to the card as props -->
        <ExhibitionCard
            v-for="exhibition in filteredExhibitions"
            :key="exhibition.id"
            :title="exhibition.title"
            :image="exhibition.image_url"
            :to="`/kunstvaerk/${exhibition.id}`"
        />
    </div>
</template>

<style scoped>
    h1{
        padding-bottom:20px;
        text-align:center;
    }

    hr{
        border:none;
        border-top:2px solid black;
        margin:0 var(--headerPadding); /* Same space on the sides as the banner */
    }

    .search{
        padding:var(--headerPadding);
    }

    .search input{
        width:100%;
        box-sizing:border-box; /* Border and padding stay inside the 100% width */
        padding:6px 32px 6px 6px; /* Extra space on the right so the text doesn't go under the icon */
        border:2px solid black;
        outline:none;
        background:url('@/components/Images/icons/search-icon.png') no-repeat right 8px center; /* The icon is a background image on the right */
        background-size:18px;
    }

    .manage-artworks{
        display:inline-block;
        margin:0 var(--headerPadding) var(--headerPadding);
        color:inherit;
    }

    .category-filter{
        display:flex;
        align-items:center;
        flex-wrap:wrap;
        gap:8px;
        padding:0 var(--headerPadding) var(--headerPadding);
    }

    .category-filter select{
        min-height:36px;
        padding:6px;
        border:2px solid black;
        background:white;
        font:inherit;
    }

    .status{
        padding:0 var(--headerPadding);
    }

    .error{
        color:#a00000;
    }

    .grid{
        display:grid;
        grid-template-columns:1fr 1fr; /* 2 columns with the same width */
        gap:var(--headerPadding);
        padding:0 var(--headerPadding);
    }
</style>
