    <script>
    import { RouterLink, RouterView } from 'vue-router'
    import Banner from './components/Banner.vue';
    import Kunstvaerk from './components/Kunstvaerk.vue';
import Navigation from './components/Navigation.vue';
    export default {
    name: '',
    components: {
        Banner, Kunstvaerk, Navigation
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
         <Kunstvaerk></Kunstvaerk>
         <Navigation></Navigation>
        
        
    </template>

    <style scoped></style>