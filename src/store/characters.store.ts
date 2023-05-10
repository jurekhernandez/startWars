import type {Character} from "@/characters/interfaces/Character";
import {reactive, ref} from "vue";
import starWarsApi from "@/api/starWarsApi";
import type {Result} from "@/characters/interfaces/Result";


interface Store{
    characters:{
        list:Character[];
        count: number;
        isLoading: boolean;
        hasError:boolean;
        errorMessage:string|null;
    },
    ids:{
        list:{
          [id:string]:Character
        },
        isLoading:boolean;
        hasError:boolean;
        errorMessage:string|null;
    }
    // Métodos generales
    startLoadingCharacters:() => void;
    loadedCharacters:( data:Character[] ) => void;
    loadCharactersFailed:(error:string)=>void;

    // metodos por id
    startLoadingCharacter:()=>void;
    checkIdInStore:(id:string) => boolean;
    loadedCharacter:(character: Character)=>void;
}

// Initial state
const characterStore = reactive<Store>({
    characters:{
        list:[],
        count:0,
        isLoading:true,
        hasError:false,
        errorMessage:null,
    },

    ids:{
        list:{},
        isLoading:false,
        hasError:false,
        errorMessage:null,
    },


    async startLoadingCharacters(){
        console.log("Cargando");
        const { data } = await starWarsApi.get<Result>('/people');
        this.loadedCharacters(data.results);

    },

    loadedCharacters(data:Character[]){
        this.characters={
            list: [...data] ,
            count: data.length,
            isLoading: false,
            hasError:false,
            errorMessage:null,
        }
    },
    loadCharactersFailed(error:string){},


// por ids
    startLoadingCharacter(){
        this.ids={
            ...this.ids,
            isLoading:true,
            hasError:false,
            errorMessage:null
        }
    },
    checkIdInStore(id):boolean{
        return !!this.ids.list[id];
    },
    loadedCharacter(character: Character){
        this.ids.isLoading=false;
        const id = ref(character.url.replace('https://swapi.dev/api/people/',''));
        id.value=id.value.replace('/','');
        this.ids.list[id.value]=character;
    },

});
characterStore.startLoadingCharacters()
export default  characterStore;