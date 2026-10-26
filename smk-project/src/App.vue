    <script>
    import { RouterLink, RouterView } from 'vue-router'
    import Banner from './components/Banner.vue';
    import Kunstvaerk from './components/Kunstvaerk.vue';
    export default {
    name: '',
    components: {
        Banner, Kunstvaerk
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
        
        
    </template>

    <style scoped></style>