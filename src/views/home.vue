<template>
    <div style="padding: 30px">
        <h1>Home</h1>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const count = computed(() => store.state.count)
const userName = computed(() => store.state.persistence.userName)
const handleChange = (value) => {
    store.commit('setCount', value)
}
const userNames = ref('')
userNames.value = userName.value
const onHandelSetUserName = () => {
    store.commit('setUserName', userNames.value)
}
</script>
<style lang="scss" scoped></style>
