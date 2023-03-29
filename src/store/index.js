import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    signInPage: false,
    urlAddress: 'location',
    idConfirmed: false,
    userInfo:{}
    //로그인 보안 취약(Application - Local Storage에 비밀번호 드러남, 추후 보완)
  },
  getters: {
  },
  mutations: {
    setUrl(state, payload){
      state.urlAddress = payload
      console.log(state.urlAddress)
      console.log(state.signInPage)
      if(state.urlAddress.includes('login')) state.signInPage=true
      else state.signInPage=false
    },
    signIn(state, payload){
      state.userInfo = payload
      state.idConfirmed = true
    },
    signOut(state){
      state.userInfo = {}
      state.idConfirmed = false
    }
  },
  actions: {
  },
  modules: {
  },
  plugins:[createPersistedState({
    paths:['userInfo', 'idConfirmed']
  })]
})
