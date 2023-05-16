import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import persistence from './persistence'
const store = createStore({
    state() {
        return {
            count: 1
        }
    },
    mutations: {
        setCount(state, data) {
            state.count = data
        },
        addCount(state) {
            state.count = state.count + 1
        }
    },
    actions: {
        addCountActions(context) {
            context.commit('addCount')
        }
    },
    plugins: [
        createPersistedState({
            reducer(val) {
                return {
                    persistence: val.persistence
                }
            }
        })
    ],
    modules: {
        persistence
    }
})
export default store
