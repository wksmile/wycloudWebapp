<template>
  <div class="list-wrapper">
    <div class="list-content">
      <div class="list-menu" @click="toggleShow">
        <span class="list-arrow"><img v-bind:class="[flagShow ? 'img90rotate' : 'imgr90rotate']" src="../../../static/img/htb_right.png" width="15" height="15"></span>
        <span class="list-text"><span>{{listName}}</span><span>{{musicListNum}}首</span></span>
        <span class="list-setting"><img src="../../../static/img/setting.png" width="20" height="20"></span>
      </div>
      <transition name="slid-doen">
        <div class="list-detail" v-show="flagShow">
          <ul>
            <li class="list-item" v-for="item in musicList">
              <span class="musicImg"><img :src="item.icon" height="50" width="50"></span>
              <div class="text">
                <span class="musicText"><p>{{item.text}}</p><p>{{item.num}}首</p></span><span class="musicShare"><img src="../../../static/img/videomenu.png" width="20" height="20"></span>
              </div>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        flagShow: false
      };
    },
    props: {
      musicList: {
        type: Array,
        required: true
      },
      listName: {
        type: String,
        required: true
      }
    },
    computed: {
      musicListNum () {
        return this.musicList.length;
      }
    },
    methods: {
      toggleShow () {
        this.flagShow = !this.flagShow;
        this.$nextTick(function () {
          this.$emit('initialScroll');
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl";

  .list-wrapper
    position : relative;
    width : 100%;
    margin : 0;
    padding: 0;
    .list-menu
      position : relative;
      display : flex;
      align-items : center;
      width : 100%;
      height : 34px;
      background-color: #efefef;
      font-size : 10px;
      .list-arrow
        margin : 0 5px;
        .img90rotate
          transition : all .3s;
          transform : rotate(90deg);
        .imgr90rotate
          transition : all .3s;
          transform : rotate(0deg);
      .list-setting
        position : absolute;
        right: 0;
        margin : 0 8px;
    .list-detail
      position : relative;
      margin : 10px 0;
      &.slid-down-enter-active, &.slid-down-leave-active
        transition: all 0.3s linear
        transform translate3d(0, 0, 0)
      &.slid-down-enter, &.slid-down-leave-active
        opacity: 0
        transform translate3d(0, 100%, 0)
      ul
        margin : 0;
        padding : 0;
        list-style : none;
        .list-item
          display : flex;
          align-items : center;
          height : 50px;
          width : 100%;
          margin : 5px 0;
          .musicImg
            display : inline-block;
            width : 15%;
            margin : 2%;
          .text
            display : flex;
            align-items : center;
            width : 81%;
            height : 50px;
            border-1px(#e2e2e2);
            .musicText
              font-size : 14px;
              p:nth-child(2)
                font-size : 10px;
                margin : 5px 0;
                color: #c1c1c1;
            .musicShare
              position : absolute;
              right: 0;
              margin: 0 8px;
          &:last-child .text
            border-none();
</style>
