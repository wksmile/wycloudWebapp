<template>         <!--最上面左边按钮路由的子页面-->
  <div style="width: 100%;height: 100%;">
    <div class="music-wrapper" ref="musicWrapper">
      <div class="music">
        <ul class="music-list">
          <li v-for="item in music">
            <div class="image"><img :src="item.icon" width="26" height="26"></div><div class="text"><span>{{item.text}} </span><span> ({{item.num}})</span></div>
          </li>
        </ul>
        <div class="music-detail">
          <music-list listName="创建的歌单"
                      :bottomList="createdMusicList"
                      :musicList="collectMusic"
                      v-on:showBottomList="showBottom"
                      v-on:openMenu="openmenuTotal"
                      v-on:initialScroll="_initialScroll">
          </music-list>
          <music-list listName="收藏的歌单"
                      :bottomList="collectMusicList"
                      :musicList="[]"
                      v-on:showBottomList="showBottom"
                      v-on:initialScroll="_initialScroll">
          </music-list>
        </div>
      </div>
    </div>
    <music-menu ref="musicmenu" v-on:openmusicsong="show"></music-menu>
    <music-song ref="musicsong"></music-song>
    <BottomMenu ref="bottommenu"></BottomMenu>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import BScroll from 'better-scroll';
  import MusicMenu from './Musicmenu/Musicmenu.vue';
  import MusicSong from './Musicsong/Musicsong.vue';
  import BottomMenu from './BottomMenu';
  import api from '../api';
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
        ],
        albumlist: [],
        createdMusicList: {
          text: '创建的歌单',
          list: [
            {
              url: '../../../static/img/addMusic.png',
              text: '创建新歌单'
            },
            {
              url: '../../../static/img/manage.png',
              text: '歌单管理'
            }
          ]
        },
        collectMusicList: {
          text: '收藏的歌单',
          list: [
            {
              url: '../../../static/img/manage.png',
              text: '歌单管理'
            }
          ]
        }
      };
    },
    mounted () {
      this._initialScroll();
    },
    created () {
      this.get();
    },
    computed: {
      ...mapState([
        'collectMusic'
      ])
    },
    methods: {
        // 展示底部菜单列表 该list实际为createdMusicList
      showBottom (list) {
        this.$refs.bottommenu.show(list);
      },
      openmenuTotal: function (item) {
          // item为state中collectMusic中的某一项
        this.$refs.musicmenu.show();
        //  点击不同的专辑,将该专辑下的歌曲发送给子组件
        this.$refs.musicmenu.setmusiclist(item);
      },
      _initialScroll () {
        if (!this.musicScroll) {
          this.musicScroll = new BScroll(this.$refs.musicWrapper, {
            click: true
          });
        } else {
          this.musicScroll.refresh();
        };
      },
      //  根据关键词获取到专辑
      get() {
        // 获取最热的9个专辑
        this.$http.get(api.getPlayListByWhere('全部', 'hot', 0, true, 9)).then((res) => {
          this.albumlist = res.data.playlists;
          this.$nextTick(() => {
            this._initialScroll();
          });
        });
      },
      show: function (item) {
        this.$refs.musicsong.show(item);
      }
    },
    components: {
      MusicList,
      MusicMenu,
      MusicSong,
      BottomMenu
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
