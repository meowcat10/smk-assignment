    <script>
    import { RouterLink, RouterView } from 'vue-router'
    import Banner from './components/Banner.vue';
<<<<<<< HEAD
    import Navigation from './components/Navigation.vue';
    export default {
    name: '',
    components: {
        Banner, Navigation
=======
    import Menu from './components/Menu.vue';
    export default {
    name: '',
    components: {
        Banner, Menu
>>>>>>> c4b8eb403688c6eb1d32b457126c6cdd9c088093
    },
    data() {
        return {

        }
    },
    props: {
    },
    computed: {
    },
    methods: {
     
    },
    watch: {
    },
    emits: [
    ],
    }
    </script>

    <template>
<<<<<<< HEAD
        <Navigation />
=======
        <Banner/>
        <Menu @category-change="handleCategoryChange"/>
>>>>>>> c4b8eb403688c6eb1d32b457126c6cdd9c088093
        
    </template>

    <style scoped></style>