/** * @file * @author 何明暄 */
<template>
    <div>
        <el-form :inline="true" :model="state.parameter" class="demo-form-inline">
            <el-form-item label="address:">
                <el-input v-model="state.parameter.address" placeholder="address" />
            </el-form-item>
            <el-form-item label="orderType:">
                <el-select v-model="state.parameter.orderType" placeholder="orderType">
                    <el-option label="IN" value="IN" />
                    <el-option label="OUT" value="OUT" />
                </el-select>
            </el-form-item>
            <el-form-item label="tokenIn:">
                <el-input v-model="state.parameter.tokenIn" placeholder="tokenIn" />
            </el-form-item>
            <el-form-item label="tokenOut:">
                <el-input v-model="state.parameter.tokenOut" placeholder="tokenOut" />
            </el-form-item>
            <el-form-item label="transHash:">
                <el-input v-model="state.parameter.user" placeholder="transHash" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :icon="Search" @click="onSubmit">Query</el-button>
            </el-form-item>
        </el-form>
        <el-table
            :data="state.tableData"
            style="max-width: calc(100% - 20px); height: calc(100vh - 240px)">
            <el-table-column prop="id" label="id" width="50" />
            <el-table-column label="address" show-overflow-tooltip min-width="120">
                <template #default="scope">
                    <span style="cursor: pointer" @click="elTableColumns(scope.row.address)">{{
                        scope.row.address
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column label="in" min-width="130">
                <template #default="scope">
                    <p>amountIn: {{ scope.row.amountIn || '--' }}</p>
                    <p>tokenIn: {{ scope.row.tokenIn || '--' }}</p>
                </template>
            </el-table-column>
            <el-table-column label="out" min-width="130">
                <template #default="scope">
                    <p>amountOut: {{ scope.row.amountOut || '--' }}</p>
                    <p>tokenOut: {{ scope.row.tokenOut || '--' }}</p>
                </template>
            </el-table-column>
            <el-table-column prop="createdTime" label="createdTime" min-width="130" />
            <el-table-column prop="failDesc" label="failDesc" />
            <el-table-column prop="gasFee" label="gasFee" />
            <el-table-column prop="orderType" label="orderType" min-width="100" />
            <el-table-column label="status" min-width="110">
                <template #default="scope">
                    <el-tag v-if="scope.row.status == 'FALL'" type="danger" effect="dark">
                        {{ scope.row.status }}
                    </el-tag>
                    <el-tag v-else type="success" effect="dark">
                        {{ scope.row.status }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="transHash" show-overflow-tooltip min-width="120">
                <template #default="scope">
                    <span style="cursor: pointer" @click="elTableColumns(scope.row.transHash)">{{
                        scope.row.transHash || '--'
                    }}</span>
                </template>
            </el-table-column>
        </el-table>
        <div
            style="
                height: 50px;
                background-color: #fff;
                display: flex;
                align-items: center;
                margin-top: 10px;
            ">
            <el-pagination
                v-model:current-page="state.parameter.pageNum"
                v-model:page-size="state.parameter.pageSize"
                :page-sizes="[10, 20, 50, 100]"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="state.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>
<script setup>
import { reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { marketOrderPageList } from '@/api/index.js'
import { copyMethod } from '@/utils/common.js'
import { ElMessage } from 'element-plus'
const state = reactive({
    parameter: {
        address: '',
        orderType: '',
        pageNum: 1,
        pageSize: 10,
        tokenIn: '',
        tokenOut: '',
        transHash: ''
    },
    tableData: [],
    total: 0
})
const onMarketOrderPageList = async () => {
    const res = await marketOrderPageList(state.parameter)
    state.tableData = res.result.data
    state.total = res.result.total
}
onMarketOrderPageList()
const onSubmit = () => {
    onMarketOrderPageList()
}
const handleSizeChange = (val) => {
    state.parameter.pageSize = val
    state.parameter.pageNum = 1
    onMarketOrderPageList()
}
const handleCurrentChange = (val) => {
    state.parameter.pageNum = val
    onMarketOrderPageList()
}
const elTableColumns = (address) => {
    if (address === '') return
    copyMethod(address, () => {
        ElMessage({
            message: 'Copy Success',
            type: 'success'
        })
    })
}
</script>
<style lang="scss" scoped></style>
