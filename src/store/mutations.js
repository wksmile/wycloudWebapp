import { INITIAL_STATE, SAVE_CURRENT_MUSIC, CHANGE_ISCURRENTSONG, CHANGE_PLAYING, CHANGE_ISCHANGEPLAYING, ADD_COLLECT, DELETE_COLLECT, ADD_COLLECT_MUSIC, DELETE_COLLECT_MUSIC } from './mutations-types';

export default {
  // 保存当前歌曲的信息
  [SAVE_CURRENT_MUSIC] (state, itemMusic) {
    state.currentMusic = itemMusic;
  },
  //  初始化store的状态
  [INITIAL_STATE] (state) {
    state.currentMusic = {
        id: 0,
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
  //  修改isplaying的值
  [CHANGE_ISCHANGEPLAYING] (state) {
    state.ischangeplaying = true;
  },
  // 增加collectMusic项
  [ADD_COLLECT] (state, itemName) {
    state.collectMusic[itemName] = [];
  },
  // 增加collectMusic项中的音乐   state,'我喜欢的音乐',{}
  [ADD_COLLECT_MUSIC] (state, itemName, music) {
    let isInlove = state.collectMusic[0]['collectMusicId'].indexOf(state.currentMusic.id) < 0;
    if (itemName === '我喜欢的音乐' && isInlove) {
      // 添加对应音乐的id
      state.collectMusic[0]['collectMusicId'].push(state.currentMusic.id);
      state.collectMusic[0]['collectList'].push(state.currentMusic);
    } else {
      for (let i = 1; i < state.collectMusic.length; i++) {
        if (state.collectMusic[i]['collectName'] === itemName) {
          state.collectMusic[i]['collectList'].push(music);
        }
      }
    }
  },
  //  删除collectMusic中的项
  [DELETE_COLLECT] (state, itemName) {
    try {
      delete state.collectMusic[itemName];
    } catch (e) {
      console.log('删除collectMusic中的项出错', e);
    }
  },
  //  删除collectMusic中的项中对应的id的音乐   state, '我喜欢的音乐', 23444
  [DELETE_COLLECT_MUSIC] (state, itemName, musicId) {
    let list;
    if (itemName === '我喜欢的音乐') {
      if (!musicId) {
        musicId = state.currentMusic.id;
      }
      // 删除我喜欢的音乐id
      let id = state.collectMusic[0]['collectMusicId'].indexOf(musicId);
      if (id > -1) {
        state.collectMusic[0]['collectMusicId'].splice(id, 1);
      }
      list = state.collectMusic[0]['collectList'];
    } else {
      for (let i = 1; i < state.collectMusic.length; i++) {
        if (state.collectMusic[i]['collectName'] === itemName) {
          list = state.collectMusic[i]['collectList'];
          break;
        }
      }
    }
    for (let i = 0; i < list.length; i++) {
      if (list[i]['id'] === musicId) {
        list.splice(i, 1);
        return;
      }
    }
  }
};
