    <script>
    import { RouterLink, RouterView } from 'vue-router'
    import Banner from './components/Banner.vue';
    export default {
    name: '',
    components: {
        Banner,
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
        <Banner @category-change="handleCategoryChange"/>
        
    </template>

    <style scoped></style>