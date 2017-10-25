<template>
  <div style="width: 100%;height: 100%;">
    <div class="music-wrapper" ref="musicWrapper">
      <div class="music">
        <ul class="music-list">
          <li v-for="item in music">
            <div class="image"><img :src="item.icon" width="26" height="26"></div><div class="text"><span>{{item.text}} </span><span> ({{item.num}})</span></div>
          </li>
        </ul>
        <div class="music-detail">
          <music-list listName="创建的歌单" :musicList="music" v-on:initialScroll="_initialScroll"></music-list>
          <music-list listName="收藏的歌单" :musicList="music" v-on:initialScroll="_initialScroll"></music-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import MusicList from './listDown';

  export default{
    data () {
      return {
        music: [
          {
            icon: '../../../static/img/bdyy.png',
            text: '本地音乐',
            num: 1
          },
          {
            icon: '../../../static/img/zjbf.png',
            text: '最近播放',
            num: 100
          },
          {
            icon: '../../../static/img/xzgl.png',
            text: '下载管理',
            num: 1
          },
          {
            icon: '../../../static/img/wddt.png',
            text: '我的电台',
            num: 0
          },
          {
            icon: '../../../static/img/wdsc.png',
            text: '我的收藏',
            num: 4
          }
        ]
      };
    },
    mounted () {
      this._initScroll();
    },
    methods: {
      _initialScroll () {
        if (!this.musicScroll) {
          this.musicScroll = new BScroll(this.$refs.musicWrapper, {
            click: true
          });
        } else {
          this.musicScroll.refresh();
        };
      }
    },
    components: {
      MusicList
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../common/stylus/mixin.styl"

  .music-wrapper
    width: 100%;
    position : absolute;
    top: 47px;
    bottom : 45px;
    overflow: hidden;
    background:#fff
    .music-list
      margin : 0;
      padding : 0;
      list-style : none;
      li
        width : 100%;
        position: relative;
        display: flex;
        align-items: center;
        .image
          display : inline-block;
          width: 10%;
          height: 10%;
          margin: 3%;
          padding : 0;
        .text
          display: inline-block;
          width: 84%;
          margin: 0;
          padding: 4% 0;
          border-1px(#e2e2e2);
          span:nth-child(2)
            color: #c1c1c1;
        &:last-child
          .text
            border-none();
</style>
