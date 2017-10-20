import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  showFlag: false        // Musicenu页面使用，控制该页面是否显示
};

export default new Vuex.Store({
  state,
  mutations
});
