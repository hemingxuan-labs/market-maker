/** * @file * @author 何明暄 */
<template>
    <div
        style="
            display: flex;
            align-items: center;
            justify-content: center;
            background: radial-gradient(
                    100% 100% at 50% 0%,
                    rgba(255, 184, 226, 0.51) 0%,
                    rgba(255, 255, 255, 0) 100%
                ),
                rgb(255, 255, 255);
        ">
        <el-card class="box-card" direction="vertical">
            <el-input v-model="username" placeholder="Username" />
            <el-input
                style="margin-top: 10px"
                v-model="password"
                placeholder="Password"
                type="password" />
            <el-button
                style="width: 100%; margin-top: 20px"
                type="primary"
                @click="onMarketUserLogin"
                >Primary</el-button
            >
        </el-card>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { marketUserLogin } from '@/api/index.js'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const store = useStore()
const username = ref('123123')
const password = ref('hmx')
const onMarketUserLogin = async () => {
    const res = await marketUserLogin({
        username: username.value,
        password: password.value
    })
    store.commit('setUserToken', res.result)
    store.commit('setUserName', username.value)
    router.push('/')
}
</script>
<style lang="scss" scoped>
.box-card {
    width: 500px;
    padding: 20px;
}
</style>
