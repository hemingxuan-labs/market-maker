/** * @file * @author 何明暄 */
<template>
    <el-card class="box-card" direction="vertical" style="height: 300px">
        <el-table :data="state.tableData" style="max-width: calc(100% - 20px); max-height: 300px">
            <el-table-column prop="tokenIn" label="In" width="50" />
            <el-table-column prop="tokenOut" label="Out" width="50" />
            <el-table-column prop="targetNum" label="targetNum" width="100" />
            <el-table-column label="orderIds" min-width="140">
                <template #default="scope">
                    <el-progress :percentage="scope.row.percentage" style="width: 100%" />
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="View" width="60">
                <template #default="scope">
                    <el-button
                        link
                        type="primary"
                        size="small"
                        @click="
                            () => {
                                state.dialogTableVisible = true
                                state.selectIds = scope.row.orderIds
                                onMarketOrderIdList()
                            }
                        "
                        >View</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <el-dialog
        class="swap-status-el-dialog"
        v-model="state.dialogTableVisible"
        title="Wallet token balance list">
        <el-table :data="state.gridData">
            <el-table-column property="token" label="token" width="150" />
            <el-table-column label="address" show-overflow-tooltip min-width="120">
                <template #default="scope">
                    <span style="cursor: pointer" @click="elTableColumns(scope.row.address)">{{
                        scope.row.address
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column property="orderType" label="orderType" />
            <el-table-column property="updateTime" label="updateTime" />
            <el-table-column property="amountIn" label="amountIn" />
            <el-table-column property="amountOut" label="amountOut" />
            <el-table-column property="failDesc" label="failDesc" />
            <el-table-column property="gasFee" label="gasFee" />

            <el-table-column property="status" label="status" />
        </el-table>
    </el-dialog>
</template>
<script setup>
import { reactive } from 'vue'
import { marketOrderSwapList, marketOrderIdList } from '@/api/index.js'
const state = reactive({
    tableData: [],
    dialogTableVisible: false,
    selectIds: '',
    gridData: []
})
const onMarketOrderSwapList = async () => {
    const res = await marketOrderSwapList()
    state.tableData = res.result || []
    res.result.map((item, index) => {
        state.tableData[index].percentage = convertToPercentage(item.finishNum, item.targetNum)
    })
}
function convertToPercentage(value, total) {
    return (value / total) * 100
}
onMarketOrderSwapList()
// setInterval(() => {
//     onMarketOrderSwapList()
// }, 15000)
const onMarketOrderIdList = async () => {
    const res = await marketOrderIdList({
        ids: state.selectIds
    })
    state.gridData = res.result
}
</script>
<style lang="scss">
.box-card {
    width: 45%;
    min-width: 400px;
    height: 300px;
    margin: auto;
    .el-card__body {
        padding: 10px;
    }
}
.el-progress__text {
    min-width: 0;
}
.swap-status-el-dialog {
    .el-dialog {
        width: 90%;
    }
}
</style>
