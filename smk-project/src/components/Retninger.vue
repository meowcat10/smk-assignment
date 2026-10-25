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
      <retning class="retning"><img src="./Images/icons/leftarrow.svg"><p>Gå til venstre og fortsæt ligeud i 50 meter</p></retning>
      <retning class="retning"><img src="./Images/icons/rightarrow.svg"><p>Gå til højer og fortsæt ligeud i 50 meter</p></retning>
      <retning class="retning"><img src="./Images/icons/rightarrow.svg"><p>Gå til højer og fortsæt ligeud i 10 meter</p></retning>
      <retning class="retning"><img src="./Images/icons/mappoint.svg"><p>Du er nu ankommet til rum 211</p></retning>

      <button class="navbutton">Start map navigation</button>
      
    </template>

    <style>
    .retning {
        margin-top: 20px;
        width: 300px;
        display: flex;
        width: 300px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
        flex-direction: row;
        font-family: hill;
        font-size: 18px;
    }

    .navbutton {
        margin-top: 20px;
        border: 4px;
        border-style: solid;
        border-color: black;
        width: 300px;
        height: 50px;
        background-color: transparent;
        font-weight: 600;
        font-size: 24px;
        margin-bottom: 20px;
    }
    
    </style>