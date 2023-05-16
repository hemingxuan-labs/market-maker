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
