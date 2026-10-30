<script>
import { RouterLink } from 'vue-router'

export default {
    name: 'ExhibitionCard',
    // Values the parent (Udstillinger.vue) sends in
    props: {
        title: String,
        image: String,
        to: {
            type: String,
            default: '',
        },
    },
    components: {
        RouterLink,
    },
}
</script>

<template>
    <RouterLink v-if="to" :to="to" class="card">
        <img :src="image" :alt="title">
        <p>{{ title }}</p>
    </RouterLink>
    <div v-else class="card">
        <img :src="image" :alt="title">
        <p>{{ title }}</p>
    </div>
</template>

<style scoped>
    .card{
        display:block;
        color:inherit;
        text-decoration:none;
    }

    img{
        width:100%;
        aspect-ratio:1 / 1; /* Makes the image square */
        object-fit:cover; /* Crops the image instead of stretching it */
    }

    p{
        margin:4px 0 0;
        text-align:center;
        font-size:18px;
    }
</style>
