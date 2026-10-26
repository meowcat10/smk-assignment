<script>
    import { RouterLink, RouterView } from 'vue-router'
    import Banner from './components/Banner.vue';
    import Menu from './components/Menu.vue';
    import Frontpage from './components/Frontpage.vue';
    import Kunstvaerk from './components/Kunstvaerk.vue';
    import Navigation from './components/Navigation.vue';

    export default {
    name: '',
    components: {
        Banner, Menu, Frontpage, Kunstvaerk, Navigation
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
            if (category === 'Navigation'){
                this.currentPage = 'Navigation';
            } else if (category === 'Liste af værker'){
                this.currentPage = ''
            }

        },
    },
    watch: {
    },
    emits: [
    ],
        
    }
</script>

<template>
    <Banner @goBack="this.currentPage='Frontpage'"/>
    <!-- If  ... -->
    <div v-if="this.currentPage=='Frontpage'">
        <Menu @category-change="handleCategoryChange"/>
        <Frontpage @btnClick="handleCategoryChange"/>
    </div>
    <div v-else-if="this.currentPage=='Navigation'">
        <Navigation/>
    </div>
    
        

</template>

<style scoped>
</style>

