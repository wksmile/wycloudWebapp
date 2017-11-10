<template>
  <transition name="fade">
    <div class="wrapper" v-show="showFlag" @click.stop="hide($event)">
        <div class="content">
          <div class="user">
            <div class="user-img">
              <div class="img">
                <img src="../../../static/img/userImg.jpg">
              </div>
              <div class="user-name">
                <span>{{userName}}</span>
              </div>
            </div>
            <div class="sign">
              <div class="sign-border">
                <span class="sign-img"><img src="../../../static/img/sjk.png"></span>
                <span class="sign-text">签到</span>
              </div>
            </div>
          </div>
          <div class="list">
            <setting-block></setting-block>
          </div>
        </div>
        <div class="bottom-fixed">
          <span class="light">
            <span>
              <img src="../../../static/img/yj.png">
            </span>
            <span>
              夜间
            </span>
          </span>
          <span class="setting">
            <span>
              <img src="../../../static/img/setting.png">
            </span>
            <span>
              设置
            </span>
          </span>
          <span class="logout">
            <span>
              <img src="../../../static/img/logout.png">
            </span>
            <span>
              退出
            </span>
          </span>
        </div>
    </div>
  </transition>
</template>

<script>
  import SettingBlock from '../SettingBlock';
  export default {
    data () {
        return {
            userName: 'wmusic',
            showFlag: false
        };
    },
    methods: {
       show () {
          this.showFlag = true;
       },
      hide ($event) {
           if ($event.target.className === 'wrapper') {
             this.showFlag = false;
           }
      }
    },
    components: {
      SettingBlock
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrapper
  position: fixed
  z-index: 200
  width : 100%
  height : 100%
  top: 0
  left: 0
  bottom: 0
  background : rgba(0,0,0,0.37)
  &.fade-enter-active, &.fade-leave-active
    transition: all 2.5s liner
    transform translate3d(0, 0, 0)
  &.fade-enter, &.fade-leave-active
    opacity: 0
    transform translate3d(100%, 0, 0)
  .content
    position : absolute;
    left: 0
    width: 80%;
    height: 100%
    background: white
    .user
      position: relative
      height: 200px
      width: 100%
      background-image: url("../../../static/img/userImg.png")
      border: none
      .user-img
        position: absolute
        left: 0
        bottom: 0
        margin: 15px 10px
        text-align: center
        .img
          width: 100px
          height: 100px
          overflow: hidden
          img
            max-width: 100%
            max-height: 100%
            border-radius: 50% 50%
        .user-name
          margin-top: 10px
          color: white
      .sign
        position: absolute
        right: 0
        bottom: 0
        margin: 15px 10px
        .sign-border
          width: 70px
          height: 30px
          line-height: 30px
          border: 2px solid white
          border-radius: 25px
          text-align: center
          .sign-img
            img
              width: 15px
              height: 15px
          .sign-text
            color: white
    .list
      width : 100%
  .bottom-fixed
    position: fixed
    z-index: 220
    left: 0
    bottom: 0
    height: 45px
    width: 80%
    display : flex
    flex-wrap: nowrap
    align-items: center
    span
      display: flex
      align-items: center
      height: 100%
      flex-grow: 1
      padding: 0 5px
      img
        width: 18px
        height: 18px
</style>
