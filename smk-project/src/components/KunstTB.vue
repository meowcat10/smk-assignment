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
      <navheadertekst class="h1tekst"><h1>Landskab i italiensk manér</h1></navheadertekst>
      <kunst><img class="kunstb" src="./Images/johanmandelberglandskab.jpg"></kunst>
      
    </template>

    <style>

    h1 {
        margin: 0;
    }

    .h1tekst {
        display: flex;
        align-items: center;
        text-align: center;
        height: auto;
        width: 300px;
        font-family: Hill;
        font-weight: bold;
        padding-top: 20px;
        padding-bottom: 20px;
        justify-content: center;

    }

    .kunstb {
        display: block;
        height: 337px;
        width: 374px;
        object-fit: cover;
    }

    </style>