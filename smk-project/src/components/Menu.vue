<script>
export default {
   name: '',
   components: {
   },
   data() {
        return {
            currentCategory:'Stue', // Default

        }
    },
   props: {
   },
   computed: {
   },
   methods: {
        selectedCategory(category){
            this.currentCategory = category; // Updates category (based on click)
            this.$emit('category-change', category); // Sends new category to parent
        }
   },
   watch: {
   },
   emits: ['category-change'],
}
</script>

<template>
    <div class="buttonRow">
        <!-- Added class "selected" when current... is matching button text -->
        <!-- '@Click' will change current... to button text -->
        <button
            :class="{selected : currentCategory ==='Stue'}"
            @click="selectedCategory('Stue')"
            >Stue</button>
        <button
            :class="{selected : currentCategory === '1. Etage'}"
            @click="selectedCategory('1. Etage')"
            >1. Etage</button>
        <button
            :class="{selected : currentCategory === '2. Etage'}"
            @click="selectedCategory('2. Etage')"
            >2. Etage</button>
    </div>
</template>

<style scoped>
    .buttonRow{
        display:flex;
        justify-content: center;
        width:100%;
        gap:var(--buttonGap);
        padding:var(--buttonPadding);
        button{
            padding:var(--buttonPadding);
            width:var(--buttonWidth_menu);
            height:var(--buttonHeight_menu);
            border:2px solid black;
            font-size:var(--buttonText_menu);
            outline:none;
            background:transparent;
        }

        /* Style for when BUTTON is active */
        .selected{
            background:black;
            color:white;
        }
    }
</style>