    <script>
    import { RouterLink, RouterView } from 'vue-router'
    import Banner from './components/Banner.vue';
    import Navigation from './components/Navigation.vue';
    import Menu from './components/Menu.vue';
    export default {
    name: '',
    components: {
        Banner, Menu, Navigation
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
         <Banner/>
        <Navigation />
        
    </template>

    <style scoped></style>