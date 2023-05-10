import {computed, ref} from "vue";
import {useQuery} from "@tanstack/vue-query";
import type {Character} from "@/characters/interfaces/Character";
import type {Result} from "@/characters/interfaces/Result";
import starWarsApi from "@/api/starWarsApi";


const characters=ref<Character[]>([]);
const hasError = ref<boolean>(false);
const errorMessage= ref<string | null>(null);

const getCharacters= async():Promise<Character[]> =>{
    if(characters.value.length>0){
        return characters.value;
    }
    const { data } = await starWarsApi.get<Result>('/people');
    return data.results;
}

const loadedCharacters = (dataCharacter:Character[])=>{
    hasError.value=false;
    errorMessage.value=null;
    characters.value=dataCharacter;
}
const useCharacters=()=>{
    const { isLoading } = useQuery(
      ['characters'],
      getCharacters,
        {
            onSuccess:loadedCharacters, // esto es equivalente a  onSuccess(data){loadedCharacters(data)}
        }
    );

    return{
        // properties
        characters,
        isLoading,
        hasError,
        errorMessage,
        // Getters
        count: computed(()=>characters.value.length)
        //Methods
    }
}
export default useCharacters;