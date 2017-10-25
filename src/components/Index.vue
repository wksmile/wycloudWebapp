<template>
  <div style="width: 100%;height: 100%;">
    <header>
      <ul>
        <li class="head-li" @click="move('/')" v-bind:class="[tagPage === 1 ? 'red' : '']">音乐</li>
        <li class="head-li" @click="move('/music')" v-bind:class="tagPage === 2 ? 'red' : ''">视频</li>
        <li class="head-li" @click="move('/station')" v-bind:class="tagPage === 3 ? 'red' : ''">电台</li>
      </ul>
      <div class="bar" :class="Classmove"></div>
    </header>
    <transition>
      <two-music v-show="tagPage === 1"></two-music>
      <two-movie v-show="tagPage === 2"></two-movie>
      <two-broadcast v-show="tagPage === 3"></two-broadcast>
    </transition>
    <!--<musicmenu ref="musicmenu" v-on:openmusicsong="show"></musicmenu>-->
    <!--<Musicsong ref="musicsong"></Musicsong>-->
  </div>
</template>

<script>
  import { Swipe, SwipeItem } from 'vue-swipe';
  import BScroll from 'better-scroll';
  import TwoMusic from './TwoMusic';
  import TwoMovie from './TwoMovie';
  import TwoBroadcast from './TwoBroadcast';
  import api from '../api';
  export default {
    name: 'hello',
    data() {
      return {
        tagPage: 1,    //  表示音乐，2表示视屏，3表示电台
        Classmove: 'classmove0',
        music: {},
        info: {
          src: './static/img/aei.png',
          content: '推荐歌单'
        },
        loading: false
      };
    },
    created() {
      this.get();
//      this.music = data.music;
    },
    methods: {
      get() {
        this.loading = true;
        this.$http.get(api.getPlayListByWhere('全部', 'hot', 0, true, 9)).then((res) => {
          this.music = res.data.playlists;
          this.$nextTick(() => {
            this._initScroll();
          });
          this.loading = false;
        });
      },
      _initScroll() {
        if (!this.helloScroll) {
          this.helloScroll = new BScroll(this.$refs.helloWrapper, {
            click: true
          });
        } else {
          this.helloScroll.refresh();
        }
      },
      openmenuTotal: function (item) {
          this.$refs.musicmenu.show();
          this.$refs.musicmenu.setmusiclist(item);
      },
      move: function (val) {
        console.log(val);
        if (val === '/') {
          this.Classmove = 'classmove0';
          this.tagPage = 1;
        } else if (val === '/music') {
          this.Classmove = 'classmove1';
          this.tagPage = 2;
        } else if (val === '/station') {
          this.Classmove = 'classmove2';
          this.tagPage = 3;
        }
      }
    },
    components: {
      Swipe,
      SwipeItem,
      TwoMusic,
      TwoMovie,
      TwoBroadcast
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    header
      font-family: 'Avenir', Helvetica, Arial, sans-serif
      -webkit-font-smoothing: antialiased
      -moz-osx-font-smoothing: grayscale
      color: #2c3e50
      ul
        display: flex
        .head-li
          flex:1
          display: inline-block
          box-sizing: border-box
          width: 33.3%
          height:40px
          font-size: 14px
          text-align: center
          line-height: 40px
          background: #f8f8f9
          color: #333
        .red
          color: #e43c33
          &.active
            color:#FF0200
        .head-li:nth-child(4)
          border-right:0
      .bar
        width: 16%
        height: 2px
        background: #FF0200
        transition: all 0.375s
        &.classmove0
          transform: translate3d(54%,0,0)
        &.classmove1
          transform: translate3d(262%,0,0)
        &.classmove2
          transform: translate3d(471%,0,0)


  @import "../common/stylus/mixin.styl";
  img[lazy=error]
    transition: all 0.5s
    width: 100%
  img[lazy=loading]
    transition: all 0.5s
    width: 100%
  img[lazy=loaded]
    transition: all 0.5s
    width: 100%
    animation: fade 0.5s
  @keyframes fade
    0%{
      opacity: 0
    }
    100%{
      opacity: 1
    }
  @-webkit-keyframes rotating{
    0% {
      -webkit-transform:rotate(0deg)
    }
    100% {
      -webkit-transform:rotate(360deg)
    }
  }
  @keyframes rotating {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }
  .hello-wrapper
    width: 100%
    position: absolute
    top:87px
    bottom:0
    overflow: hidden
    background:#fff
    .my-swipe
      height: 139px
      color: #fff
      font-size: 30px
      text-align: center
      img
        width: 100%
    .cards
      border-1px(#ddd)
      .card-li
        display: inline-block
        width: 30%
        margin-left: 2.5%
        margin-top: 10px
        margin-bottom: 10px
        .circle
          position: relative;
          width: 58%
          margin: 0 auto
          height: 0
          padding-top: 58%
          border-radius: 50%
          border: 1px solid #d33a31
          span
            position: absolute
            left: 50%
            top:50%
            margin-left: -15px
            margin-top: -15px
            width: 30px
            height: 30px
            line-height: 30px
            text-align: center
            font-size: 20px
            color: #d33a31
        p
          color: #333
          font-size: 10px
          text-align: center
          margin-top: 5px
      .card-li:nth-child(1)
        .circle
          background: url(../assets/FM.png) no-repeat
          background-size:50px 50px
          background-position: center
      .card-li:nth-child(3)
        .circle
          background: url(../assets/ph.png) no-repeat
          background-size:50px 50px
          background-position: center
    .music-list
      .loading
        width:100px
        height: 100px
        margin:10px auto 0 auto
        img
          -webkit-animation: rotating 3s  linear .3s infinite
          animation: rotating 3s linear .3s infinite
      .list-ul li
        /*float: left;*/
        min-height: 154px
        display: inline-block
        width: 30%
        margin-left: 2.5%
        margin-bottom: 2.5%
        box-sizing: border-box
        vertical-align: top
        img
          width: 100%
        .item-content
          height: 38px
          word-wrap:break-word
          overflow: hidden
          display: -webkit-box
          text-overflow:ellipsis
          -webkit-line-clamp:2
          -webkit-box-orient: vertical
          font-size: 12px
          color:#333
          line-height: 1.5
          letter-spacing: 1px
</style>
