<template>
  <div>
    <div class="search">
      <div class="yuyin" @click="showSetting"></div>         <!--左侧图标-->
      <div class="top-header">          <!--最上面头部三个标志-->
        <router-link to="/music">
          <span v-show="tagPage === 1"><img src="../../../static/img/music1.png"></span>
          <span v-show="tagPage !== 1" @click="changeTagPage(1)"><img src="../../../static/img/music1light.png"></span>
        </router-link>
        <router-link to="/">
          <span v-show="tagPage === 2"><img src="../../../static/img/music2.png"></span>
          <span v-show="tagPage !== 2" @click="changeTagPage(2)"><img src="../../../static/img/music2light.png"></span>
        </router-link>
        <router-link to="/station">
          <span v-show="tagPage === 3"><img src="../../../static/img/People.png"></span>
          <span v-show="tagPage !== 3" @click="changeTagPage(3)"><img src="../../../static/img/Peoplelight.png"></span>
        </router-link>
      </div>
      <div class="music">   <!--右侧图标 -->
        <img src="../../../static/img/search.png" alt="" v-show="!lshow" @click="showlist">
      </div>
    </div>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
    <!-- 底部歌曲信息 -->
    <transition name="slid-down">
      <div class="musicbottom" v-show="isCurrentsong" @click="openCurrentMusic(currentMusic)">
        <div class="musicbottomcontain">
          <span><img :src="currentMusic.migUrl"></span>
          <span class="name"><span class="songname">{{currentMusic.songname}}</span><span class="singername">{{currentMusic.name}}</span></span>
          <span @click.stop="togglePlay" :class="{'isplay':playing,'noplay':!playing}"></span>
          <span class="collect" @click.stop="collect" v-bind:class="[isLove ? 'nolove' : 'love']"></span>
        </div>
      </div>
    </transition>
    <!-- 点击底部打开当前歌曲 -->
    <music-song ref="musicsong"></music-song>
    <music-search ref="musicsearch" v-on:openSong="openCurrentMusic"></music-search>
    <setting-menu ref="settingmenu"></setting-menu>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState, mapMutations } from 'vuex';
  import MusicSong from '../Musicsong/Musicsong.vue';
  import MusicSearch from '../musicsearch/musicsearch.vue';
  import SettingMenu from '../SettingMenu';

  export default{
    data() {
      return {
        tagPage: 2,      //  表示当前是在哪一个页面  1表示头部第一个，2表示第二个 3表示第三个
        list: [],         //  搜索的结果
        number: -1,
        lshow: false,     //  true表示显示搜索页面，false表示显示页面
        isLove: false     //  是否收藏了该歌曲
      };
    },
    computed: mapState([
      'currentMusic', 'isCurrentsong', 'playing'
    ]),
    methods: {
      ...mapMutations([
        'CHANGE_PLAYING', 'ADD_COLLECT_MUSIC', 'DELETE_COLLECT_MUSIC'
      ]),
      // 显示设置的页面
      showSetting () {
          this.$refs.settingmenu.show();
      },
      showlist() {      // 显示搜索页面
//        this.lshow = true;
        this.$refs.musicsearch.show();
      },
      hidelist() {      //  隐藏搜索页面
        this.lshow = false;
      },
      openmusicsong() {      // 打开音乐播放页面
        var obj = null;
        this.$emit('openmusicsong', obj);
      },
      changeTagPage(tag) {
        this.tagPage = tag;
      },
      //  通过底部的播放按钮播放歌曲
      togglePlay() {
        if (this.playing === false) {
//          document.getElementById('audioPlay').pause();
          this.CHANGE_PLAYING(true);
//          this.playing = true;
        } else {
//          document.getElementById('audioPlay').play();
          this.CHANGE_PLAYING(false);
//          this.playing = false;
        }
      },
      //  收藏当前歌曲
      collect () {
          if (this.currentMusic) {
              this.isLove = !this.isLove;
              if (this.isLove) {
                this.ADD_COLLECT_MUSIC('我喜欢的音乐');
              } else {
                this.DELETE_COLLECT_MUSIC('我喜欢的音乐');
              }
          } else {
              console.log('当前不存在在歌曲，清先播放一首');
          }
      },
      openCurrentMusic (item) {
        console.log('歌曲搜索的item', item);
         this.$refs.musicsong.show(item);
      },
      opensong(item) {
        if (item) {

        } else {
          item = null;
        }
        var obj = {
          id: item.id,
          migUrl: item.album.picUrl,
          name: item.name,
          songname: item.artists[0].name,
          audiosrc: item.mp3Url
        };
        this.$emit('musicsearch', obj);
      }
    },
    components: {
      MusicSong,
      MusicSearch,
      SettingMenu
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl";
  .search
    background:#d43c33
    height:46px
    display :flex
    .yuyin
      flex-basis:40px
      background:url(../../../static/img/menu1.png) no-repeat;
      background-position:center center
      background-size: 32px 32px
    .top-header
      flex:1
      margin-top : 8px
      text-align: center
      span
        display: inline-block
        margin: 0 5%
        img
          display: inline-block
          width: 30px
          height: 30px
    .music
      flex-basis: 40px
      text-align:center
      span
        line-height: 46px
        color: #ffffff
      img
        width: 25px
        height: 25px
        margin-left: 10px
        margin-right: 6px
        margin-top: 13px
  .searchresult
    position :absolute
    top: 46px
    left:0
    bottom:0
    width:100%
    background: #ffffff
    z-index:10
    .list-ul
      li
        display:flex
        .img
          &.active
            color: #d33a31
          flex-basis:48px
          text-align :center
          line-height: 56px
          color:#999999
        .title
          flex :1
          border-1px(#ddd)
          .music-name
            &.active
              color: #d33a31
            line-height: 32px
            font-size: 18px
            color :#333
          p
            font-size: 16px
            color:#949494
            i
              display :inline-block
              width:16px
              height:16px
              background-image:url(../../../static/img/sq.png)
              background-position:center center
              background-size: 16px 16px
              background-repeat:no-repeat
              vertical-align:middle
            span
              &.active
                color: #d33a31
              vertical-align:middle
              font-size:12px
        .menu
          flex-basis:48px
          margin-top: 12px
          border-1px(#ddd)
          .menu-img
            width:36px
            height:26px
            background-position:center center
            background-size: 18px 18px
            background-repeat:no-repeat
            border:1px solid #d3d4da
            border-radius:4px
        .menu:nth-child(3)
          .menu-img
            background-image:url(../../../static/img/aee.png)
        .menu:nth-child(4)
          .menu-img
            background-image:url(../../../static/img/more.png)
  .router-slid-enter-active, .router-slid-leave-active
    transition: all .4s;
  .router-slid-enter, .router-slid-leave-active
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  .musicbottom
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 45px;
    background: #d4b3ae;
    z-index : 100;
    &.slid-down-enter-active, &.slid-down-leave-active
      transition: all .4s;
    &.slid-down-enter, &.slid-down-leave-active
      transform: translate3d(0,100%,0);
      opacity: 0;
    .musicbottomcontain
      width: 100%;
      span
        flex: 1
        display: inline-block
        height: 45px
        background-repeat: no-repeat
        background-position: center center
        &.love
          background-image:url(../../../static/img/collect.png)
        &.nolove
          background-image:url(../../../static/img/collect_active.png)
        &.isplay
          display: inline-block;
          margin: 5px 10px;
          width: 35px;
          height: 35px;
          background-image:url(../../../static/img/play.png)
          background-size: 35px 35px;
        &.noplay
          display: inline-block
          margin: 5px 10px;
          width: 35px;
          height: 35px;
          background-image:url(../../../static/img/pause.png)
          background-size:35px 35px
        img
          width: 35px;
          height: 35px;
          margin: 5px;
        .collect
          width: 30px;
          height: 30px;
        &.name
          width: 50%;
          overflow: hidden;
          position: relative;
          .songname
            position: absolute;
            top: 5px;
            left: 0;
            height: 20px;
            white-space: nowrap;
          .singername
            position: absolute;
            bottom: 5px;
            left: 0;
            height: 15px;
            font-size: 10px;
            color: #626262;
            white-space: nowrap;
</style>
