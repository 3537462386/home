export const state = () => ({
    data: {},
    theme:false,
    isMobile:false,
    posts:[]
})

export const mutations = {
    data (state, data) {
        state.data = data
    },
    setTheme (state, data) {
        state.theme = !state.theme
    },
    setMobile (state, data) {
        state.isMobile = !state.isMobile
    },
    setPosts (state, data) {
        state.posts = data
    }
}

export const actions = {

}