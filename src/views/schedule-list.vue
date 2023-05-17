/** * @file * @author 何明暄 */
<template>
    <div style="padding: 20px">
        <el-table :data="state.tableData" style="max-width: calc(100% - 20px); max-height: 300px">
            <el-table-column prop="id" label="id" width="50" />
            <el-table-column prop="tokenIn" label="tokenIn" />
            <el-table-column prop="tokenOut" label="tokenOut" />
            <el-table-column prop="targetNum" label="targetNum" />
            <el-table-column label="orderIds" show-overflow-tooltip min-width="120">
                <template #default="scope">
                    <el-progress :percentage="50" :format="format" />
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup>
import { reactive } from 'vue'
import { marketOrderSwapList } from '@/api/index.js'
const state = reactive({
    tableData: []
})
const onMarketOrderSwapList = async () => {
    const res = await marketOrderSwapList(state.parameter)
    state.tableData = res.result
}
onMarketOrderSwapList()
</script>
<style lang="scss" scoped></style>
