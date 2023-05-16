/** * @file * @author 何明暄 */
<script setup>
import { ref, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter()
const route = useRoute()
const store = useStore()
const userName = computed(() => store.state.persistence.userName)
</script>
<template>
    <div></div>
    <el-menu class="el-menu-temp" mode="horizontal">
        <div>LOGO</div>
        <div class="user-head-box">
            <span>{{ userName }}</span>
        </div>
    </el-menu>
</template>
<style lang="scss">
.el-menu-temp {
    width: 100vw;
    height: 50px;
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
