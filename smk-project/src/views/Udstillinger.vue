<script>
// Imports the images so we can use them in the data below
import useUs from '@/components/Images/icons/use-us-udstilling.jpg';
import callCenter from '@/components/Images/icons/call-center-udstilling.jpg';
import unshore from '@/components/Images/icons/unshore-udstilling.jpg';
import ExhibitionCard from '@/components/ExhibitionCard.vue';
export default {
    name: 'Udstillinger',
    components: {
        ExhibitionCard,
    },
    data() {
        return {
            search: '', // What the user types in the search field

            // Dummy data 
            exhibitions: [
                { id: 1, title: 'Use Us', image: useUs },
                { id: 2, title: 'Call Center', image: callCenter },
                { id: 3, title: 'Unshore', image: unshore },
            ],
        }
    },
    computed: {
        // Only shows the exhibitions that match the search (updates when 'search' changes)
        filteredExhibitions() {
            // filter = keeps the exhibitions where the answer is true
            // includes = checks if the title contains the search text
            // toLowerCase = makes everything small letters, so it works with both big and small letters
            return this.exhibitions.filter(exhibition =>
                exhibition.title.toLowerCase().includes(this.search.toLowerCase())
            );
        }
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

    <div class="grid">
        <!-- Makes one card for each exhibition in the list (:key = the id) -->
        <!-- title and image are sent to the card as props -->
        <ExhibitionCard
            v-for="exhibition in filteredExhibitions"
            :key="exhibition.id"
            :title="exhibition.title"
            :image="exhibition.image"
        />
    </div>
</template>

<style scoped>
    h1{
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

    .grid{
        display:grid;
        grid-template-columns:1fr 1fr; /* 2 columns with the same width */
        gap:var(--headerPadding);
        padding:0 var(--headerPadding);
    }
</style>
