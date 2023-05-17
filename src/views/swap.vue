/** * @file * @author 何明暄 */
<template>
    <div>
        <div style="display: flex">
            <el-card class="box-card" direction="vertical">
                <div style="display: flex">
                    <el-input
                        v-model="state.amount1"
                        style="width: 65%"
                        v-if="state.buySellStatus === 'BUY'"
                        type="number"
                        placeholder="amount of money"
                        @input="
                            () => {
                                onMarketUniQuote()
                            }
                        " />
                    <el-select
                        v-model="state.token1"
                        style="flex: 1"
                        @change="tokenChange"
                        placeholder="Token">
                        <el-option
                            v-for="item in state.tokenList"
                            :key="item.tokenName"
                            :label="item.tokenName"
                            :value="item.tokenName" />
                    </el-select>
                </div>
                <div style="margin: 10px 0; display: flex; justify-content: center">
                    <el-button type="primary" @click="switchBuy">
                        <span style="margin-right: 10px">{{ state.buySellStatus }}</span>
                        <el-icon><Bottom /></el-icon>
                    </el-button>
                </div>
                <div style="display: flex">
                    <el-input
                        v-model="state.amount2"
                        style="width: 65%"
                        type="number"
                        disabled
                        placeholder="amount of money" />
                    <el-select
                        v-model="state.token2"
                        style="flex: 1"
                        placeholder="Token"
                        @change="
                            () => {
                                onMarketUniQuote()
                            }
                        ">
                        <el-option
                            v-for="item in state.tokenList"
                            :key="item.tokenName"
                            :label="item.tokenName"
                            :value="item.tokenName" />
                    </el-select>
                </div>
                <div style="margin-top: 16px">
                    <span>Number of operations:</span>
                    <el-input-number
                        v-model="state.numberOfOperations"
                        :min="1"
                        :max="state.tableDataLength"
                        placeholder="amount of money"
                        style="width: 100%; margin-top: 10px" />
                </div>
                <el-button
                    style="width: 100%; margin-top: 20px"
                    type="primary"
                    :disabled="buttonName !== 'Run'"
                    @click="onMarketUniIn"
                    >{{ buttonName }}</el-button
                >
            </el-card>
            <SwapStatus />
        </div>
        <el-table
            :data="state.tableData"
            style="max-width: calc(100% - 20px); height: calc(100vh - 400px); margin-top: 20px">
            <el-table-column prop="id" label="id" width="50" />
            <el-table-column label="address" show-overflow-tooltip min-width="120">
                <template #default="scope">
                    <span style="cursor: pointer" @click="elTableColumns(scope.row.address)">{{
                        scope.row.address
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="token" label="token" width="70" />
            <el-table-column prop="amount" label="amount" />
            <el-table-column prop="createdTime" label="createdTime" />
            <el-table-column prop="updateTime" label="updateTime" />
        </el-table>
    </div>
</template>
<script setup>
import { reactive, computed } from 'vue'
import {
    marketTokenList,
    marketUniSwap,
    marketUniQuote,
    marketWalletHoldList
} from '@/api/index.js'
import { copyMethod } from '@/utils/common.js'
import { ElMessage } from 'element-plus'
import SwapStatus from '@/components/swap-status.vue'
const state = reactive({
    parameter: {
        address: '',
        createdTime: '',
        network: '',
        symbol: '',
        tokenName: '',
        updateTime: ''
    },
    tokenList: [],
    token1: '',
    token2: '',
    amount1: '',
    amount2: '',
    numberOfOperations: '',
    buySellStatus: 'BUY',
    tableData: [],
    tableDataLength: 0
})
const buttonName = computed(() => {
    if (state.token1 === '' || state.token2 === '') {
        return 'Choose Tokens'
    } else if (state.token1 === state.token2) {
        return 'Token cannot be the same'
    } else if (state.amount1 === '' && state.buySellStatus === 'BUY') {
        return 'Enter amount'
    } else if (state.amount2 === 0) {
        return 'No transaction pairs'
    } else if (state.numberOfOperations === '') {
        return 'Enter Number of operations'
    } else {
        return 'Run'
    }
})
const onmarketTokenList = async () => {
    const res = await marketTokenList(state.parameter)
    state.tokenList = res.result
}
onmarketTokenList()
const onMarketUniIn = async () => {
    const res = await marketUniSwap({
        accounts: state.numberOfOperations,
        amount: state.buySellStatus === 'BUY' ? state.amount1 : '',
        exactType: state.buySellStatus === 'BUY' ? 'IN' : 'OUT',
        tokenA: state.token1,
        tokenB: state.token2
    })
    ElMessage({
        message: 'Successfully sent',
        type: 'success'
    })
}
const onMarketUniQuote = async () => {
    if (state.amount1 == '') return
    if (state.token1 == '') return
    if (state.token2 == '') return
    if (state.token1 == state.token2) return
    const res = await marketUniQuote({
        amount: state.amount1,
        tokenA: state.token1,
        tokenB: state.token2
    })
    state.amount2 = res.result
    console.log(res)
}

const switchBuy = async () => {
    if (state.buySellStatus == 'BUY') {
        state.buySellStatus = 'SELL'
    } else {
        state.buySellStatus = 'BUY'
    }
}
const tokenChange = async () => {
    onMarketUniQuote()
    const res = await marketWalletHoldList({
        token: state.token1
    })
    state.tableData = res.result || []
    state.tableDataLength = res.result.length
    console.log(state.tableDataLength, 'state.tableDataLengthstate.tableDataLength')
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
<style lang="scss" scoped>
.box-card {
    width: 45%;
    min-width: 400px;
    height: 300px;
    margin: auto;
}
</style>
