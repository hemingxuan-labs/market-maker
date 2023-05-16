<template>
    <Header v-if="route.path !== '/login'" />
    <div id="app-box">
        <Menu v-if="route.path !== '/login'" />
        <router-view id="router-views"></router-view>
    </div>
</template>

<script setup>
import Header from '@/components/header.vue'
import Menu from '@/components/menu.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
#app-box {
    width: 100vw;
    height: calc(100vh - 50px);
    display: flex;
    justify-content: space-between;
    overflow: hidden;
}
#router-views {
    height: 100%;
    flex: 1;
    padding: 20px;
}
</style>
