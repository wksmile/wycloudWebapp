import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';

Vue.use(Vuex);

const state = {
  currentMusic: null,      //  当前歌曲的信息包括migUrl,songname,name,audiosrc
  isCurrentsong: true,     //  是否显示底部当前歌曲
  playing: true,           //  底部的歌曲是否处于播放状态
  ischangeplaying: false   //  是否是第一次修改playing，playing修改后就变成了true
};

export default new Vuex.Store({
  state,
  actions,
  mutations
});
