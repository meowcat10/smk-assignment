<script>
export default {
    name: 'Omkunst',
    props: {
        artwork: {
            type: Object,
            required: true,
        },
        isSpeaking: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['toggle-read-aloud'],
}
</script>

<template>
    <button
        class="navbutton"
        type="button"
        :aria-pressed="isSpeaking"
        @click="$emit('toggle-read-aloud')"
    >
        <img src="./Images/icons/Headset.svg" alt="">
        {{ isSpeaking ? 'Stop oplæsning' : 'Få teksten læst højt' }}
    </button>
    <h2 class="kunsttitel">Mere om {{ artwork.title }}</h2>
    <p v-if="artwork.artwork_year" class="aartig">Årstal: {{ artwork.artwork_year }}</p>
    <p v-if="artwork.description" class="omtekst">{{ artwork.description }}</p>
</template>

<style scoped>
.kunsttitel {
    width: min(350px, 100%);
    min-height: 64px;
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
}

.aartig {
    margin: 0;
    font-family: hill;
    font-style: italic;
    font-size: 16px;
    text-decoration: underline;
}

.omtekst {
    width: min(350px, 100%);
    margin: 10px 0 0;
    font-family: hill;
    font-size: 18px;
    text-align: center;
}

.navbutton {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: min(300px, 100%);
    box-sizing: border-box;
    height: 50px;
    margin: 20px 0;
    border: 4px solid black;
    background: transparent;
    font: inherit;
    font-size: 24px;
    font-weight: 600;
    cursor: pointer;
}

.navbutton img {
    width: 30px;
    height: 30px;
}
</style>
