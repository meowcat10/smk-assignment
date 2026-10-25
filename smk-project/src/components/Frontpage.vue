<script>
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
        btnClick(btn_text){
            // Sends btn-event -> parent
            this.$emit('btnClick', btn_text);
        }
    },
    watch: {
    },
    emits: ['btnClick'],
}
</script>

<template>
    <div class="pageContent">
        <div class = "text">
            <h2>Vælg et lokale</h2>
            <p>Vælg et lokale at navigere til eller vælg at se udstilingslisten, hvor du kan få oplæsning og mere info</p>
        </div>
        <div id="map"></div>
        <button @click="btnClick('Navigation')">Navigation</button>
        <button @click="btnClick('Liste af udstillinger')">Liste af udstillinger</button>
    </div>
</template>

<style scoped>
    .pageContent{
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;

        * {
            display:flex;
            justify-content: center;
            align-items: center;
            flex-direction:column;
            margin:6px;
            width:var(--pageWidth) !important; /* Forces content to stay within specified range */
        }

        button{
            padding:var(--buttonPadding);
            border:2px solid black;
            outline:none;
        }

        #map{ 
            /* Example */
            height:250px;
            background:grey;
        }
    

       
    }


    

</style>