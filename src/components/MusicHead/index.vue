<template>
  <div>
    <div class="search">
      <div class="yuyin"></div>         <!--左侧图标-->
      <div class="top-header">                  <!--头部三个标志 -->
        <span><img src="../../../static/img/music1.png"></span>
        <span><img src="../../../static/img/music2.png"></span>
        <span><img src="../../../static/img/People.png"></span>
      </div>
      <div class="music"  @click="hidelist">   <!--右侧图标-->
        <span v-show="lshow">取消</span>
        <img src="../../../static/img/search.png" alt="" v-show="!lshow" @click="showlist">
      </div>
    </div>
    <div class="searchresult" v-show="lshow">   <!--点击显示的搜索页面-->
      <ul class="list-ul">
        <li v-for="(item, index) in list" @click="opensong(item)">
          <div class="img" :class="{'active': number===index}">
            {{index + 1}}
          </div>
          <div class="title border-1px" >
              <span class="music-name" :class="{'active': number===index}">
                {{item.name}}
              </span>
            <p>
              <i v-show="item.sq"></i>
              <span :class="{'active': number===index}">{{item.artists[0].name}} - {{item.album.name}}</span>
            </p>
          </div>
          <div class="menu border-1px" v-show="item.movie">
            <div class="menu-img"></div>
          </div>
          <div class="menu border-1px">
            <div class="menu-img"></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data() {
      return {
        list: [],
        number: -1,
        lshow: false     //  true表示显示搜索页面，false表示显示页面
      };
    },
    methods: {
      showlist() {      // 显示搜索页面
        this.lshow = true;
      },
      hidelist() {      //  隐藏搜索页面
        this.lshow = false;
      },
      openmusicsong() {      // 打开音乐播放页面
        var obj = null;
        this.$emit('openmusicsong', obj);
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
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
</style>
