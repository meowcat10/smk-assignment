<script>
import { RouterLink } from 'vue-router';
import Menu from './Menu.vue';

export default {
    name: '',
    components: {
        Menu,
        RouterLink,
    },
    methods: {
        handleCategoryChange(category){
            console.log("New Category: "+category);
        },
        roomClick(){
            const room = document.querySelector('.roomExample');
            if (room.classList.contains('roomClicked')){
                room.classList.remove('roomClicked');
            } else {
                room.classList.add('roomClicked');
            }
        }
    },
}
</script>

<template>
    <Menu @category-change="handleCategoryChange"/>
    <div class="pageContent">
        <div class = "text">
            <h2>Vælg et lokale</h2>
            <p>Vælg et lokale at navigere til eller vælg at se en liste af værkerne, hvor du kan få oplæsning og mere info</p>
        </div>
        <div id="map">
            <div class="roomExample" @click="roomClick()"></div>
        </div>
        <div class = "btnRow">
            <RouterLink to="/navigation">
                <img src="./Images/icons/nav.png">
                Navigation
            </RouterLink>
            <RouterLink to="/listeafvaerker">
                <img src="./Images/icons/Vector.png">
                Liste af værker
            </RouterLink>
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
            h2 { font-size:32px; margin:0; }
            p { font-size:18px; margin-top:5px; }
            
            text-align: center;
        }
        
        .btnRow{
            a{
                display:flex;
                justify-content: center;
                align-items: center;
                gap:6px;
                width:var(--buttonWidth_front);
                height:var(--buttonHeight_front);
                background:transparent;
                outline:none;
                font-weight:600;
                font-size:var(--buttonText_front);
                border:4px solid black;
                color:inherit;
                text-decoration:none;
                img{
                    width:20px;
                    height:auto;
                }
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
            display:flex;
            justify-content: end;
            align-items: flex-end;

            .roomExample{             
                width:30%;
                margin:5px;
                height:30%;
                background:black;

            }
            .roomClicked{
                background:rgb(229, 172, 223);
            }
        }
    }

</style>