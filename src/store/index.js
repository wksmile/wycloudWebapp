import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';
import getters from './getter';

Vue.use(Vuex);

const state = {
  currentMusic: null,       //  当前歌曲的信息包括migUrl,songname,name,audiosrc
  isCurrentsong: true,      //  是否显示底部当前歌曲
  playing: true,            //  底部的歌曲是否处于播放状态
  ischangeplaying: false,   //  是否是第一次修改playing，playing修改后就变成了true
  collectMusic: [           //  收藏的歌单列表，对应第一个按钮中的创建的歌单
    {    //   我喜欢的音乐这一项始终放在第一个
      'collectName': '我喜欢的音乐',
      'collectMusicId': [],     //  我喜欢的音乐对应歌曲详情页面的那颗红心，这里保存喜欢的歌曲的id
      'collectList': [
        // {
        //   'id': 23444,
        //   'name': '演员',
        //   'migUrl': '演员',
        //   'songName': '演员'
        // }
      ]
    }
    // {
    //   'collectName': 'ktv',
    //   'collectList': []
    // }
  ]
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
});
