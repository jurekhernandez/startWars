<script setup lang="ts">
import {useRoute} from "vue-router";
import useCharacter from "@/characters/composables/useCharacter";
const route = useRoute();
/* al extraer los valores pierde reactividad,  para mantenerla imprimimos directamente el valor route.params.id
const id1 =route.params.id;
const {id} =route.params as {id:string};
*/
const {id} =route.params as {id:string};
const { character, hasError, errorMessage} = useCharacter(id);
console.log("Character ID")
console.log(character.value)

</script>

<template>
    <h1 v-if="!character">  Cargando ... </h1>
    <h1 v-else-if="hasError"> {{ errorMessage }} ... </h1>
    <div v-else>
        <div class="character-container">
            <h1> {{character.name}}</h1>
            <ul>
                <li>eye_color: {{character.eye_color}}</li>
                <li>gender: {{character.gender}}</li>
                <li>hair_color: {{character.hair_color}}</li>
                <li>height: {{character.height}}</li>
                <li>skin_color: {{character.skin_color}}</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.character-container{
    display: flex;
    flex-direction: row;
}
</style>