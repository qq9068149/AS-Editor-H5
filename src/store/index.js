import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    USERDATA: {},        // 用户信息
  },
  mutations: {
    // 保存用户信息
    PUT_USERDATA(state, data) {
      state.USERDATA = data
      console.log("PUT_USERDATA -> state.USERDATA", state.USERDATA)
    },
  },
  actions: {

  },
  modules: {
  },

  // vuex数据持久化
  plugins: [createPersistedState({   // 指定数据存储
    storage: window.localStorage,   // 存储位置
    reducer(state) {
      return {
        USERDATA: state.USERDATA,
      }
    }
  })]
  // plugins: [createPersistedState()]
})
