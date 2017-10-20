import { IS_SHOWFLAG, SET_MUSIC_LIST } from './mutations-types';

export default {
  // 改变showFlag的值，true/false,控制歌单页面Musicmenu是否显示
  [IS_SHOWFLAG] (state, flag) {
    state.showFlag = flag;
  },
  [SET_MUSIC_LIST] (state, item) {

  }
};
