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
            <el-table-column prop="id" label="id" width="60" />
            <el-table-column label="address" show-overflow-tooltip min-width="120">
                <template #default="scope">
                    <span style="cursor: pointer" @click="elTableColumns(scope.row.address)">{{
                        scope.row.address
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column label="privateKey" show-overflow-tooltip min-width="120">
                <template #default="scope">
                    <span style="cursor: pointer" @click="elTableColumns(scope.row.address)">{{
                        scope.row.privateKey
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column label="seedPhrase" show-overflow-tooltip min-width="120">
                <template #default="scope">
                    <span style="cursor: pointer" @click="elTableColumns(scope.row.address)">{{
                        scope.row.seedPhrase
                    }}</span>
                </template>
            </el-table-column>
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
            <el-table-column prop="createdTime" label="createdTime" min-width="136" />
            <el-table-column prop="updateTime" label="updateTime" min-width="136" />
            <el-table-column fixed="right" label="operate" width="76">
                <template #default="scope">
                    <el-button
                        link
                        type="primary"
                        size="small"
                        @click="walletDetile(scope.row.address)"
                        >View</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="state.dialogTableVisible" title="Wallet token balance list">
            <el-table :data="state.gridData">
                <el-table-column property="token" label="token" width="150" />
                <el-table-column label="address" show-overflow-tooltip min-width="120">
                    <template #default="scope">
                        <span style="cursor: pointer" @click="elTableColumns(scope.row.address)">{{
                            scope.row.address
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column property="createdTime" label="createdTime" />
                <el-table-column property="updateTime" label="updateTime" />
                <el-table-column property="amount" label="amount" />
            </el-table>
        </el-dialog>
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
                :page-sizes="[10, 30, 50, 100, 500]"
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
import { marketWalletPageList, marketWalletBalanceList } from '@/api/index.js'
import { copyMethod } from '@/utils/common.js'
import { ElMessage } from 'element-plus'
const state = reactive({
    parameter: {
        address: '',
        createdTime: '',
        status: '',
        pageNum: 1,
        pageSize: 30
    },
    tableData: [],
    total: 0,
    dialogTableVisible: false,
    gridData: []
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
const walletDetile = async (address) => {
    if (address === '') return
    const res = await marketWalletBalanceList({
        address
    })
    state.gridData = res.result
    state.dialogTableVisible = true
    console.log(res, 'resresresres')
}
</script>
<style lang="scss" scoped></style>
