import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cityId: 20,
    showControl: true,
    cityName: '广州',
    movieId:0,
   
    haveBuy: JSON.parse( localStorage.getItem("haveBuy")) || []
  },
  getters: {

  },
  mutations: {
    changeHaveBuy(state,n){
      state.haveBuy= [...n]
    },
    changeCityId(state,n){
      state.cityId = n
    },
    changeShowControl(state,val) {
      state.showControl = val
    },
    changeCityName(state,n){
      state.cityName = n
    },
    // 新增加
    changemovieId(state,n){
      state.movieId = n
    }
  },
  actions: {
  },
  modules: {
  }
})
