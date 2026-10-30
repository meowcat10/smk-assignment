 <script>
    import { RouterLink, RouterView } from 'vue-router'
    import NavTB from './NavTB.vue';
    import Retninger from './Retninger.vue';
    export default {
    name: '',
    components: {
        NavTB, Retninger
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
    <nav class="nav"> 
      <NavTB/> 
      <linje class="linje"></linje>
      <Retninger/>
    </nav>
      
    </template>

    <style>
    .linje {
        margin-top: 20px;
        height: 2px;
        background-color: black;
        width: 360px;
    }

    .nav {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    </style>