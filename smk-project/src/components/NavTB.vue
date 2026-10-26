<script>
    import { RouterLink, RouterView } from 'vue-router'
    export default {
    name: '',
    components: {
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
      <navheadertekst class="h1tekst"><h1>Find vej</h1></navheadertekst>
      <kort><img class="kort" src="./Images/kort.svg"></kort>
      
    </template>

    <style>

    h1 {
        margin: 0;
    }

    .h1tekst {
        height: 82px;
        width: 300px;
        font-family: Hill;
        font-weight: bold;
        padding-bottom: 10px;
    }

    .kort {
        height: 337px;
        width: 374px;
    }

    </style>