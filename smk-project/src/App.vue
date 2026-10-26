<script>
import { RouterView } from 'vue-router'
import Banner from './components/Banner.vue'

export default {
    components: {
        Banner,
        RouterView,
    },
}
</script>

<template>
    <Banner @goBack="$router.push('/')" />
    <RouterView />
</template>

<style scoped>
</style>
