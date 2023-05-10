<script setup lang="ts">
import NavBar from "@/shared/components/NavBar.vue";
import characterRoute from "@/characters/router";
import type {RouterLinkInterface} from "@/router/link-routes";

const links:RouterLinkInterface[] = characterRoute.children!
    .filter(route=>(route.props as {visible:boolean}).visible )
    .map(route => {
        return {
            name: route.name as string,
            path: route.path,
            title : (route.props as {title:string, visible:boolean })!.title,
        }
    });

</script>

<template>
<div>
    <h1>Personajes</h1>
    <NavBar :show-icon="false"
    :links="links"/>
    <!-- <suspense>
        <RouterView/>
    </suspense> -->
    <RouterView/>
</div>
</template>

<style scoped>

</style>