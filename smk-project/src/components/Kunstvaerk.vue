<script>
    import { RouterLink, RouterView } from 'vue-router'
import KunstTB from './KunstTB.vue';
import omkunst from './omkunst.vue';

    export default {
    name: '',
    components: {
        KunstTB, omkunst
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
      <KunstTB></KunstTB>
      <linje class="linje"></linje>
      <omkunst></omkunst>
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