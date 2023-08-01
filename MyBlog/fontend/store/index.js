export const state = () => ({
    data: {},
    theme:false,
    isMobile:false
})

export const mutations = {
    data (state, data) {
        state.data = data
    },
    setTheme (state) {
        state.theme = !state.theme
    },
    setMobile (state) {
        state.isMobile = !state.isMobile
    }
}

export const actions = {

}