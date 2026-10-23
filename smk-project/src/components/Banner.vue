    <script>
    export default {
    name: '',
    components: {
    },
    data() {
        return {
            currentCategory:'Stue',

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
    <header>
        <img src="./icons/smk-logo.png" alt ="Logo" width="125px">
    </header>
    <div class="buttonRow">
        <button
            :class="{selected : currentCategory ==='Stue'}"
            @click="currentCategory = 'Stue'"
            >Stue</button>
        <button
            :class="{selected : currentCategory === '1. Etage'}"
            @click="currentCategory = '1. Etage'"
            >1. Etage</button>
        <button
            :class="{selected : currentCategory === '2. Etage'}"
            @click="currentCategory = '2. Etage'"
            >2. Etage</button>
    </div>
</template>

<style scoped>
    
    header{
        display:flex;
        align-items: end;
        width:100%;
        padding:var(--headerPadding);
        height:var(--headerHeight);
    }

    .buttonRow{
        display:flex;
        gap:var(--buttonGap);
        padding:var(--buttonPadding);
        button{
            padding:var(--buttonPadding);
            width:var(--buttonWidth);
            border:2px solid black;
            outline:none;
        }

        .selected{
            background:black;
            color:white;
        }
    }
    

</style>