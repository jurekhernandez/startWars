<script setup lang="ts">
// yarn add @tanstack/vue-query
import {ref} from "vue";
import starWarsApi from "@/api/starWarsApi";
import type {Character} from "@/characters/interfaces/Character";
// import {useCharacters} from "@/characters/composables/useCharacters.old";
import {useQuery} from "@tanstack/vue-query";
import CharacterCard from "@/characters/components/CharacterCard.vue";

interface Props{
    characters: Character[]
}

const props = defineProps<Props>();
/* esto se usa con <suspense> en el layout
const {data : respuesta }= await starWarsApi.get<ResultStore.ts>('/people');
 */

//! 2- Composable functions
// const {isLoading, characters, isError, error} = useCharacters();


//! 3- TanStack Query
/*const getCharactersSlow = async():Promise<Character[]> =>{
    return new Promise((resolve )=>{
        setTimeout(async()=>{
            const { data } = await starWarsApi.get<ResultStore.ts>('/people');
            resolve(data.results);
        },1)
    });

}
const {isLoading, data:characters, isError, error} = useQuery(
    ['characters'],
    getCharactersSlow,
);
*/


</script>
<template>
    <h1 v-if="isLoading"> Loading ... </h1>
    <h1 v-if="isError"> {{ error }} </h1>

    <div class="card-list">
        <CharacterCard  v-for="character of props.characters" :key="character.name" :chacarter="character"/>
    </div>
</template>

<style scoped>
.card-list{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>