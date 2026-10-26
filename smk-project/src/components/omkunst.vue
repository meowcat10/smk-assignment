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

      <button type="button"
      class="navbutton"><img src="./Images/icons/Headset.svg">Få teksten læst højt</button>
      
        <h2 class="kunsttitel">Mere om Landskab i italiensk manér</h2>
        <p class="aartig">Årtig: 1745 – 1786</p>
        <p class="omtekst">Malleriet Landskab i italiensk manér blev lavet i 1745-1786 af Johan Mandelberg, dette ved vi da Johan levede fra 1730-1786,
            så malleriet kunne ikke være lavet efter 1786. Malleriets teknik er olie på træ og bruger mest brune toner.
        </p>
      
      
    </template>

    <style>

    .kunsttitel {
        text-align: center;
         font-weight: 600;
        font-size: 24px;
        height: 64px;
        width: 350px;
    }

    .aartig {
        font-family: hill;
        font-style: italic;
        font-size: 16px;
        text-decoration: underline;
    }

    .omtekst {
         margin-top: 10px;
         text-align: center;
        width: 350px;
        font-family: hill;
        font-size: 18px;
    }

    .navbutton {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin-top: 20px;
        border: 4px;
        border-style: solid;
        border-color: black;
        width: 300px;
        height: 50px;
        background-color: transparent;
        font-family: hill;
        font-weight: 600;
        font-size: 24px;
        margin-bottom: 20px;
    }
    
    * {
        margin: 0;
    }

    </style>