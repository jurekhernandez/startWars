import {onMounted, ref} from "vue";
import starWarsApi from "@/api/starWarsApi";
import type {Character} from "@/characters/interfaces/Character";
import axios from "axios";
import type {Result} from "@/characters/interfaces/Result";

    const characters = ref<Character[]>([]);
    const isLoading = ref<boolean>(true);
    const isError=ref<boolean>(false);
    const error=ref<string>();
export const useCharactersOld = ()=>{

    onMounted(async()=>{
        await loadCharacters();
    });
    const loadCharacters = async()=>{
        if(characters.value.length > 0) return

        isLoading.value=true;
        try {
            const { data } = await  starWarsApi.get<Result>('/people');
            characters.value = data.results;
            isLoading.value=false;
        }catch (e) {
            isLoading.value=false;
            isError.value=true;
            if(axios.isAxiosError(e)){
                return error.value = e.message;
            }
            return error.value= JSON.stringify(e);
        }
    }

    return{
        characters,
        isLoading,
        isError,
        error
    }
}