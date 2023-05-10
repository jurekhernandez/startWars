import {computed, ref} from "vue";
import type {Character} from "@/characters/interfaces/Character";
import starWarsApi from "@/api/starWarsApi";
import {useQuery} from "@tanstack/vue-query";
import characterStore from "@/store/characters.store";

const characterSet= ref<{[id:string]: Character}>({});
const hasError = ref<boolean>(false);
const errorMessage = ref<string|null>(null);

const getCharacter = async(id:string):Promise<Character> => {
    if (characterSet.value[id]) return characterSet.value[id];

    try {
        const {data} = await starWarsApi.get<Character>(`/people/${id}`);
        // ! TODO: manejar error
        console.log(data)
        return data;
    }catch (e) {
        throw  new Error("No estaba esperando este error")
    }

}

const loadedCharacter = (dataCharacter:Character)=>{
    console.log("loadedCharacter");
    hasError.value =false;
    errorMessage.value = null;
    const id = ref(dataCharacter.url.replace('https://swapi.dev/api/people/',''));
    id.value=id.value.replace('/','');
    characterSet.value[id.value]=dataCharacter;
}
const useCharacter= (id:string)=>{
    console.log("useCharacter");
    const {isLoading} = useQuery(
        ['character',id],
        ()=>getCharacter(id),
        {
            onSuccess:loadedCharacter
        }
    );

    return{
        isLoading,
        hasError,
        errorMessage,
        list:characterSet,


        character: computed<Character|null>(()=> characterSet.value[id]),
    }
}

export default useCharacter;