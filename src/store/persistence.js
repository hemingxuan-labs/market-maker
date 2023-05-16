const persistence = {
    state: () => ({
        userName: 'liufei',
        userToken: ''
    }),
    mutations: {
        setUserName(state, data) {
            state.userName = data
        },
        setUserToken(state, data) {
            state.userToken = data
        },
        stateLogout(state) {
            state.userName = 'Not Logged In'
            state.userToken = ''
        }
    }
}
export default persistence
