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
   emits: [
   ],
}
</script>

<template>
    <header>
        <img src="./icons/smk-logo.png" alt ="Logo" width="125px">
    </header>
    <button>Stue</button>
    <button>1. Etage</button>
    <button>2. Etage</button>
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