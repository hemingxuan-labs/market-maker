import axios from 'axios'
import store from '@/store/index'
import router from '@/router/index.js'

import { ElMessage } from 'element-plus'
let service = axios.create({
    baseURL: '',
    timeout: 20000
})
// 请求拦截器
service.interceptors.request.use(
    (config) => {
        config.headers['accessToken'] = store.state.persistence.userToken || ''
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)
//响应拦截器
service.interceptors.response.use(
    async (response) => {
        let stateLogoutList = [1002]
        if (stateLogoutList.indexOf(response.data.code) !== -1) {
            store.commit('stateLogout')
            router.push('/login')
            ElMessage({
                dangerouslyUseHTMLString: true,
                message: `<span>${response.data.desc}</span>`,
                center: true
            })
        }
        return response.data
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default service
