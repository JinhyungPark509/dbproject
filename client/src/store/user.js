import VueCookies from 'vue-cookies'

export const user = {
  namespaced: true,
  state() {
    return {
      userInfo: VueCookies.get('userInfo') || {
        name: '',
        email: '',
        phone: '',
        lang: ''
      }
    }
  },
  getters: {
    isLogin(state) {
      return !!state.userInfo.email
    }
  },
  mutations: {
    setUserInfo(state, userInfo) {
      console.log(userInfo)
      state.userInfo = userInfo
      VueCookies.set('userInfo', userInfo, '30m')
    },
    clearUserInfo(state) {
      state.userInfo = {
        name: '',
        email: '',
        phone: '',
        lang: ''
      }
      VueCookies.remove('userInfo')
    }
  },
  actions: {}
}
