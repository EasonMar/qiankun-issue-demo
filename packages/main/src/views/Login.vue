<script setup>
import {onBeforeMount} from "vue"
import { actions } from "common/modules"

onBeforeMount(() =>{
    actions.setGlobalState({platform: 'manage'})
})

</script>

<template>
    <div class="root">
        <h1>Login</h1>
        <router-link to="/app1/">To APP 1</router-link>
    </div>
</template>