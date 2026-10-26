    <script>
    import { RouterLink, RouterView } from 'vue-router'
    import Banner from './components/Banner.vue';
    import Menu from './components/Menu.vue';
    export default {
    name: '',
    components: {
        Banner, Menu
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
        handleCategoryChange(category){
            console.log("New Category: "+category);
        }
    },
    watch: {
    },
    emits: [
    ],
    }
    </script>

    <template>
        <Banner/>
        <Menu @category-change="handleCategoryChange"/>
        
    </template>

    <style scoped></style>