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
        
    },
    watch: {
    },
    emits: [],
}
</script>

<template>
    <header>
        <img 
        @click="this.$emit('goBack')"
        src="./Images/icons/smk-logo.png" alt ="Logo" width="125px">
    </header>
</template>

<style scoped>
    header{
        display:flex;
        align-items: end;
        width:100%;
        padding:var(--headerPadding);
        height:var(--headerHeight);
    }

</style>