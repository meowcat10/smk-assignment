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
        <img class="kort" src="./Images/kort.svg">
    </template>

    <style>

        h1 {
            margin: 0;
        }

        .h1tekst {
            padding-top: 20px;
            display: flex;
            text-align: center;
            height: auto;
            width: 300px;
            font-family: Hill;
            font-weight: bold;
            padding-bottom: 20px;
            justify-content: center;
        }

        .kort {
            height: var(--mapHeight);
            width: var(--mapWidth);
        }

    </style>