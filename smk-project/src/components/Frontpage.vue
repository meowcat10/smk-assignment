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
        <div class = "btnRow">
            <button @click="btnClick('Navigation')">Navigation</button>
            <button @click="btnClick('Liste af udstillinger')">Liste af udstillinger</button>
        </div>
    </div>
</template>

<style scoped>
    .pageContent{
        width:100%;
        height:100%;
        display:flex;
        justify-content: center;
        align-items: center;
        flex-direction:column;
        gap:var(--buttonGap);
        padding:var(--buttonPadding);
        .text{
            h2{ font-size:32px; margin:0;}
            p{ font-size:18px; margin-top:5px;}
            
            text-align: center;
        }
        
        .btnRow{
            button{
                width:var(--buttonWidth_front);
                height:var(--buttonHeight_front);
                background:transparent;
                outline:none;
                font-weight:600;
                font-size:var(--buttonText_front);
                border:4px solid black;
            }
            display:flex;
            gap:var(--buttonGap);
            justify-content: center;
            flex-direction: column;    
        }

        #map{
            width:var(--mapWidth);
            height:var(--mapHeight);
            background:grey;
        }
    }
    

</style>