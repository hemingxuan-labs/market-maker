/** * @file * @author 何明暄 */
<template>
    <div>
        <el-form :inline="true" :model="state.parameter" class="demo-form-inline">
            <el-form-item label="address:">
                <el-input v-model="state.parameter.address" placeholder="address" />
            </el-form-item>
            <el-form-item label="status:">
                <el-select v-model="state.parameter.status" placeholder="status">
                    <el-option label="NORMAL" value="NORMAL" />
                    <el-option label="FREEZE" value="FREEZE" />
                </el-select>
            </el-form-item>
            <el-form-item label="createdTime:">
                <el-input v-model="state.parameter.createdTime" placeholder="createdTime" />
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
            <el-table-column prop="createdTime" label="createdTime" min-width="130" />
            <el-table-column prop="privateKey" label="privateKey" />
            <el-table-column prop="seedPhrase" label="seedPhrase" />
            <el-table-column label="status" min-width="70">
                <template #default="scope">
                    <el-tag v-if="scope.row.status !== 'NORMAL'" type="danger" effect="dark">
                        {{ scope.row.status }}
                    </el-tag>
                    <el-tag v-else type="success" effect="dark">
                        {{ scope.row.status }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="updateTime" />
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
import { marketWalletPageList } from '@/api/index.js'
import { copyMethod } from '@/utils/common.js'
import { ElMessage } from 'element-plus'
const state = reactive({
    parameter: {
        address: '',
        createdTime: '',
        status: '',
        pageNum: 1,
        pageSize: 10
    },
    tableData: [],
    total: 0
})
const onmarketWalletPageList = async () => {
    const res = await marketWalletPageList(state.parameter)
    state.tableData = res.result.data
    state.total = res.result.total
}
onmarketWalletPageList()
const onSubmit = () => {
    onmarketWalletPageList()
}
const handleSizeChange = (val) => {
    state.parameter.pageSize = val
    state.parameter.pageNum = 1
    onmarketWalletPageList()
}
const handleCurrentChange = (val) => {
    state.parameter.pageNum = val
    onmarketWalletPageList()
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
