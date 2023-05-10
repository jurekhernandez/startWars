<script setup lang="ts">

import type {Character} from "@/characters/interfaces/Character";
import {ref, toRef} from "vue";
import {useRouter} from "vue-router";
interface Props{
    chacarter:Character
}

const props =defineProps<Props>();
const character = toRef(props, 'chacarter');
const router = useRouter();
const goTo = ()=>{
    const id = ref(character.value.url.replace('https://swapi.dev/api/people/',''));
    id.value=id.value.replace('/','');
    router.push(`by/${ id.value }`);
}

</script>

<template>
    <div class="character-card" @click="goTo">
        <img src="http://www.wired.com/wp-content/uploads/2014/11/Star-Wars-The-Force-Awakens.jpg" :alt="chacarter.name">
        <h3> {{ chacarter.name }} </h3>
    </div>
</template>


<style scoped>
.character-card{
    margin-right: 5px;
    margin-left: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;
}

img{
    width:150px;
    border-radius: 5px 5px 0px 0px ;
    box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.1);
}

img:hover{
    box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.5);
    transition:all .5s;
}
</style>