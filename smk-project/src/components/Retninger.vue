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

      <button
      class="navbutton"><span class="navbutton-content"><img src="./Images/icons/mappointthin.svg"><span>Start navigation</span></span></button>
      
    </template>

    <style scoped>
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
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        cursor: pointer;
        margin-top: 20px;
        border: 4px solid black;
        width: 300px;
        height: 50px;
        background-color: transparent;
        font-weight: 600;
        font-size: 24px;
        margin-bottom: 20px;
    }

    .navbutton img {
        width: 30px;
        height: 30px;
    }

    .navbutton-content {
        display: grid;
        grid-template-columns: 30px max-content;
        align-items: center;
        justify-content: center;
        column-gap: 6px;
        width: 100%;
        white-space: nowrap;
    }

    .navbutton img {
        width: 30px;
        height: 30px;
    }
    
    </style>