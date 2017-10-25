<template>
  <transition-group name="slid-down">
    <div class="share-wrapper" v-show="showFlag" key="mvshare" @click.stop.prevent="hide($event)">
      <div class="con">
        <div class="content">
          <p>分享:</p>
          <div class="share-content" ref="shareContent">
            <div>
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
          <div class="share-content" ref="shareContent">
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
      computed: {
        images () {
          let basicUrl = '../../../static/img/';
          return [
            {
              url: basicUrl + 'wyyyy.png',
              text: '云音乐动态'
            },
            {
              url: basicUrl + 'wxpyq.png',
              text: '微信朋友圈'
            },
            {
              url: basicUrl + 'wyyyy.png',
              text: '云音乐动态'
            },
            {
              url: basicUrl + 'wxhy.png',
              text: '微信好友'
            },
            {
              url: basicUrl + 'qqkj.png',
              text: 'QQ空间'
            },
            {
              url: basicUrl + 'qqhy.png',
              text: 'QQ好友'
            },
            {
              url: basicUrl + 'wb.png',
              text: '微博'
            },
            {
              url: basicUrl + 'sx.png',
              text: '私信'
            },
            {
              url: basicUrl + 'fzlj.png',
              text: '复制链接'
            },
            {
              url: basicUrl + 'yxpyq.png',
              text: '易信朋友圈'
            },
            {
              url: basicUrl + 'yxhy.png',
              text: '易信好友'
            }
          ];
        },
        others () {
          let basicUrl = '../../../static/img/';
          return [
            {
              url: basicUrl + 'collectmv.png',
              text: '收藏'
            },
            {
              url: basicUrl + 'nointrinest.png',
              text: '不感兴趣'
            }
          ];
        }
      },
      methods: {
        show (index) {
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
    width:100%
    height:100%
    min-height: 667px
    z-index:5
    background: rgba(0, 0, 0, 0.4);
    .con
      position : absolute;
      bottom : 45px;
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
          .share-list
            position : relative;
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
