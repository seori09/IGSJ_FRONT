import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    signInPage: false,
    urlAddress: 'location',
    idConfirmed: false,
    myPageLink: '/login',
    userInfo: {}
  },
  getters: {
  },
  mutations: {
    setUrl(state, payload){
      state.urlAddress = payload
      if(state.urlAddress.includes('login')) state.signInPage=true
      else state.signInPage=false
    },
    signIn(state, payload){
      state.userInfo = payload
      state.idConfirmed = true
      state.myPageLink = '/passverify'
    },
    signOut(state){
      state.userInfo = {}
      state.idConfirmed = false
      state.myPageLink = '/login'
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
