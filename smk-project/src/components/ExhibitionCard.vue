<script>
export default {
    name: 'ExhibitionCard',
    // Values the parent (Udstillinger.vue) sends in
    props: {
        title: String,
        image: String,
    },
}
</script>

<template>
    <div>
        <img :src="image" :alt="title">
        <p>{{ title }}</p>
    </div>
</template>

<style scoped>
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
