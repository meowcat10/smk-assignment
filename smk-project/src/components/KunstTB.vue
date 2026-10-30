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
    <template v-if="artwork">
        <navheadertekst class="h1tekst"><h1>{{ artwork.title }}</h1></navheadertekst>
        <kunstner v-if="artwork.artist" class="omkunstner">{{ artwork.artist }}</kunstner>
        <kunst v-if="artwork.image_url">
            <img class="kunstb" :src="artwork.image_url" :alt="artwork.title">
        </kunst>
    </template>
</template>

    <style>

    h1 {
        margin: 0;
    }

    .h1tekst {
        display: flex;
        align-items: center;
        text-align: center;
        height: auto;
        width: 300px;
        font-family: Hill;
        font-weight: bold;
        padding-top: 20px;
        justify-content: center;

    }

    .kunstb {
        display: block;
        height: 337px;
        width: min(374px, 80%);
        object-fit: cover;
    }

     .omkunstner {
         margin-top: 10px;
         text-align: center;
        width: 350px;
        font-family: hill;
        font-size: 18px;
        padding-bottom: 20px;
    }

</style>