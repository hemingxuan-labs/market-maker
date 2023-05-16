/** * @file * @author 何明暄 */
<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo">
            <el-sub-menu :index="item.title" v-for="item in menuList">
                <template #title>
                    <el-icon><setting /></el-icon>
                    <span>{{ item.title }}</span>
                </template>
                <el-menu-item
                    v-for="itemSon in item.children"
                    :index="itemSon.path"
                    @click="onMenuItem(itemSon.path)"
                    >{{ itemSon.title }}</el-menu-item
                >
            </el-sub-menu>
        </el-menu>
    </div>
</template>
<script setup>
import { ref, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter()
const route = useRoute()
const store = useStore()
const menuList = [
    {
        title: 'UniSwap',
        children: [
            { title: 'Home', path: '/' },
            { title: 'Order', path: '/order' },
            { title: 'Wallet', path: '/wallet' }
        ]
    },
    { title: 'Swap', children: [{ title: 'Swap', path: '/swap' }] },
    { title: 'Wallet', children: [] }
]
const activeIndex = ref(route.path)
watch(
    () => route.path,
    (newPath, oldPath) => {
        activeIndex.value = newPath
    },
    { immediate: true }
)
const onMenuItem = (path) => {
    router.push(path)
}
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo {
    min-width: 200px;
    height: calc(100vh - 50px);
}
</style>
