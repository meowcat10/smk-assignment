<script>
    import { RouterLink, RouterView } from 'vue-router'
    import Banner from './components/Banner.vue';
    import Menu from './components/Menu.vue';
    import Frontpage from './components/Frontpage.vue';

    export default {
    name: '',
    components: {
        Banner, Menu, Frontpage
    },
    data() {
        return {
            currentPage: 'Frontpage' // Default
        }
    },
    props: {
    },
    computed: {
    },
    methods: {
        handleCategoryChange(category){
            console.log("New Category: "+category);
        },
    },
    watch: {
    },
    emits: [
    ],
        
    }
</script>

<template>
    <Banner/>
    <!-- If  ... -->
    <div v-if="this.currentPage=='Frontpage'">
        <Menu @category-change="handleCategoryChange"/>
        <Frontpage @btnClick="handleCategoryChange"/>
    </div>
        

</template>

<style scoped>
</style>

