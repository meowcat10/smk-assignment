<script>
export default {
    name: 'KunstTB',
    props: {
        artwork: {
            type: Object,
            required: true,
        },
    },
}
</script>
   
<template>
    <div v-if="artwork" class="artwork-summary">
        <navheadertekst class="h1tekst"><h1>{{ artwork.title }}</h1></navheadertekst>
        <kunstner v-if="artwork.artist" class="omkunstner">Lavet af {{ artwork.artist }}</kunstner>
        <div v-if="artwork.image_url" class="artwork-image">
            <img class="kunstb" :src="artwork.image_url" :alt="artwork.title">
            <hr>
        </div>
    </div>
</template>

<style scoped>
.artwork-summary {
    width: 100%;
}

.h1tekst {
    display: flex;
    align-items: center;
    justify-content: center;
    width: min(300px, 100%);
    margin: 0 auto;
    padding-top: 20px;
    text-align: center;
    font-family: Hill;
    font-weight: bold;
}

.h1tekst h1 {
    margin: 0;
}

.omkunstner {
    display: block;
    width: min(350px, 100%);
    margin: 4px auto 12px;
    text-align: center;
    font-family: Hill;
    font-size: 18px;
}

.kunstb {
    display: block;
    width: calc(100% - var(--headerPadding) - var(--headerPadding));
    box-sizing: border-box;
    height: 337px;
    margin: 0 var(--headerPadding);
    object-fit: cover;
}

.artwork-image hr {
    margin: 20px var(--headerPadding);
    border: 0;
    border-top: 2px solid black;
}
</style>