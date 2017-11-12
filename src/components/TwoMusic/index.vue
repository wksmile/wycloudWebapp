<template>       <!--音乐页面-->
  <div style="width: 100%; height: 100%">
    <div class="hello-wrapper" ref="helloWrapper">
      <div class="hello">
        <div class="swipe-wrapper">
          <swipe class="my-swipe">
            <swipe-item class="slide1">
              <img src="../../assets/1.jpg" alt="">
            </swipe-item>
            <swipe-item class="slide2">
              <img src="../../assets/2.jpg" alt="">
            </swipe-item>
            <swipe-item class="slide3">
              <img src="../../assets/3.jpg" alt="">
            </swipe-item>
            <swipe-item class="slide3">
              <img src="../../assets/4.jpg" alt="">
            </swipe-item>
            <swipe-item class="slide3">
              <img src="../../assets/5.jpg" alt="">
            </swipe-item>
            <swipe-item class="slide3">
              <img src="../../assets/6.jpg" alt="">
            </swipe-item>
            <swipe-item class="slide3">
              <img src="../../assets/7.jpg" alt="">
            </swipe-item>
            <swipe-item class="slide3">
              <img src="../../assets/8.jpg" alt="">
            </swipe-item>
          </swipe>
        </div>
        <div class="cards border-1px">
          <div class="card-li">
            <div class="circle">
            </div>
            <p>私人FM</p>
          </div>
          <div class="card-li">
            <div class="circle">
              <span>20</span>
            </div>
            <p>每日推荐</p>
          </div>
          <div class="card-li">
            <div class="circle">
            </div>
            <p>歌单</p>
          </div>
          <div class="card-li">
            <div class="circle">
            </div>
            <p>排行榜</p>
          </div>
        </div>
        <!--<div class="height">-->
        <!---->
        <!--</div>-->
        <div class="music-list">   <!--推荐歌单的那一块专辑部分-->
          <musictitle :info="info" ></musictitle>
          <ul class="list-ul">
            <li v-for="item in music" @click="openmenuTotal(item)">
              <img v-lazy="item.coverImgUrl" alt=""/>   <!--专辑的图片-->
              <div class="item-content">
                {{item.name}}
              </div>
            </li>
          </ul>
          <div class="loading" v-show="loading">
            <img src="../../../static/img/rage_loading.png" alt="" width=100 height=100>
          </div>
        </div>
      </div>
    </div>
    <musicsearch v-on:musicsearch="showsong" v-on:openmusicsong="showsong"></musicsearch>
    <musicmenu ref="musicmenu" v-on:openmusicsong="show"></musicmenu>
    <Musicsong ref="musicsong"></Musicsong>
  </div>
</template>

<script>
  import { Swipe, SwipeItem } from 'vue-swipe';
  import BScroll from 'better-scroll';
  import Musictitle from '../Musictitle/Musictitle.vue';
  import Musicmenu from '../Musicmenu/Musicmenu.vue';
  import Musicsong from '../Musicsong/Musicsong.vue';
  import musicsearch from '../musicsearch/musicsearch';
  //  import data from '../../data.json';
  import api from '../../api';
  export default {
    name: 'TwoMusic',
    data() {
      return {
        music: {},     //  9个专辑的歌曲
        info: {
          src: '../../../static/img/aei.png',
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
        // 获取最热的9个专辑
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
        //  点击不同的专辑,将该专辑下的歌曲发送给子组件
        this.$refs.musicmenu.setmusiclist(item);
      },
      // 从musicmenu中点击某一歌曲触发父组件的事件调用此函数，显示歌曲详情页面
      show: function (item) {
        this.$refs.musicsong.show(item);
      }
    },
    components: {
      Swipe,
      SwipeItem,
      Musictitle,
      Musicmenu,
      Musicsong,
      musicsearch
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl";
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
    bottom: 45px;
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
        width: 22%
        margin-left: 2%
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
          background: url(../../assets/FM.png) no-repeat
          background-size:40px 40px
          background-position: center
      .card-li:nth-child(3)
        .circle
          background: url(../../assets/slist.png) no-repeat
          background-size:25px 25px
          background-position: center
      .card-li:nth-child(4)
        .circle
          background: url(../../assets/ph.png) no-repeat
          background-size:40px 40px
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
