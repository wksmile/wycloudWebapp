<template>
    <transition-group name="fade">
      <div class="search-wrapper" v-show="showFlag" key="search">
        <div class="search">
          <div class="back" @click="hide">
            <img src="../../../static/img/arrow-down.png" width="34" height="34">
          </div>
          <div class="input">
            <input type="text" value="" placeholder="音乐、视屏、歌词、电台" id="inputvalue" @keydown="search" @input="isShowClear">
            <span v-show="showClear" @click.stop="clearInput">
              <img src="../../../static/img/x.png" width="25" height="25">
            </span>
          </div>
        </div>
        <div class="searchresult">
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
    </transition-group>
</template>

<script type="text/ecmascript-6">
export default{
  data() {
    return {
      list: [],
      number: -1,
      showFlag: false,
      showClear: false    //  是否显示清除所有输入的X键
    };
  },
  methods: {
    hide () {
      this.showFlag = false;
    },
    show () {
      this.showFlag = true;
    },
    clearInput () {
      document.getElementById('inputvalue').value = '';
      console.log('inputvalue');
      this.showClear = false;
    },
    openmusicsong() {
      var obj = null;
      this.$emit('openmusicsong', obj);
    },
    opensong(item) {
      if (item) {
        var obj = {
          id: item.id,
          migUrl: item.album.picUrl,
          name: item.name,
          songname: item.artists[0].name,
          audiosrc: item.mp3Url
        };
      } else {
        item = null;
      }
      this.$emit('openSong', obj);
    },
    isShowClear () {
      var name = document.getElementById('inputvalue').value;
      if (!this.showClear) {
        this.showClear = true;
      }
      if (!name) {
        this.showClear = false;
      }
      console.log('shuchuvalue---');
    },
    search() {
      var name = document.getElementById('inputvalue').value;
      this.$http.get('/key/' + name).then((res) => {
        var data = res.data.data;
        var obj = JSON.parse(data).result.songs;
        this.list.splice(0, this.list.length);      //  清空list
        for (var i in obj) {
          this.$http.get('/detail/' + obj[i].id).then((res) => {
            var listdetail = JSON.parse(res.data.data).songs[0];
            this.list.push(listdetail);
          }).catch((error) => {
            console.log('加载歌曲信息出错:' + error);
          });
        }
      });
      console.log('歌曲搜索的结果', this.list);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
.search-wrapper
  position : fixed;
  z-index : 100
  width : 100%;
  top: 0;
  bottom: 45px;
  left: 0;
  &.fade-enter-active, &.fade-leave-active
    transition: all 0.1s linear
    transform translate3d(0, 0, 0)
  &.fade-enter, &.fade-leave-active
    opacity: 0
    transform translate3d(0, 80%, 0)
  .search
    background:#d43c33
    height:46px
    display :flex
    align-items : center
    .back
      height : 30px
      flex-basis:30px
      display: inline-block
      margin: 0 5px
    .input
      flex:1
      position : relative
      span
        position : absolute
        right: 5%
      input
        width:88%
        height:30px
        color: white
        font-size:14px
        background : none
        border-bottom: 1px solid white
        padding-right : 10%
        outline : none
        &::-moz-placeholder
          color: #0028d4
        &:-ms-input-placeholder
          color: white
        &::-webkit-input-placeholder
          color: rgba(201,193,187,0.51)
    .music
      flex-basis: 40px
      text-align:center
      span
        line-height: 46px
        color: #ffffff
      img
        width: 20px
        height: 20px
        margin-left: 10px;
        margin-top: 13px;
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
