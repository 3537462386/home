export default ({ store }) => {
    // 在每次 mutation 发生时，将 Vuex 的状态保存在 sessionStorage 中
    store.subscribe((mutation, state) => {
      sessionStorage.setItem('vuex', JSON.stringify(state))
    })
  
    // 在应用初始化时，从 sessionStorage 中恢复 Vuex 的状态
    if (sessionStorage.getItem('vuex')) {
      store.replaceState(JSON.parse(sessionStorage.getItem('vuex')))
    }
  }