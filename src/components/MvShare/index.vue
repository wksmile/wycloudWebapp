<template>
  <transition-group name="slid-down">
    <div class="share-wrapper" v-show="showFlag" key="mvshare" @click.stop.prevent="hide($event)">
      <div class="con">
        <div class="content">
          <p>分享:</p>
          <div class="share-content">
            <div class="share-content-wrapper" ref="shareContent">
              <ul class="share-list">
                <li v-for="item in images">
                  <img :src="item.url">
                  <p>{{item.text}}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="content">
          <p>其他:</p>
          <div class="share-content">
            <div>
              <ul class="share-list">
                <li v-for="other in others">
                  <img :src="other.url">
                  <p>{{other.text}}</p>
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
  import BScroll from 'better-scroll';

    export default {
      data () {
        return {
          showFlag: false
        };
      },
      mounted () {
        this._initScroll();
      },
      props: {
        images: {
          type: Array,
          required: true
        },
        others: {
            type: Array,
            required: true
        }
      },
      methods: {
        show () {
          this.showFlag = true;
          this.$nextTick(() => {
            this._initScroll();
            console.log('我是横向滚动----jjj');
          });
        },
        hide ($event) {
          if ($event.target.className === 'share-wrapper') {
            this.showFlag = false;
          };
        },
        _initScroll () {
          if (!this.shareScroll) {
            this.shareScroll = new BScroll(this.$refs.shareContent, {
              click: true,
              scrollX: true,
              eventPassthrough: 'vertical'
            });
            console.log('我是横向滚动----');
          }
        }
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .share-wrapper
    position: fixed;
    top: 0
    left: 0
    bottom : 0
    width:100%
    height:100%
    z-index: 101
    background: rgba(0, 0, 0, 0.4);
    .con
      position : absolute;
      z-index: 6;
      bottom : 0;
      width : 100%;
      height : 260px;
      padding-bottom: 10px;
      background: white;
      .content
        position : relative;
        width : 100%;
        height : 130px;
        background: white;
        p
          margin : 15px 10px;
          font-size: 12px;
          color: #7e8c8d;
        .share-content
          height : 80px;
          width : 100%;
          .share-list
            margin: 0;
            padding: 0;
            list-style: none;
            white-space : nowrap;
            li
              display: inline-block;
              margin : 5px 12px;
              text-align : center;
              width : 60px;
              height : 60px;
              img
                width : 50px;
                height : 50px;
              p
                font-size: 10px;
                margin: 5px 0;
</style>
