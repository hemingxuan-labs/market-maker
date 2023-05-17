import service from '@/utils/request.js'
import { objToUrl } from '@/utils/common.js'

export const discordOauthToken = (data) => {
    return service({
        url: `/api/needex/discord/oauth/token${objToUrl(data)}`,
        method: 'get'
    })
}
// 登录
export const marketUserLogin = (data) => {
    return service({
        url: `/market/user/login`,
        method: 'post',
        data
    })
}
// 查询分页
export const marketOrderPageList = (data) => {
    return service({
        url: `/market/order/page/list`,
        method: 'post',
        data
    })
}
// 钱包数据 查询分页
export const marketWalletPageList = (data) => {
    return service({
        url: `/market/wallet/page/list`,
        method: 'post',
        data
    })
}
//Token列表
export const marketTokenList = (data) => {
    return service({
        url: `/market/token/list`,
        method: 'post',
        data
    })
}
// 买卖代币
export const marketUniSwap = (data) => {
    return service({
        url: `/market/uni/swap`,
        method: 'post',
        data
    })
}
// 查询可兑换数量
export const marketUniQuote = (data) => {
    return service({
        url: `/market/uni/quote`,
        method: 'post',
        data
    })
}
// 代币持有者列表
export const marketWalletHoldList = (data) => {
    return service({
        url: `/market/wallet/hold/list`,
        method: 'post',
        data
    })
}
// 钱包代币余额列表
export const marketWalletBalanceList = (data) => {
    return service({
        url: `/market/wallet/balance/list`,
        method: 'post',
        data
    })
}
// 批量订单列表
export const marketOrderSwapList = (data) => {
    return service({
        url: `/market/order/swap/list`,
        method: 'post',
        data
    })
}
// 普通订单列表-Ids
export const marketOrderIdList = (data) => {
    return service({
        url: `/market/order/id/list`,
        method: 'post',
        data
    })
}
