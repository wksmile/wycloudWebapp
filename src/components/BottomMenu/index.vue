<template>
  <transition-group name="slid-down">
    <div class="share-wrapper" v-show="showFlag" key="mvshare" @click.stop.prevent="hide($event)">
      <div class="con">
        <div class="content">
          <p>{{bottomList.text}}</p>
          <div class="share-content">
            <div class="share-content-wrapper" ref="listDown">
              <ul class="share-list">
                <li v-for="item in bottomList.list">
                  <div class="share-img">
                    <img :src="item.url">
                  </div>
                  <div class="share-span">
                    <span>{{item.text}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script>
  //  还没实现怎么用鼠标把显示的下拉框拉下去
  import BScroll from 'better-scroll';

  export default {
    data () {
      return {
        showFlag: false,
        bottomList: {}
      };
    },
    created () {
      this._initScroll();
    },
    methods: {
        //  显示该底部组件，并且将显示的列表数据传进来
      show (list) {
        this.showFlag = true;
        console.log('show list--', list);
        this.bottomList = list;
        this.$nextTick(() => {
          this._initScroll();
        });
      },
      hide ($event) {
        if ($event.target.className === 'share-wrapper') {
          this.showFlag = false;
        };
      },
      _initScroll () {
        if (!this.shareScroll) {
          this.shareScroll = new BScroll(this.$refs.listDown, {
            click: true
          });
        } else {
          this.shareScroll.refresh();
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"

  .share-wrapper
    position: fixed;
    top: 0
    left: 0
    width:100%
    height:100%
    z-index: 101
    background: rgba(0, 0, 0, 0.4);
    .con
      position : absolute;
      width : 100%;
      bottom : 0;
      background: white;
      .content
        position : relative;
        width : 100%;
        background: white;
        p
          margin : 15px 10px;
          font-size: 12px;
          color: #7e8c8d;
        .share-content
          width : 100%;
          .share-content-wrapper
            width: 100%;
            .share-list
              margin: 0;
              padding: 0;
              list-style: none;
              white-space : nowrap;
              li
                display : flex;
                align-items : center;
                margin : 10px 0px;
                text-align : center;
                width : 100%;
                height : 30px;
                .share-img
                  width : 10%;
                  height : 30px;
                  img
                    width : 18px;
                    height : 18px;
                .share-span
                  width: 90%;
                  height: 30px;
                  text-align: left;
                  border-1px(#e2e2e2);
                  span
                    font-size: 10px;
                    margin: 0 10px;

</style>
