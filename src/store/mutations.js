import { INITIAL_STATE, SAVE_CURRENT_MUSIC, CHANGE_ISCURRENTSONG, CHANGE_PLAYING, CHANGE_ISCHANGEPLAYING } from './mutations-types';

export default {
  // 保存当前歌曲的信息
  [SAVE_CURRENT_MUSIC] (state, itemMusic) {
    state.currentMusic = itemMusic;
  },
  //  初始化store的状态
  [INITIAL_STATE] (state) {
    state.currentMusic = {
        migUrl: '/static/musiclist/3.jpg',
        songname: '暂无歌曲',
        name: '暂无歌手信息'
      };
    state.isCurrentsong = true;
    // state.playing = true;
    state.ischangeplaying = false;
  },
  // 改变底部的当前歌曲是否显示
  [CHANGE_ISCURRENTSONG] (state, booldata) {
    state.isCurrentsong = booldata;
  },
  //  改变底部当前歌曲播放状态
  [CHANGE_PLAYING] (state, playstate) {
    state.playing = playstate;
    console.log('ggg------------------');
  },
  [CHANGE_ISCHANGEPLAYING] (state) {
    state.ischangeplaying = true;
  }
};
